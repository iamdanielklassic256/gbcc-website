// components/blogs/TwoColumnLayout.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface TwoColumnLayoutProps {
  imagePosition: "left" | "right";
  imageSrc: string;
  imageAlt?: string;
  imageCaption?: string;
  imageWidth?: number;
  children: React.ReactNode;
}

export function TwoColumnLayout({
  imagePosition,
  imageSrc,
  imageAlt,
  imageCaption,
  imageWidth = 50,
  children,
}: TwoColumnLayoutProps) {
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageSrc);

  // Fix Google Drive images - convert to direct access URL
  useEffect(() => {
    if (imageSrc?.includes("drive.google.com")) {
      // Extract file ID from Google Drive URL
      const match = imageSrc.match(/[?&]id=([^&]+)/);
      if (match) {
        const fileId = match[1];
        // Use the direct download URL which works better for images
        setImgSrc(`https://drive.google.com/uc?export=view&id=${fileId}`);
      }
    }
  }, [imageSrc]);

  // Calculate image width percentage
  const clampedWidth = Math.min(80, Math.max(20, imageWidth));

  return (
    <div
      className={`two-column-layout ${imagePosition === "left" ? "image-left" : "image-right"}`}
      style={{
        display: "flex",
        gap: "2rem",
        margin: "2rem 0",
        flexDirection: imagePosition === "left" ? "row" : "row-reverse",
        flexWrap: "wrap",
      }}
    >
      {/* Image Column */}
      <div
        className="two-column-image"
        style={{
          flex: `0 0 ${clampedWidth}%`,
          minWidth: "200px",
        }}
      >
        {imageSrc && !imgError ? (
          <div className="relative w-full" style={{ minHeight: "200px" }}>
            <img
              src={imgSrc}
              alt={imageAlt || "Blog image"}
              className="w-full h-auto rounded-lg object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-[200px] bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <span className="text-slate-400 text-sm">Image not available</span>
          </div>
        )}
        {imageCaption && (
          <p className="image-caption text-center text-sm text-slate-500 dark:text-slate-400 italic mt-2">
            {imageCaption}
          </p>
        )}
      </div>

      {/* Content Column */}
      <div
        className="two-column-content"
        style={{
          flex: 1,
          minWidth: "200px",
        }}
      >
        {children}
      </div>
    </div>
  );
}