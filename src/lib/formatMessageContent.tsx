// utils/formatMessageContent.tsx
import React from "react";

export function formatMessageContent(content: string) {
  // Split on double newline for paragraphs
  const paragraphs = content.split(/\n{2,}/g);

  return paragraphs.map((para, idx) => {
    // Bullet point detection
    if (para.trim().startsWith("- ") || para.trim().startsWith("• ")) {
      // Split lines, filter bullets
      const items = para.split(/\n/g).filter(line => line.trim().startsWith("- ") || line.trim().startsWith("• "));
      return (
        <ul className="list-disc pl-6 mb-2" key={idx}>
          {items.map((item, i) => (
            <li key={i}>{item.replace(/^[-•]\s*/, "")}</li>
          ))}
        </ul>
      );
    } else {
      // Fallback: lines with single newline, join with <br/>
      return (
        <p className="mb-2" key={idx}>
          {para.split(/\n/).map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < para.split(/\n/).length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
    }
  });
}
