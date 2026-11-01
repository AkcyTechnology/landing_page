export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // "<" kaçışı, metin içindeki "</script>" dizisinin etiketi kapatmasını engeller.
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
