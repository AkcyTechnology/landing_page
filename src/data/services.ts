export type Service = {
  icon: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  href: string;
};

export const services: Service[] = [
  {
    icon: "code",
    title: "Özel Yazılım Geliştirme",
    titleEn: "Custom Software Development",
    description:
      "İş ihtiyaçlarınıza özel, esnek ve ölçeklenebilir çözümler geliştiriyoruz. Her satır kod, hedeflerinize ulaşmanız için yazılır.",
    descriptionEn:
      "We build flexible, scalable solutions tailored to your business needs. Every line of code is written to help you reach your goals.",
    href: "/urunler",
  },
  {
    icon: "device",
    title: "Web ve Mobil Uygulamalar",
    titleEn: "Web & Mobile Applications",
    description:
      "Modern, hızlı ve kullanıcı odaklı dijital ürünler tasarlıyor ve geliştiriyoruz. Tüm platformlarda sorunsuz çalışan arayüzler.",
    descriptionEn:
      "We design and build modern, fast, user-centered digital products that work flawlessly across all platforms.",
    href: "/urunler",
  },
  {
    icon: "chart",
    title: "Dijital Dönüşüm Danışmanlığı",
    titleEn: "Digital Transformation Consulting",
    description:
      "Operasyonlarınızı daha verimli hale getiren teknoloji yol haritaları oluşturuyoruz. Doğru teknolojiyle daha hızlı büyüyün.",
    descriptionEn:
      "We create technology roadmaps that make your operations more efficient. Grow faster with the right technology.",
    href: "/iletisim",
  },
];
