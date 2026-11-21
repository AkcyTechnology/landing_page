/** Soru-cevap penceresini açar; detail.id verilirse o soruyu hemen cevaplar */
export const OPEN_FAQ_EVENT = "akcy:open-faq";

export function openFaq(id?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_FAQ_EVENT, { detail: { id } }));
}
