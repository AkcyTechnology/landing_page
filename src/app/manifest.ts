import type { MetadataRoute } from "next";

// Statik export: manifest build sırasında dosya olarak üretilir.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AKCY Technologies",
    short_name: "AKCY",
    description: "Yapay zekâ, otomasyon ve yazılım çözümleri",
    start_url: "/",
    display: "browser",
    lang: "tr",
    background_color: "#f7f9fb",
    theme_color: "#06101f",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
