// Kartlardaki imleç ışığı için konumu CSS değişkenlerine (--mx, --my) yazar.
export function trackPointer(event: React.PointerEvent<HTMLElement>) {
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();

  element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  element.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
