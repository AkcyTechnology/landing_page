import type { Locale } from "@/i18n/config";
import type { LegalSection } from "@/components/legal/LegalPageLayout/LegalPageLayout";

/*
  Yasal sayfaların metinleri (Türkçe ve İngilizce).
  Sayfa yapısı LegalPageLayout bileşeninde ortaktır.
*/

export type LegalPageKey = "privacy" | "kvkk" | "cookies";

export interface LegalPageContent {
  metaTitle: string;
  metaDescription: string;
  title: string;
  introduction: string;
  sections: LegalSection[];
}

export const legalPages: Record<LegalPageKey, Record<Locale, LegalPageContent>> = {
  privacy: {
    tr: {
      metaTitle: "Gizlilik Politikası",
      metaDescription: "AKCY Technologies gizlilik politikası ve kişisel verilerin işlenmesine ilişkin bilgiler.",
      title: "Gizlilik Politikası",
      introduction: "AKCY Technologies olarak kullanıcılarımızın gizliliğine önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde hangi bilgilerin işlenebileceğini, bu bilgilerin hangi amaçlarla kullanılabileceğini ve kişisel verilerin korunmasına ilişkin yaklaşımımızı açıklamaktadır.",
      sections: [
  {id: "toplanan-bilgiler", title: "Toplanan Bilgiler", content: <><p>Web sitemizi kullanırken aşağıdaki bilgiler işlenebilir:</p><ul><li>İletişim formu aracılığıyla paylaştığınız ad, soyad, e-posta adresi ve telefon numarası</li><li>Talep, proje veya mesaj içeriğiniz</li><li>IP adresi, tarayıcı türü, cihaz bilgileri ve ziyaret bilgileri</li><li>Çerezler aracılığıyla elde edilen kullanım ve performans verileri</li></ul><p>Web sitesi üzerinden gerekli olmadığı sürece özel nitelikli kişisel veri talep edilmemektedir.</p></>},
  {id: "kullanim-amaclari", title: "Bilgilerin Kullanım Amaçları", content: <><p>Toplanan bilgiler;</p><ul><li>İletişim taleplerine yanıt verilmesi</li><li>Proje ve hizmet taleplerinin değerlendirilmesi</li><li>Teklif ve iş süreçlerinin yürütülmesi</li><li>Web sitesinin performansının ve kullanıcı deneyiminin geliştirilmesi</li><li>Bilgi güvenliğinin sağlanması</li><li>Yasal yükümlülüklerin yerine getirilmesi</li></ul><p>amaçlarıyla kullanılabilir.</p></>},
  {id: "veri-paylasimi", title: "Verilerin Paylaşılması", content: <><p>Kişisel verileriniz, hukuki zorunluluklar dışında üçüncü kişilerle satılmaz veya ticari amaçlarla paylaşılmaz.</p><p>Hizmetlerin yürütülmesi kapsamında barındırma, e-posta, analitik veya teknik altyapı sağlayıcılarıyla sınırlı veri paylaşımı yapılabilir. İletişim formuyla ilettiğiniz bilgiler, talebinizin e-posta olarak gönderilmesi için Resend üzerinden işlenir.</p></>},
  {id: "veri-guvenligi", title: "Veri Güvenliği", content: <p>Kişisel verilerin yetkisiz erişim, kayıp, değişiklik veya açıklanmaya karşı korunması için uygun teknik ve idari tedbirlerin uygulanmasına özen gösterilmektedir.</p>},
  {id: "ucuncu-taraflar", title: "Üçüncü Taraf Bağlantılar", content: <><p>Web sitemiz LinkedIn, Instagram ve diğer üçüncü taraf platformlara bağlantılar içerebilir.</p><p>Bu platformların kendi gizlilik politikaları geçerlidir.</p></>},
  {id: "haklariniz", title: "Haklarınız", content: <><p>Kişisel verileriniz hakkında bilgi almak veya taleplerinizi iletmek için bizimle iletişime geçebilirsiniz.</p><p>E-posta: <a href="mailto:akcyglobal@gmail.com">akcyglobal@gmail.com</a></p></>},
  {id: "guncellemeler", title: "Güncellemeler", content: <p>Bu Gizlilik Politikası gerektiğinde güncellenebilir. Güncel metin her zaman bu sayfa üzerinden yayımlanır.</p>},
      ],
    },
    en: {
      metaTitle: "Privacy Policy",
      metaDescription: "AKCY Technologies privacy policy and information on the processing of personal data.",
      title: "Privacy Policy",
      introduction: "At AKCY Technologies, we care about the privacy of our users. This Privacy Policy explains what information may be processed when you visit our website, the purposes for which it may be used and our approach to protecting personal data.",
      sections: [
  {id: "information-we-collect", title: "Information We Collect", content: <><p>When you use our website, the following information may be processed:</p><ul><li>Your name, surname, email address and phone number shared through the contact form</li><li>The content of your request, project or message</li><li>IP address, browser type, device information and visit information</li><li>Usage and performance data obtained through cookies</li></ul><p>Special categories of personal data are not requested through the website unless necessary.</p></>},
  {id: "purposes-of-use", title: "How We Use Information", content: <><p>The information collected may be used to:</p><ul><li>Respond to contact requests</li><li>Evaluate project and service requests</li><li>Carry out quotation and business processes</li><li>Improve website performance and user experience</li><li>Ensure information security</li><li>Fulfil legal obligations</li></ul></>},
  {id: "data-sharing", title: "Sharing of Data", content: <><p>Your personal data is not sold to third parties or shared for commercial purposes, except where required by law.</p><p>Limited data may be shared with hosting, email, analytics or technical infrastructure providers in order to deliver our services. The information you send through the contact form is processed via Resend so that your request can be delivered by email.</p></>},
  {id: "data-security", title: "Data Security", content: <p>We take care to apply appropriate technical and administrative measures to protect personal data against unauthorised access, loss, alteration or disclosure.</p>},
  {id: "third-party-links", title: "Third-Party Links", content: <><p>Our website may contain links to LinkedIn, Instagram and other third-party platforms.</p><p>The privacy policies of those platforms apply.</p></>},
  {id: "your-rights", title: "Your Rights", content: <><p>You can contact us to obtain information about your personal data or to submit your requests.</p><p>Email: <a href="mailto:akcyglobal@gmail.com">akcyglobal@gmail.com</a></p></>},
  {id: "updates", title: "Updates", content: <p>This Privacy Policy may be updated when necessary. The current version is always published on this page.</p>},
      ],
    },
  },
  kvkk: {
    tr: {
      metaTitle: "KVKK Aydınlatma Metni",
      metaDescription: "AKCY Technologies 6698 sayılı KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.",
      title: "Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni",
      introduction: "AKCY Technologies tarafından kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aşağıda açıklanan esaslara uygun olarak işlenmektedir.",
      sections: [
  {id: "veri-sorumlusu", title: "Veri Sorumlusu", content: <><p>Kişisel verileriniz, ilgili mevzuat kapsamında veri sorumlusu sıfatıyla AKCY Technologies tarafından işlenebilir.</p><p>E-posta: <a href="mailto:akcyglobal@gmail.com">akcyglobal@gmail.com</a><br />Telefon: <a href="tel:+905526290420">+90 552 629 04 20</a><br />Konum: İstanbul, Türkiye</p></>},
  {id: "kisisel-veriler", title: "İşlenebilecek Kişisel Veriler", content: <ul><li>Ad ve soyad</li><li>E-posta adresi</li><li>Telefon numarası</li><li>Firma bilgisi</li><li>İletişim ve talep bilgileri</li><li>İşlem güvenliği bilgileri</li><li>IP ve bağlantı kayıtları</li></ul>},
  {id: "isleme-amaclari", title: "Kişisel Verilerin İşlenme Amaçları", content: <ul><li>İletişim faaliyetlerinin yürütülmesi</li><li>Ürün ve hizmet taleplerinin değerlendirilmesi</li><li>Teklif süreçlerinin yönetilmesi</li><li>Müşteri ilişkilerinin yürütülmesi</li><li>Bilgi güvenliği süreçlerinin yürütülmesi</li><li>Hukuki yükümlülüklerin yerine getirilmesi</li><li>Talep ve şikâyetlerin sonuçlandırılması</li></ul>},
  {id: "toplanma-yontemi", title: "Kişisel Verilerin Toplanma Yöntemi", content: <><p>Kişisel veriler;</p><ul><li>Web sitesi iletişim formları</li><li>E-posta</li><li>Telefon</li><li>Elektronik iletişim kanalları</li><li>Çerezler ve benzeri teknolojiler</li></ul><p>üzerinden elektronik ortamda elde edilebilir.</p></>},
  {id: "hukuki-sebepler", title: "Hukuki Sebepler", content: <><p>Kişisel veriler, KVKK’nın 5. maddesinde belirtilen hukuki sebepler kapsamında işlenebilir. Bunlar arasında:</p><ul><li>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması</li><li>Veri sorumlusunun hukuki yükümlülüğünün yerine getirilmesi</li><li>Bir hakkın tesisi, kullanılması veya korunması</li><li>Veri sorumlusunun meşru menfaatleri</li><li>Gerekli durumlarda açık rıza</li></ul><p>bulunabilir.</p></>},
  {id: "verilerin-aktarilmasi", title: "Kişisel Verilerin Aktarılması", content: <><p>Kişisel veriler gerekli olduğu ölçüde:</p><ul><li>Yetkili kamu kurumlarına</li><li>Hukuki ve mali danışmanlara</li><li>Teknik altyapı ve barındırma sağlayıcılarına</li><li>Hizmet sağlayıcılara</li></ul><p>mevzuata uygun şekilde aktarılabilir.</p></>},
  {id: "kvkk-haklari", title: "KVKK Kapsamındaki Haklar", content: <><p>KVKK’nın 11. maddesi kapsamında ilgili kişiler;</p><ul><li>Kişisel verilerinin işlenip işlenmediğini öğrenme</li><li>İşlenmişse bilgi talep etme</li><li>İşlenme amacını öğrenme</li><li>Aktarıldığı üçüncü kişileri öğrenme</li><li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</li><li>Kanuni şartların oluşması halinde silinmesini veya yok edilmesini isteme</li><li>Hukuka aykırı işleme nedeniyle zarar oluşması halinde zararın giderilmesini talep etme</li></ul><p>haklarına sahiptir. Başvurularınızı <a href="mailto:akcyglobal@gmail.com">akcyglobal@gmail.com</a> adresine iletebilirsiniz.</p></>},
      ],
    },
    en: {
      metaTitle: "KVKK Information Notice",
      metaDescription: "AKCY Technologies information notice on the processing of personal data under Turkish Law No. 6698 (KVKK).",
      title: "Information Notice Under the Turkish Personal Data Protection Law (KVKK)",
      introduction: "Your personal data is processed by AKCY Technologies in accordance with the principles set out below under Law No. 6698 on the Protection of Personal Data (KVKK).",
      sections: [
  {id: "data-controller", title: "Data Controller", content: <><p>Your personal data may be processed by AKCY Technologies as the data controller under the applicable legislation.</p><p>Email: <a href="mailto:akcyglobal@gmail.com">akcyglobal@gmail.com</a><br />Phone: <a href="tel:+905526290420">+90 552 629 04 20</a><br />Location: Istanbul, Türkiye</p></>},
  {id: "personal-data", title: "Personal Data That May Be Processed", content: <ul><li>Name and surname</li><li>Email address</li><li>Phone number</li><li>Company information</li><li>Contact and request information</li><li>Transaction security information</li><li>IP and connection logs</li></ul>},
  {id: "processing-purposes", title: "Purposes of Processing Personal Data", content: <ul><li>Carrying out communication activities</li><li>Evaluating product and service requests</li><li>Managing quotation processes</li><li>Managing customer relationships</li><li>Carrying out information security processes</li><li>Fulfilling legal obligations</li><li>Resolving requests and complaints</li></ul>},
  {id: "collection-method", title: "Method of Collecting Personal Data", content: <><p>Personal data may be obtained electronically through:</p><ul><li>Website contact forms</li><li>Email</li><li>Phone</li><li>Electronic communication channels</li><li>Cookies and similar technologies</li></ul></>},
  {id: "legal-grounds", title: "Legal Grounds", content: <><p>Personal data may be processed on the legal grounds set out in Article 5 of the KVKK. These may include:</p><ul><li>Being directly related to the conclusion or performance of a contract</li><li>Fulfilling a legal obligation of the data controller</li><li>Establishing, exercising or protecting a right</li><li>The legitimate interests of the data controller</li><li>Explicit consent where necessary</li></ul></>},
  {id: "data-transfer", title: "Transfer of Personal Data", content: <><p>To the extent necessary, personal data may be transferred in accordance with the legislation to:</p><ul><li>Authorised public institutions</li><li>Legal and financial advisers</li><li>Technical infrastructure and hosting providers</li><li>Service providers</li></ul></>},
  {id: "kvkk-rights", title: "Rights Under the KVKK", content: <><p>Under Article 11 of the KVKK, data subjects have the right to:</p><ul><li>Learn whether their personal data is processed</li><li>Request information if it has been processed</li><li>Learn the purpose of processing</li><li>Know the third parties to whom it has been transferred</li><li>Request correction of incomplete or inaccurate data</li><li>Request deletion or destruction where the legal conditions are met</li><li>Claim compensation for damages arising from unlawful processing</li></ul><p>You can send your requests to <a href="mailto:akcyglobal@gmail.com">akcyglobal@gmail.com</a>.</p></>},
      ],
    },
  },
  cookies: {
    tr: {
      metaTitle: "Çerez Politikası",
      metaDescription: "AKCY Technologies web sitesinde kullanılan çerezler ve çerez tercihleri hakkında bilgiler.",
      title: "Çerez Politikası",
      introduction: "Bu Çerez Politikası, AKCY Technologies web sitesinde kullanılan çerezlerin ne olduğunu ve hangi amaçlarla kullanılabileceğini açıklamaktadır.",
      sections: [
  {id: "cerez-nedir", title: "Çerez Nedir?", content: <p>Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilebilen küçük veri dosyalarıdır.</p>},
  {id: "cerez-turleri", title: "Kullanılabilecek Çerez Türleri", content: <><h3>Zorunlu Çerezler</h3><p>Web sitesinin temel fonksiyonlarının çalışması için gereklidir.</p><h3>Tercih Çerezleri</h3><p>Dil, görünüm veya diğer kullanıcı tercihlerinin hatırlanmasını sağlar.</p><h3>Analitik Çerezler</h3><p>Web sitesi kullanımı ve performansı hakkında bilgi edinilmesini sağlayabilir.</p><h3>Pazarlama Çerezleri</h3><p>Reklam veya yeniden pazarlama sistemleri kullanılması halinde gerekli izin mekanizmalarıyla kullanılabilir.</p><p>Mevcut site kodunda ziyaretçi analitiği veya reklam takibi için çerez oluşturan bir sistem bulunmamaktadır.</p></>},
  {id: "ucuncu-taraf-hizmetler", title: "Üçüncü Taraf Hizmetler", content: <><p>Google Analytics, Google Maps, YouTube, sosyal medya servisleri veya diğer üçüncü taraf entegrasyonlar kullanılırsa bu servisler kendi çerezlerini oluşturabilir.</p><p>Blog yazılarındaki üçüncü taraf videolar, yalnızca ilgili videoyu yüklemeyi seçtiğinizde bağlantı kurar. Dış bağlantılarla ziyaret ettiğiniz platformların kendi gizlilik ve çerez politikaları geçerlidir.</p></>},
  {id: "cerez-yonetimi", title: "Çerezlerin Yönetilmesi", content: <><p>Tarayıcı ayarlarınız üzerinden çerezleri kabul edebilir, engelleyebilir veya silebilirsiniz.</p><p>Üçüncü taraf video hizmetlerini kullanmak istemiyorsanız videoyu yüklemeyebilirsiniz. Video tercihi yalnızca açık sayfa için geçerlidir; sonraki ziyaretlerde videolar kendiliğinden yüklenmez.</p></>},
  {id: "iletisim", title: "İletişim", content: <p>Çerez uygulamalarımız hakkında sorularınız için <a href="mailto:akcyglobal@gmail.com">akcyglobal@gmail.com</a> adresinden bizimle iletişime geçebilirsiniz.</p>},
      ],
    },
    en: {
      metaTitle: "Cookie Policy",
      metaDescription: "Information about the cookies used on the AKCY Technologies website and your cookie preferences.",
      title: "Cookie Policy",
      introduction: "This Cookie Policy explains what the cookies used on the AKCY Technologies website are and the purposes for which they may be used.",
      sections: [
  {id: "what-are-cookies", title: "What Are Cookies?", content: <p>Cookies are small data files that may be stored on your device through your browser when you visit a website.</p>},
  {id: "cookie-types", title: "Types of Cookies That May Be Used", content: <><h3>Strictly Necessary Cookies</h3><p>Required for the core functions of the website to work.</p><h3>Preference Cookies</h3><p>Allow language, display or other user preferences to be remembered.</p><h3>Analytics Cookies</h3><p>May provide information about how the website is used and how it performs.</p><h3>Marketing Cookies</h3><p>May be used with the necessary consent mechanisms if advertising or remarketing systems are used.</p><p>The current site code does not include any system that creates cookies for visitor analytics or ad tracking.</p></>},
  {id: "third-party-services", title: "Third-Party Services", content: <><p>If Google Analytics, Google Maps, YouTube, social media services or other third-party integrations are used, these services may set their own cookies.</p><p>Third-party videos in blog posts only connect when you choose to load the video. The privacy and cookie policies of the platforms you visit through external links apply.</p></>},
  {id: "managing-cookies", title: "Managing Cookies", content: <><p>You can accept, block or delete cookies through your browser settings.</p><p>If you do not want to use third-party video services, you can choose not to load the video. Your video choice applies only to the open page; videos do not load automatically on later visits.</p></>},
  {id: "contact", title: "Contact", content: <p>For questions about our cookie practices, you can contact us at <a href="mailto:akcyglobal@gmail.com">akcyglobal@gmail.com</a>.</p>},
      ],
    },
  },
};
