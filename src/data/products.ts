export type ProductFeature = {
  text: string;
};

export type Product = {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  accentColor: "purple" | "pink" | "green";
  reverse?: boolean;
};

export const products: Product[] = [
  {
    id: "data-security",
    title: "Veri Güvenliği ve Erişim Yönetimi",
    titleEn: "Data Security & Access Management",
    description:
      "Kurumsal verilerinizi koruyun, erişim yetkilerini tam kontrol altında tutun. Güvenlik ihlallerine karşı çok katmanlı koruma altyapısı.",
    descriptionEn:
      "Protect your enterprise data and keep access permissions fully under control. Multi-layered protection against security breaches.",
    features: [
      "Rol tabanlı erişim kontrolü",
      "Gerçek zamanlı tehdit izleme",
      "Şifreli veri depolama",
      "Uyumluluk raporlaması (KVKK, GDPR)",
      "Güvenlik olayı yönetimi",
    ],
    featuresEn: [
      "Role-based access control",
      "Real-time threat monitoring",
      "Encrypted data storage",
      "Compliance reporting (GDPR)",
      "Security incident management",
    ],
    accentColor: "purple",
    reverse: false,
  },
  {
    id: "reporting",
    title: "Raporlama ve Operasyon Takibi",
    titleEn: "Reporting & Operations Tracking",
    description:
      "Tüm iş süreçlerinizi tek ekranda görün. Anlık raporlar, akıllı göstergeler ve özelleştirilebilir dashboard'larla veriye dayalı kararlar alın.",
    descriptionEn:
      "See all your business processes on a single screen. Make data-driven decisions with real-time reports and smart indicators.",
    features: [
      "Özelleştirilebilir dashboard",
      "Otomatik raporlama ve bildirimler",
      "KPI takip sistemi",
      "Tarihsel veri analizi",
      "PDF ve Excel dışa aktarım",
    ],
    featuresEn: [
      "Customizable dashboards",
      "Automated reporting & alerts",
      "KPI tracking system",
      "Historical data analysis",
      "PDF & Excel export",
    ],
    accentColor: "pink",
    reverse: true,
  },
  {
    id: "integration",
    title: "Akıllı Süreç ve Entegrasyon Altyapısı",
    titleEn: "Smart Process & Integration Platform",
    description:
      "Farklı sistemlerinizi birbirine bağlayın, tekrar eden işlemleri otomatikleştirin. Kesintisiz iş akışı ve tam entegrasyon.",
    descriptionEn:
      "Connect your different systems, automate repetitive tasks. Seamless workflow and full integration.",
    features: [
      "API tabanlı entegrasyonlar",
      "İş akışı otomasyonu",
      "Üçüncü taraf sistem bağlantıları",
      "Hata toleranslı süreç yönetimi",
      "Gerçek zamanlı senkronizasyon",
    ],
    featuresEn: [
      "API-based integrations",
      "Workflow automation",
      "Third-party system connections",
      "Fault-tolerant process management",
      "Real-time synchronization",
    ],
    accentColor: "green",
    reverse: false,
  },
];
