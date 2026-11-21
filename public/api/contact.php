<?php
/*
  AKCY iletişim formu — mail gönderimi ve bot / spam korumaları.

  Site statik HTML olarak yayınlandığı için form bu PHP dosyasına gönderilir.
  Ayarlar (gizli anahtar, mail adresleri) aynı klasördeki config.php
  dosyasındadır; örnek için config.example.php dosyasına bakın.

  Kontrol sırası:
    1) Yalnızca POST ve JSON, en fazla 20 KB
    2) Kaynak (Origin) kontrolü: yalnızca kendi sitemizden gelen istekler
    3) Honeypot (gizli tuzak alan)
    4) IP başına istek sınırı (10 dakikada 5)
    5) Süre kontrolü (3 saniyeden hızlı doldurulan formlar)
    6) Zorunlu alan ve uzunluk doğrulaması
    7) Spam içerik puanlaması
    8) Cloudflare Turnstile robot doğrulaması
*/

declare(strict_types=1);

// PHP uyarıları ekrana basılırsa JSON yanıtı bozulur; yalnızca loga yazılır.
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/*
  Ayar dosyası çıktı tamponu içinde okunur: dosya bozulsa bile (ör. baştaki
  "<?php" satırı silinirse) içeriği ve gizli bilgiler asla ekrana basılmaz.
*/
$configFile = __DIR__ . '/config.php';
$config = [];

if (is_file($configFile)) {
    ob_start();
    $loaded = include $configFile;
    ob_end_clean();

    if (is_array($loaded)) {
        $config = $loaded;
    } else {
        error_log('AKCY: config.php okunamadı — dosya "<?php" satırıyla başlamalı ve "return [ ... ];" içermeli.');
        http_response_code(500);
        echo json_encode(['error' => 'Mail servisi yapılandırılmamış.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

const MAX_BODY_BYTES = 20000;
const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MIN_FILL_TIME_MS = 3000;
const MAX_FILL_TIME_MS = 86400000;
const RATE_LIMIT_WINDOW = 600;
const RATE_LIMIT_MAX = 5;
const SPAM_THRESHOLD = 3;

/*
  Teklif formundaki isteğe bağlı dosya eki (brief, örnek doküman, görsel).
  Dosya eklenmezse istek eskisi gibi JSON gelir; eklenirse multipart/form-data
  gelir ve form alanları "payload" alanında JSON olarak taşınır.
  Sunucunun upload_max_filesize / post_max_size değerleri bu sınırdan küçükse
  PHP dosyayı reddeder; bu durumda kullanıcıya "dosya çok büyük" denir.
*/
const MAX_UPLOAD_BYTES = 5242880; // 5 MB
const ALLOWED_UPLOADS = [
    'pdf' => ['application/pdf'],
    'doc' => ['application/msword', 'application/vnd.ms-office', 'application/octet-stream'],
    'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream'],
    'ppt' => ['application/vnd.ms-powerpoint', 'application/vnd.ms-office', 'application/octet-stream'],
    'pptx' => ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/zip', 'application/octet-stream'],
    'xls' => ['application/vnd.ms-excel', 'application/vnd.ms-office', 'application/octet-stream'],
    'xlsx' => ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip', 'application/octet-stream'],
    'png' => ['image/png'],
    'jpg' => ['image/jpeg'],
    'jpeg' => ['image/jpeg'],
];

function respond(int $status, array $data): void
{
    // Reddedilen her istek sebebiyle birlikte error_log dosyasına yazılır.
    if ($status >= 400 && $status !== 405) {
        error_log("AKCY iletişim formu reddedildi ($status): " . ($data['error'] ?? ''));
    }

    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// Botu "başarılı" sanacak şekilde yanıt verir ama mail göndermez;
// böylece bot hangi kontrole takıldığını öğrenip uyum sağlayamaz.
function silentlyDrop(string $reason, string $ip): void
{
    error_log("AKCY iletişim formu engellendi ($reason) — IP: $ip");
    respond(200, ['ok' => true]);
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

// Tek satırlık alanlardan satır sonu ve kontrol karakterlerini temizler
// (ör. mail başlıklarına enjeksiyon denemelerine karşı).
function singleLine($value): string
{
    if (!is_string($value)) return '';
    return trim((string) preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value));
}

// Çok satırlı metinde satır sonu ve sekme dışındaki kontrol karakterlerini siler.
function multiLine($value): string
{
    if (!is_string($value)) return '';
    return trim((string) preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value));
}

// Yalnızca sunucunun gördüğü gerçek bağlantı adresi kullanılır;
// istemcinin gönderdiği başlıklar (X-Forwarded-For vb.) taklit edilebilir.
function clientIp(): string
{
    $value = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
    return filter_var($value, FILTER_VALIDATE_IP) ? $value : 'unknown';
}

function isSameOrigin(array $config): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') return false;

    $originHost = parse_url($origin, PHP_URL_HOST);
    if (!$originHost) return false;

    $host = strtolower((string) preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')));
    if (strtolower($originHost) === $host) return true;

    foreach ($config['allowed_origins'] ?? [] as $allowed) {
        if (strtolower((string) parse_url($allowed, PHP_URL_HOST)) === strtolower($originHost)) {
            return true;
        }
    }

    return false;
}

// İstek sayıları web kök dizininin dışında, dosyada tutulur.
function isRateLimited(string $ip): bool
{
    $dir = dirname(__DIR__, 2) . '/akcy-form-data';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
        $dir = sys_get_temp_dir() . '/akcy-form-data';
        if (!is_dir($dir)) @mkdir($dir, 0700, true);
    }

    $file = $dir . '/rate-' . sha1($ip) . '.json';
    $handle = @fopen($file, 'c+');
    if (!$handle) return false; // Depolama yoksa formu kilitleme.

    flock($handle, LOCK_EX);
    $now = time();
    $times = json_decode((string) stream_get_contents($handle), true);
    $times = array_values(array_filter(
        is_array($times) ? $times : [],
        fn ($time) => is_int($time) && $now - $time < RATE_LIMIT_WINDOW
    ));

    $limited = count($times) >= RATE_LIMIT_MAX;
    if (!$limited) $times[] = $now;

    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, (string) json_encode($times));
    flock($handle, LOCK_UN);
    fclose($handle);

    return $limited;
}

function spamScore(string $name, string $company, string $message): int
{
    $score = 0;
    $lower = function_exists('mb_strtolower') ? mb_strtolower($message, 'UTF-8') : strtolower($message);

    $links = preg_match_all('~(https?://|www\.)\S+~i', $message);
    if ($links > 3) $score += 2;
    if ($links > 6) $score += 2;

    // İsim veya firma alanında link olması neredeyse her zaman bottur.
    if (preg_match('~(https?://|www\.)\S+~i', $name . ' ' . $company)) $score += 3;

    if (preg_match('~\[url=|\[/url\]|<a\s+href|<script~i', $message)) $score += 3;

    $keywords = [
        'casino', 'viagra', 'cialis', 'porn', 'escort', 'bahis', 'bet365',
        'crypto giveaway', 'backlink', 'seo services', 'guest post',
        'buy followers', 'loan offer', 'forex signal',
    ];
    foreach ($keywords as $keyword) {
        if (strpos($lower, $keyword) !== false) $score += 2;
    }

    // Mesajın büyük bölümü Kiril / Çince / Japonca karakterse
    $foreign = preg_match_all('/[\x{0400}-\x{04FF}\x{4E00}-\x{9FFF}\x{3040}-\x{30FF}]/u', $message);
    if ($foreign > 20 && $foreign / max(textLength($message), 1) > 0.3) $score += 2;

    return $score;
}

function verifyTurnstile(string $secret, $token, string $ip, bool $disabled = false): bool
{
    // Doğrulama yalnızca config.php'de açıkça kapatılmışsa atlanır; anahtarın
    // yanlışlıkla boş kalması formu korumasız bırakmaz.
    if ($disabled) return true;
    if ($secret === '') {
        error_log('AKCY: turnstile_secret boş — doğrulamayı kapatmak için config.php içinde turnstile_disabled => true kullanın.');
        return false;
    }
    if (!is_string($token) || $token === '' || strlen($token) > 2048) return false;

    $fields = ['secret' => $secret, 'response' => $token];
    if ($ip !== 'unknown') $fields['remoteip'] = $ip;

    $url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    $body = http_build_query($fields);

    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $body,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 8,
        ]);
        $result = curl_exec($curl);
    } else {
        $result = @file_get_contents($url, false, stream_context_create(['http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $body,
            'timeout' => 8,
        ]]));
    }

    if (!is_string($result)) {
        error_log('AKCY: Turnstile doğrulama servisine ulaşılamadı.');
        return false;
    }

    $data = json_decode($result, true);
    return is_array($data) && ($data['success'] ?? false) === true;
}

/*
  Yüklenen dosyayı doğrular: yükleme hatası, boyut, uzantı ve gerçek içerik
  türü (finfo). Geçerliyse ['name', 'type', 'data'] döner; dosya yoksa null.
  Geçersizse kullanıcıya gösterilecek hata mesajıyla respond() çağrılır.
*/
function readAttachment(): ?array
{
    $file = $_FILES['attachment'] ?? null;
    if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    $error = (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE);
    if ($error === UPLOAD_ERR_INI_SIZE || $error === UPLOAD_ERR_FORM_SIZE) {
        respond(413, ['error' => 'Dosya çok büyük. En fazla 5 MB yükleyebilirsiniz.']);
    }
    if ($error !== UPLOAD_ERR_OK || !is_uploaded_file((string) $file['tmp_name'])) {
        respond(400, ['error' => 'Dosya yüklenemedi. Lütfen tekrar deneyin.']);
    }

    $size = (int) ($file['size'] ?? 0);
    if ($size <= 0 || $size > MAX_UPLOAD_BYTES) {
        respond(413, ['error' => 'Dosya çok büyük. En fazla 5 MB yükleyebilirsiniz.']);
    }

    // Dosya adı: yalnızca güvenli karakterler, uzunluk sınırlı
    $original = (string) ($file['name'] ?? 'dosya');
    $extension = strtolower((string) pathinfo($original, PATHINFO_EXTENSION));
    if (!isset(ALLOWED_UPLOADS[$extension])) {
        respond(400, ['error' => 'Bu dosya türü desteklenmiyor. PDF, Word, PowerPoint, Excel, PNG veya JPG yükleyebilirsiniz.']);
    }
    $base = (string) preg_replace('/[^A-Za-z0-9._-]+/', '-', (string) pathinfo($original, PATHINFO_FILENAME));
    $base = trim(substr($base, 0, 80), '-.') ?: 'dosya';
    $name = $base . '.' . $extension;

    // Gerçek içerik türü uzantıyla uyuşmalı (uzantısı değiştirilmiş dosyalara karşı)
    $type = ALLOWED_UPLOADS[$extension][0];
    if (function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $detected = $finfo ? (string) finfo_file($finfo, (string) $file['tmp_name']) : '';
        if ($finfo) finfo_close($finfo);
        if ($detected !== '' && !in_array($detected, ALLOWED_UPLOADS[$extension], true)) {
            respond(400, ['error' => 'Dosyanın içeriği uzantısıyla uyuşmuyor.']);
        }
    }

    $data = (string) file_get_contents((string) $file['tmp_name']);
    if ($data === '') {
        respond(400, ['error' => 'Dosya yüklenemedi. Lütfen tekrar deneyin.']);
    }

    return ['name' => $name, 'type' => $type, 'data' => $data];
}

function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/*
  Maili kimlik doğrulamalı SMTP ile gönderir (cPanel'deki e-posta hesabıyla).
  Paylaşımlı hostinglerde PHP mail() fonksiyonu genellikle kısıtlıdır;
  SMTP hem çalışır hem de DKIM imzası sayesinde Gmail'e daha güvenilir ulaşır.
  Başarılıysa null, değilse hata açıklaması döner.
*/
function smtpSend(array $smtp, string $from, string $to, string $rawMessage): ?string
{
    $host = (string) ($smtp['host'] ?? '');
    $port = (int) ($smtp['port'] ?? 465);
    $user = (string) ($smtp['user'] ?? '');
    $pass = (string) ($smtp['pass'] ?? '');

    $verify = (bool) ($smtp['verify_ssl'] ?? true);

    /*
      Önce ayardaki adrese bağlanılır. Bazı paylaşımlı hostinglerde PHP'nin
      sunucunun dış adresine bağlanması engellidir; o durumda aynı sunucudaki
      mail servisine içeriden (127.0.0.1) bağlanılır. Sertifika yine ayardaki
      alan adına göre doğrulanır.
    */
    $socket = false;
    $connectErrors = [];

    foreach (array_unique([$host, '127.0.0.1']) as $target) {
        $context = stream_context_create(['ssl' => [
            'verify_peer' => $verify,
            'verify_peer_name' => $verify,
            'peer_name' => $host,
        ]]);

        $socket = @stream_socket_client("ssl://$target:$port", $errno, $errstr, 10, STREAM_CLIENT_CONNECT, $context);
        if ($socket) break;

        $connectErrors[] = "$target:$port → " . ($errstr ?: "hata kodu $errno");
    }

    if (!$socket) return 'Bağlantı kurulamadı: ' . implode(' | ', $connectErrors);

    stream_set_timeout($socket, 15);

    // Sunucu yanıtını okur (çok satırlı yanıtlarda "250-" devam, "250 " son satır).
    $read = function () use ($socket): string {
        $response = '';
        while (($line = fgets($socket, 515)) !== false) {
            $response .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $response;
    };

    $command = function (?string $line, array $expect) use ($socket, $read): ?string {
        if ($line !== null) fwrite($socket, $line . "\r\n");
        $response = $read();
        $code = (int) substr($response, 0, 3);
        return in_array($code, $expect, true) ? null : trim($response);
    };

    $hostname = $_SERVER['SERVER_NAME'] ?? 'localhost';
    $steps = [
        [null, [220]],
        ["EHLO $hostname", [250]],
        ['AUTH LOGIN', [334]],
        [base64_encode($user), [334]],
        [base64_encode($pass), [235]],
        ["MAIL FROM:<$from>", [250]],
        ["RCPT TO:<$to>", [250, 251]],
        ['DATA', [354]],
    ];

    foreach ($steps as [$line, $expect]) {
        $error = $command($line, $expect);
        if ($error !== null) {
            fclose($socket);
            // Şifre loga yazılmasın diye kimlik adımlarında komut gösterilmez.
            return "SMTP hatası: $error";
        }
    }

    // Satır başındaki noktalar ikiye katlanır (SMTP "dot-stuffing" kuralı).
    $body = preg_replace('/^\./m', '..', str_replace(["\r\n", "\r"], "\n", $rawMessage));
    $body = str_replace("\n", "\r\n", (string) $body);

    $error = $command($body . "\r\n.", [250]);
    fwrite($socket, "QUIT\r\n");
    fclose($socket);

    return $error === null ? null : "SMTP hatası: $error";
}

/* ==========================
   İSTEK İŞLEME
========================== */

$ip = clientIp();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Yalnızca POST isteği kabul edilir.']);
}

// Başka sitelerden veya tarayıcı dışı scriptlerden gelen istekler
if (!isSameOrigin($config)) {
    respond(403, ['error' => 'İzin verilmeyen istek.']);
}

/*
  İki biçim kabul edilir:
  - application/json: dosyasız gönderim (iletişim formu, dosyasız teklif)
  - multipart/form-data: dosya ekli teklif; alanlar "payload" içinde JSON
*/
$contentType = (string) ($_SERVER['CONTENT_TYPE'] ?? '');
$isMultipart = stripos($contentType, 'multipart/form-data') !== false;
if (!$isMultipart && stripos($contentType, 'application/json') === false) {
    respond(415, ['error' => 'Geçersiz istek.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > ($isMultipart ? MAX_UPLOAD_BYTES + MAX_BODY_BYTES + 8192 : MAX_BODY_BYTES)) {
    respond(413, ['error' => $isMultipart ? 'Dosya çok büyük. En fazla 5 MB yükleyebilirsiniz.' : 'İstek çok büyük.']);
}

if ($isMultipart) {
    // post_max_size aşılırsa PHP $_POST ve $_FILES'ı boş bırakır
    if (empty($_POST) && empty($_FILES) && $contentLength > 0) {
        respond(413, ['error' => 'Dosya çok büyük. En fazla 5 MB yükleyebilirsiniz.']);
    }
    $rawBody = (string) ($_POST['payload'] ?? '');
} else {
    $rawBody = (string) file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
}
if (strlen($rawBody) > MAX_BODY_BYTES) {
    respond(413, ['error' => 'İstek çok büyük.']);
}

$raw = json_decode($rawBody, true);
if (!is_array($raw)) {
    respond(400, ['error' => 'Geçersiz istek.']);
}

// Honeypot: gerçek kullanıcılar bu gizli alanı görmez.
if (singleLine($raw['website'] ?? '') !== '') {
    silentlyDrop('honeypot', $ip);
}

if (isRateLimited($ip)) {
    respond(429, ['error' => 'Çok fazla istek gönderildi. Lütfen biraz sonra tekrar deneyin.']);
}

// Form, açıldıktan sonra insan için imkânsız kısalıkta gönderildiyse
$elapsed = $raw['elapsedMs'] ?? null;
if (!is_int($elapsed) && !is_float($elapsed)) {
    silentlyDrop('süre', $ip);
}
if ($elapsed < MIN_FILL_TIME_MS || $elapsed > MAX_FILL_TIME_MS) {
    silentlyDrop('süre', $ip);
}

$fields = [
    'name' => singleLine($raw['name'] ?? ''),
    'email' => singleLine($raw['email'] ?? ''),
    'phone' => singleLine($raw['phone'] ?? ''),
    'company' => singleLine($raw['company'] ?? ''),
    'projectType' => singleLine($raw['projectType'] ?? ''),
    'budget' => singleLine($raw['budget'] ?? ''),
    'startTimeline' => singleLine($raw['startTimeline'] ?? ''),
];
$message = multiLine($raw['message'] ?? '');

// Sunucu tarafı doğrulama: tarayıcıdaki kontroller atlanabilir.
if ($fields['name'] === '' || $message === '' || !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    respond(400, ['error' => 'Ad, e-posta ve mesaj alanları zorunludur.']);
}

foreach ($fields as $value) {
    if (textLength($value) > MAX_FIELD_LENGTH) {
        respond(400, ['error' => 'Alanlardan biri izin verilen uzunluğu aşıyor.']);
    }
}
if (textLength($message) > MAX_MESSAGE_LENGTH) {
    respond(400, ['error' => 'Alanlardan biri izin verilen uzunluğu aşıyor.']);
}

if (spamScore($fields['name'], $fields['company'], $message) >= SPAM_THRESHOLD) {
    silentlyDrop('spam içerik', $ip);
}

// Robot doğrulaması (config.php'de turnstile_disabled => true değilse zorunlu)
$turnstileDisabled = ($config['turnstile_disabled'] ?? false) === true;
if (!verifyTurnstile((string) ($config['turnstile_secret'] ?? ''), $raw['turnstileToken'] ?? null, $ip, $turnstileDisabled)) {
    respond(400, ['error' => 'Robot doğrulaması başarısız. Lütfen sayfayı yenileyip tekrar deneyin.']);
}

// Dosya eki yalnızca bütün bot kontrolleri geçildikten sonra okunur
$attachment = $isMultipart ? readAttachment() : null;

/* ==========================
   MAİL GÖNDERİMİ
========================== */

$to = (string) ($config['mail_to'] ?? 'akcyglobal@gmail.com');
$from = (string) ($config['mail_from'] ?? '');
if ($from === '' || !filter_var($from, FILTER_VALIDATE_EMAIL)) {
    error_log('AKCY: config.php içinde geçerli bir mail_from tanımlı değil.');
    respond(500, ['error' => 'Mail servisi yapılandırılmamış.']);
}

$rows = [
    'Ad Soyad' => $fields['name'],
    'E-posta' => $fields['email'],
    'Telefon' => $fields['phone'] ?: '—',
    'Firma / Marka' => $fields['company'] ?: '—',
    'Proje türü' => $fields['projectType'] ?: '—',
    'Tahmini bütçe' => $fields['budget'] ?: '—',
    'Tahmini başlangıç' => $fields['startTimeline'] ?: '—',
    'Ek dosya' => $attachment ? $attachment['name'] . ' (' . max(1, (int) round(strlen($attachment['data']) / 1024)) . ' KB)' : '—',
];

$tableRows = '';
foreach ($rows as $label => $value) {
    $tableRows .= '<tr><td style="padding:6px 16px 6px 0;color:#6b7280;">' . escapeHtml($label)
        . '</td><td style="padding:6px 0;font-weight:600;">' . escapeHtml($value) . '</td></tr>';
}

$html = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#06101f;">'
    . '<h2 style="margin:0 0 18px;font-size:18px;">Yeni iletişim formu mesajı</h2>'
    . '<table style="border-collapse:collapse;margin-bottom:20px;">' . $tableRows . '</table>'
    . '<div style="padding:16px;background:#f7f9fb;border-radius:6px;">'
    . '<div style="margin-bottom:8px;color:#6b7280;">Mesaj</div>'
    . '<div style="white-space:pre-wrap;line-height:1.6;">' . escapeHtml($message) . '</div>'
    . '</div></div>';

$subject = '=?UTF-8?B?' . base64_encode('Yeni proje talebi — ' . $fields['name']) . '?=';
$fromName = '=?UTF-8?B?' . base64_encode('AKCY Web Sitesi') . '?=';

$headers = [
    'MIME-Version: 1.0',
    "From: $fromName <$from>",
    'Reply-To: ' . $fields['email'],
    'X-Mailer: AKCY-Contact',
];

if ($attachment) {
    // Dosya ekli: HTML gövde + ek, multipart/mixed
    $boundary = 'akcy-' . bin2hex(random_bytes(12));
    $headers[] = "Content-Type: multipart/mixed; boundary=\"$boundary\"";
    $fileName = '=?UTF-8?B?' . base64_encode($attachment['name']) . '?=';
    $body = "--$boundary\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html))
        . "--$boundary\r\n"
        . "Content-Type: {$attachment['type']}; name=\"$fileName\"\r\n"
        . "Content-Transfer-Encoding: base64\r\n"
        . "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n"
        . chunk_split(base64_encode($attachment['data']))
        . "--$boundary--\r\n";
} else {
    $headers[] = 'Content-Type: text/html; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: base64';
    $body = chunk_split(base64_encode($html));
}

$smtp = $config['smtp'] ?? [];

if (!empty($smtp['host']) && !empty($smtp['pass'])) {
    // Önerilen yol: e-posta hesabıyla kimlik doğrulamalı SMTP
    $domain = substr((string) strrchr($from, '@'), 1);
    $message = implode("\r\n", array_merge([
        'Date: ' . date('r'),
        "To: <$to>",
        "Subject: $subject",
        'Message-ID: <' . bin2hex(random_bytes(12)) . "@$domain>",
    ], $headers)) . "\r\n\r\n" . $body;

    $error = smtpSend($smtp, $from, $to, $message);

    if ($error !== null) {
        error_log("AKCY: SMTP gönderimi başarısız ($from → $to): $error");
        respond(502, ['error' => 'Mail gönderilemedi.']);
    }

    error_log("AKCY: SMTP ile gönderildi ($from → $to) — IP: $ip");
    respond(200, ['ok' => true]);
}

// Yedek yol: SMTP ayarlanmamışsa PHP mail() (paylaşımlı hostingde engellenebilir)
$sent = @mail($to, $subject, $body, implode("\r\n", $headers), '-f' . $from);

if (!$sent) {
    $lastError = error_get_last()['message'] ?? 'bilinmiyor';
    error_log("AKCY: mail() gönderimi başarısız oldu ($from → $to): $lastError");
    respond(502, ['error' => 'Mail gönderilemedi.']);
}

error_log("AKCY: mail() başarılı ($from → $to) — IP: $ip");
respond(200, ['ok' => true]);
