import { ViewTransition } from "react";

/*
  Template her navigasyonda yeniden oluşturulur; bu sayede sayfa içeriği
  için giriş/çıkış geçişi tetiklenir. Header ve footer layout'ta kalır.
*/
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
