/*
  Özgün çizgisel illüstrasyon: tasarım (tel çerçeve) → geliştirme (kod) →
  ürün (kullanıma hazır mobil ekran). Renkler sayfanın paletinden gelir.
*/
const INK = "#1d2226";
const SOFT = "#9aa3a8";
const PRIMARY = "#00595d";
const BLUE = "#0077b6";
const PAPER = "#ffffff";

export default function ProcessIllustration({ label, steps }: { label: string; steps: string[] }) {
  return (
    <svg viewBox="0 0 560 400" role="img" aria-label={label} width="100%" style={{ display: "block", height: "auto" }}>
      {/* Bağlantı çizgisi */}
      <path d="M150 128 C 220 128, 220 200, 280 200 S 340 272, 410 272" fill="none" stroke={PRIMARY} strokeWidth="2" strokeDasharray="6 6" />
      <circle cx="150" cy="128" r="6" fill={PRIMARY} />
      <circle cx="280" cy="200" r="6" fill={PRIMARY} />
      <circle cx="410" cy="272" r="6" fill={BLUE} />

      {/* 1. Tasarım: tel çerçeve */}
      <g>
        <rect x="20" y="40" width="160" height="176" rx="4" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <line x1="20" y1="62" x2="180" y2="62" stroke={INK} strokeWidth="1.5" />
        <circle cx="32" cy="51" r="3" fill={SOFT} />
        <circle cx="42" cy="51" r="3" fill={SOFT} />
        <rect x="34" y="76" width="132" height="54" rx="2" fill="none" stroke={SOFT} strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M34 76 L166 130 M166 76 L34 130" stroke={SOFT} strokeWidth="1" />
        <line x1="34" y1="146" x2="140" y2="146" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="160" x2="118" y2="160" stroke={SOFT} strokeWidth="2" strokeLinecap="round" />
        <rect x="34" y="178" width="58" height="22" rx="2" fill={PRIMARY} />
      </g>

      {/* 2. Geliştirme: kod penceresi */}
      <g>
        <rect x="200" y="140" width="170" height="130" rx="4" fill={INK} />
        <circle cx="214" cy="154" r="3" fill="#4a5258" />
        <circle cx="224" cy="154" r="3" fill="#4a5258" />
        <path d="M228 190 L214 204 L228 218" fill="none" stroke="#7cc8ef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="238" y1="222" x2="252" y2="186" stroke="#7cc8ef" strokeWidth="2" strokeLinecap="round" />
        <path d="M262 190 L276 204 L262 218" fill="none" stroke="#7cc8ef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="292" y1="186" x2="350" y2="186" stroke="#ecebe6" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <line x1="292" y1="200" x2="336" y2="200" stroke="#ecebe6" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
        <line x1="292" y1="214" x2="344" y2="214" stroke="#ecebe6" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <line x1="214" y1="244" x2="300" y2="244" stroke="#3aa59b" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* 3. Ürün: kullanıma hazır mobil ekran */}
      <g>
        <rect x="430" y="168" width="104" height="200" rx="16" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <line x1="468" y1="180" x2="496" y2="180" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <rect x="444" y="196" width="76" height="44" rx="2" fill="rgba(0,89,93,0.12)" stroke={PRIMARY} strokeWidth="1.5" />
        <line x1="444" y1="256" x2="510" y2="256" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <line x1="444" y1="270" x2="494" y2="270" stroke={SOFT} strokeWidth="2" strokeLinecap="round" />
        <line x1="444" y1="284" x2="502" y2="284" stroke={SOFT} strokeWidth="2" strokeLinecap="round" />
        <rect x="444" y="314" width="76" height="24" rx="2" fill={BLUE} />
        <circle cx="520" cy="196" r="14" fill={PRIMARY} />
        <path d="M513 196 L518 201 L527 191" fill="none" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Adım etiketleri */}
      <g fontFamily="inherit" fontSize="15" fontWeight="600" fill={INK}>
        <text x="20" y="242">01 · {steps[0]}</text>
        <text x="200" y="296">02 · {steps[1]}</text>
        <text x="430" y="394">03 · {steps[2]}</text>
      </g>
    </svg>
  );
}
