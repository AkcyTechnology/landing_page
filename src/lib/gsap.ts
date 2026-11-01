import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  var __gsapPluginsRegistered: boolean | undefined;
}

if (typeof window !== "undefined" && !globalThis.__gsapPluginsRegistered) {
  gsap.registerPlugin(ScrollTrigger);
  globalThis.__gsapPluginsRegistered = true;
}

export { gsap, ScrollTrigger };
