export type FaqItem = {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "AKCY hangi tür yazılım çözümleri sunar?",
    questionEn: "What type of software solutions does AKCY offer?",
    answer:
      "AKCY; özel yazılım geliştirme, web ve mobil uygulama geliştirme, dijital dönüşüm danışmanlığı ve kurumsal otomasyon çözümleri sunar. Her proje, müşteriye özel ihtiyaç analiziyle başlar.",
    answerEn:
      "AKCY offers custom software development, web and mobile application development, digital transformation consulting, and enterprise automation solutions. Each project begins with a client-specific needs analysis.",
  },
  {
    question: "Süreç nasıl ilerler?",
    questionEn: "How does the process work?",
    answer:
      "Önce keşif görüşmesiyle ihtiyaçlarınızı anlıyoruz. Ardından proje planı ve teknik yol haritası hazırlıyoruz. Geliştirme sürecinde düzenli güncellemeler ve testler yapılır. Son olarak teslim ve sürekli destek aşaması gelir.",
    answerEn:
      "We start by understanding your needs through a discovery call. Then we prepare a project plan and technical roadmap. During development, regular updates and testing are conducted. Finally comes delivery and ongoing support.",
  },
  {
    question: "Özel proje geliştirme yapıyor musunuz?",
    questionEn: "Do you do custom project development?",
    answer:
      "Evet, tüm projelerimiz müşteriye özeldir. Hazır şablonlar yerine, işinizin gerçek ihtiyaçlarına göre tasarlanmış ve geliştirilen çözümler sunuyoruz.",
    answerEn:
      "Yes, all our projects are client-specific. Instead of ready-made templates, we offer solutions designed and developed according to your business's real needs.",
  },
  {
    question: "Destek hizmetiniz var mı?",
    questionEn: "Do you offer support services?",
    answer:
      "Evet, 7/24 teknik destek sunuyoruz. Proje tesliminin ardından bakım sözleşmeleri kapsamında yazılımınızı güncel tutuyoruz. Kritik sorunlarda hızlı müdahale garantisi veriyoruz.",
    answerEn:
      "Yes, we offer 24/7 technical support. After project delivery, we keep your software up to date under maintenance agreements. We guarantee rapid response for critical issues.",
  },
  {
    question: "Ürünleriniz kimler için uygun?",
    questionEn: "Who are your products suitable for?",
    answer:
      "Ürünlerimiz KOBİ'lerden büyük kurumsal şirketlere kadar geniş bir yelpazede hizmet verir. Özellikle operasyonlarını dijitalleştirmek isteyen, veriye dayalı karar almayı hedefleyen ve büyüme sürecindeki işletmeler için idealdir.",
    answerEn:
      "Our products serve a wide range from SMEs to large enterprises. They are particularly ideal for businesses looking to digitize their operations, aim for data-driven decision-making, and are in a growth phase.",
  },
  {
    question: "Sürdürülebilirlik yaklaşımınız nedir?",
    questionEn: "What is your sustainability approach?",
    answer:
      "Her projede çevresel farkındalıkla hareket ediyoruz. Geliştirdiğimiz her yazılım için bağış yapıyor, ağaç dikimi programlarına katılıyoruz. Dijital ürünlerimizde enerji verimliliği ve uzun ömürlü mimari önceliğimizdir.",
    answerEn:
      "We act with environmental awareness in every project. For every software we develop, we make donations and participate in tree-planting programs. Energy efficiency and long-lived architecture are our priorities in digital products.",
  },
];
