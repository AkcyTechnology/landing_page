import type { FaqItem } from "@/content/sss-asistan";

/** Türkçe karakterleri ve büyük/küçük harfi yok sayan karşılaştırma biçimi */
export function normalize(value: string): string {
  return value
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP_WORDS = new Set([
  "ve", "ile", "bir", "bu", "mi", "mu", "mı", "ne", "nasil", "icin", "da", "de", "ben", "biz", "siz", "var", "mii",
  "the", "a", "an", "and", "or", "is", "are", "do", "you", "your", "i", "we", "can", "to", "of", "for", "how", "what",
]);

/*
  Ziyaretçinin yazdığı soruya en uygun cevabı bulur.
  Puan: anahtar kelime eşleşmesi (çok kelimeli ifadeler daha değerli) +
  soru metniyle ortak kelimeler. Yeterli puan yoksa null döner.
*/
export function findAnswer(items: FaqItem[], text: string): FaqItem | null {
  const query = normalize(text);
  if (!query) return null;
  const words = query.split(" ").filter((word) => word.length > 1 && !STOP_WORDS.has(word));

  let best: { item: FaqItem; score: number } | null = null;
  for (const item of items) {
    let score = 0;
    for (const keyword of item.keywords) {
      const key = normalize(keyword);
      if (!key) continue;
      if (query.includes(key)) score += key.includes(" ") ? 4 : 3;
      else if (words.some((word) => word.length > 3 && (key.startsWith(word) || word.startsWith(key)))) score += 1.5;
    }
    const questionWords = normalize(item.question).split(" ").filter((word) => word.length > 2 && !STOP_WORDS.has(word));
    score += words.filter((word) => questionWords.some((q) => q === word || (word.length > 3 && q.startsWith(word)))).length;
    if (!best || score > best.score) best = { item, score };
  }
  return best && best.score >= 2.5 ? best.item : null;
}
