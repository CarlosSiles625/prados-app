"use client";
import DOMPurify from "dompurify";
export function RenderHtml({ htmlString }: { htmlString: string }) {
  const cleanHtml = DOMPurify.sanitize(htmlString, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "a",
      "b",
      "i",
      "em",
      "strong",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "code",
      "pre",
      "img",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class"],
  });

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
