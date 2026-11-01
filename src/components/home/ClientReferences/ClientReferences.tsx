import fs from "node:fs";
import path from "node:path";

import ClientReferencesView, {
  type ClientReference,
} from "./ClientReferencesView";

const references: ClientReference[] = [
  {
    id: "cakiroglu",
    name: "Çakıroğlu Savunma ve Kaynak Teknolojileri",
    category: "Kurumsal Web · Dijital Deneyim",
    description:
      "Kurumsal marka yapısını ve ürün/hizmet portföyünü dijital ortamda güçlü bir şekilde sunan modern web deneyimi.",
    logo: "/images/clients/cakiroglu.png",
  },
  {
    id: "gokce",
    name: "Gökçe Kombi",
    category: "Web · E-Ticaret · Dijital Dönüşüm",
    description:
      "Ürün keşfi, dijital iletişim ve satış süreçlerini bir araya getiren kullanıcı odaklı web deneyimi.",
    logo: "/images/clients/gokce.png",
  },
];

/*
  Logo dosyaları public/images/clients/ altına eklenene kadar
  <Image> isteği hiç yapılmasın: aksi halde tarayıcı konsoluna
  404/400 hatası düşer. Dosya varsa logo, yoksa baş harfler gösterilir.
*/
function logoExists(logo: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", logo));
  } catch {
    return false;
  }
}

export default function ClientReferences() {
  const items = references.map((ref) => ({
    ...ref,
    hasLogo: logoExists(ref.logo),
  }));

  return <ClientReferencesView references={items} />;
}
