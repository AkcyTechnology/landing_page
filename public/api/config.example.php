<?php
/*
  contact.php ayarları — ÖRNEK DOSYA.
  Bu dosyayı aynı klasörde "config.php" adıyla kopyalayıp değerleri doldurun.
  config.php git'e eklenmez ve tarayıcıdan erişime kapalıdır (.htaccess).
*/

return [
    // Cloudflare Turnstile → "Secret Key". Boş bırakılırsa robot doğrulaması kapalıdır.
    'turnstile_secret' => '',

    // Form mesajlarının gönderileceği adres.
    'mail_to' => 'akcyglobal@gmail.com',

    // Gönderici adres: cPanel → E-posta Hesapları'nda oluşturulmuş, alan adınıza ait bir adres olmalı.
    'mail_from' => 'iletisim@akcy.com.tr',

    // Gönderim için cPanel e-posta hesabının SMTP bilgileri.
    // "pass" alanına iletisim@akcy.com.tr hesabının şifresini yazın.
    'smtp' => [
        'host' => 'akcy.com.tr',
        'port' => 465,
        'user' => 'iletisim@akcy.com.tr',
        'pass' => '',
    ],

    // Ek izinli site adresleri (ör. www'lu sürüm). Kendi alan adı her zaman izinlidir.
    'allowed_origins' => [
        'https://akcy.com.tr',
        'https://www.akcy.com.tr',
    ],
];
