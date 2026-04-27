// components/blogs/BlogContentRenderer.tsx
"use client";

import { useEffect, useState } from "react";
import { TwoColumnLayout } from "./TwoColumnLayout";

interface BlogContentRendererProps {
  html: string;
}

export function BlogContentRenderer({ html }: BlogContentRendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[200px]" />;
  }

  // Parse HTML and find two-column layouts
  const parseContent = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const containers = doc.querySelectorAll("[data-type='two-column-layout']");

    if (containers.length === 0) {
      // No custom layouts, return HTML as is
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }

    // Process each two-column layout
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    Array.from(containers).forEach((container, idx) => {
      // Get the original HTML position (simplified - you might need a more robust approach)
      const containerHtml = container.outerHTML;
      const position = html.indexOf(containerHtml, lastIndex);
      
      // Add text before this container
      if (position > lastIndex) {
        const beforeHtml = html.substring(lastIndex, position);
        elements.push(
          <div key={`text-${idx}`} dangerouslySetInnerHTML={{ __html: beforeHtml }} />
        );
      }

      // Parse container attributes
      const attrs = {
        imagePosition: (container.getAttribute("data-image-position") || "left") as "left" | "right",
        imageSrc: container.getAttribute("data-image-src") || "",
        imageAlt: container.getAttribute("data-image-alt") || "",
        imageCaption: container.getAttribute("data-image-caption") || "",
        imageWidth: parseInt(container.getAttribute("data-image-width") || "50"),
      };

      // Get content inside the container (the text portion)
      const contentDiv = container.querySelector(".two-column-content");
      const contentHtml = contentDiv?.innerHTML || "";

      elements.push(
        <TwoColumnLayout key={`layout-${idx}`} {...attrs}>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </TwoColumnLayout>
      );

      lastIndex = position + containerHtml.length;
    });

    // Add remaining HTML
    if (lastIndex < html.length) {
      elements.push(
        <div key="text-end" dangerouslySetInnerHTML={{ __html: html.substring(lastIndex) }} />
      );
    }

    return <>{elements}</>;
  };

  return <div className="blog-content">{parseContent()}</div>;
}