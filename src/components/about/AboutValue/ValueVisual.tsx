import styles from "./AboutValue.module.scss";

type VisualType = "merge" | "connect" | "interface";

/*
  Dekoratif küçük çizimler. "active" sınıfında hareketin son hâline geçer:
  merge     → tekrarlayan adımlar tek bir akışta birleşir
  connect   → iki sistem arasına bağlantı çizilir
  interface → bir arayüzün parçaları tamamlanır
*/
export default function ValueVisual({ type, active }: { type: VisualType; active: boolean }) {
  return (
    <svg
      className={`${styles.visual} ${active ? styles.visualActive : ""}`}
      viewBox="0 0 240 160"
      aria-hidden="true"
      focusable="false"
    >
      {type === "merge" && (
        <g className={styles.merge}>
          <line className={styles.mergeA} x1="40" y1="44" x2="110" y2="44" />
          <line className={styles.mergeB} x1="40" y1="80" x2="110" y2="80" />
          <line className={styles.mergeC} x1="40" y1="116" x2="110" y2="116" />
          <path className={styles.mergeOut} d="M 130 80 H 200" pathLength={1} />
          <circle className={styles.mergeDot} cx="204" cy="80" r="5" />
        </g>
      )}

      {type === "connect" && (
        <g className={styles.connect}>
          <rect x="22" y="50" width="64" height="60" rx="4" />
          <rect x="154" y="50" width="64" height="60" rx="4" />
          <line x1="34" y1="68" x2="70" y2="68" className={styles.thin} />
          <line x1="34" y1="80" x2="62" y2="80" className={styles.thin} />
          <line x1="166" y1="68" x2="202" y2="68" className={styles.thin} />
          <line x1="166" y1="80" x2="194" y2="80" className={styles.thin} />
          <path className={styles.connectLine} d="M 86 80 C 112 80, 128 80, 154 80" pathLength={1} />
          <circle className={styles.connectDot} cx="120" cy="80" r="4" />
        </g>
      )}

      {type === "interface" && (
        <g className={styles.ui}>
          <rect x="40" y="20" width="160" height="120" rx="4" />
          <line x1="40" y1="40" x2="200" y2="40" />
          <rect className={styles.uiA} x="54" y="54" width="58" height="40" rx="2" />
          <line className={styles.uiB} x1="124" y1="58" x2="186" y2="58" />
          <line className={styles.uiC} x1="124" y1="72" x2="172" y2="72" />
          <line className={styles.uiD} x1="124" y1="86" x2="180" y2="86" />
          <rect className={styles.uiE} x="54" y="108" width="52" height="18" rx="2" />
        </g>
      )}
    </svg>
  );
}
