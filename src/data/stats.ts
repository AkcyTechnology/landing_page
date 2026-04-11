export type Stat = {
  value: string;
  label: string;
  labelEn: string;
  highlight?: boolean;
};

export const stats: Stat[] = [
  {
    value: "2026",
    label: "Kuruluş Tarihi",
    labelEn: "Founded",
  },
  {
    value: "3+",
    label: "Sistemde aktif uygulama",
    labelEn: "Active Applications",
    highlight: true,
  },
  {
    value: "24/7",
    label: "Destek",
    labelEn: "Support",
  },
  {
    value: "25+",
    label: "İş ortağı ağı",
    labelEn: "Partner Network",
  },
];
