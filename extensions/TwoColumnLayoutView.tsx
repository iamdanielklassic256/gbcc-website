import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { MoveHorizontal, Pencil, GripVertical } from "lucide-react";
import { MediaSelector } from "@/components/shared/MediaSelector";

export function TwoColumnLayoutView({ node, updateAttributes, editor }: any) {
  const { imagePosition, imageSrc, imageAlt, imageCaption, imageWidth, imageHeight } = node.attrs;
  const [hovered, setHovered] = useState(false);
  const [editingCaption, setEditingCaption] = useState(false);
  const [captionDraft, setCaptionDraft] = useState(imageCaption ?? "");
  const captionRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isDragging = useRef(false);

  const isLeft = imagePosition === "left";
  const clampedWidth = Math.min(80, Math.max(20, imageWidth ?? 50));

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;

    const onMove = (ev: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let pct = ((ev.clientX - rect.left) / rect.width) * 100;
      if (!isLeft) pct = 100 - pct;
      pct = Math.min(80, Math.max(20, Math.round(pct)));
      updateAttributes({ imageWidth: pct });
    };

    const onUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [isLeft, updateAttributes]);

  const onImgResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startY = e.clientY;
    const startHeight = imgRef.current?.getBoundingClientRect().height ?? (imageHeight ?? 200);

    const onMove = (ev: MouseEvent) => {
      const newH = Math.max(60, Math.round(startHeight + (ev.clientY - startY)));
      updateAttributes({ imageHeight: newH });
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [imageHeight, updateAttributes]);

  // Focus caption input when editing starts
  useEffect(() => {
    if (editingCaption && captionRef.current) {
      captionRef.current.focus();
    }
  }, [editingCaption]);

  // Sync external attr changes into local draft
  useEffect(() => {
    setCaptionDraft(imageCaption ?? "");
  }, [imageCaption]);

  const commitCaption = () => {
    updateAttributes({ imageCaption: captionDraft });
    setEditingCaption(false);
  };

  const imageCol = (
    <div className="min-w-0 flex flex-col gap-1.5" style={{ width: `${clampedWidth}%`, flexShrink: 0 }}>
      {imageSrc ? (
        <>
          <div className="relative group/img">
            <img
              ref={imgRef}
              src={imageSrc}
              alt={imageAlt || imageCaption || "Layout image"}
              className="rounded-lg w-full object-cover shadow-sm block"
              style={{ height: imageHeight ? `${imageHeight}px` : "auto" }}
            />
            {/* Bottom resize handle */}
            {editor.isEditable && (
              <div
                onMouseDown={onImgResizeStart}
                className="absolute bottom-0 inset-x-0 h-3 flex items-center justify-center cursor-ns-resize opacity-0 group-hover/img:opacity-100 transition-opacity"
              >
                <div className="w-10 h-1 rounded-full bg-white/80 shadow" />
              </div>
            )}
            {editor.isEditable && (
              <div className="absolute inset-0 hidden group-hover/img:flex items-center justify-center bg-black/30 rounded-lg gap-2">
                <MediaSelector
                  defaultValue={imageSrc}
                  onSelect={(url) => updateAttributes({ imageSrc: url })}
                  trigger={
                    <button
                      type="button"
                      className="bg-white text-xs px-3 py-1.5 rounded-md shadow font-medium hover:bg-gray-50 transition-colors"
                    >
                      Change image
                    </button>
                  }
                />
              </div>
            )}
          </div>

          {/* Caption row */}
          {editor.isEditable ? (
            <div className="flex items-center gap-1 group/caption">
              {editingCaption ? (
                <input
                  ref={captionRef}
                  type="text"
                  value={captionDraft}
                  onChange={(e) => setCaptionDraft(e.target.value)}
                  onBlur={commitCaption}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitCaption();
                    if (e.key === "Escape") {
                      setCaptionDraft(imageCaption ?? "");
                      setEditingCaption(false);
                    }
                  }}
                  placeholder="Add a caption..."
                  className="flex-1 text-xs text-center text-muted-foreground bg-transparent border-b border-primary/50 outline-none py-0.5 placeholder:text-muted-foreground/40"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingCaption(true)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-0.5 group"
                >
                  <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                  <span className={imageCaption ? "italic" : "opacity-40"}>
                    {imageCaption || "Add a caption..."}
                  </span>
                </button>
              )}
            </div>
          ) : (
            imageCaption && (
              <p className="text-xs text-center text-muted-foreground italic px-2">
                {imageCaption}
              </p>
            )
          )}
        </>
      ) : (
        editor.isEditable && (
          <MediaSelector
            onSelect={(url) => updateAttributes({ imageSrc: url })}
            label="Click to add image"
          />
        )
      )}
    </div>
  );

  const resizeHandle = editor.isEditable ? (
    <div
      onMouseDown={onResizeStart}
      className="flex-shrink-0 flex items-center justify-center w-3 self-stretch cursor-col-resize group/handle select-none"
      title="Drag to resize"
    >
      <div className="w-0.5 h-full rounded-full bg-muted-foreground/20 group-hover/handle:bg-primary/50 transition-colors flex items-center justify-center">
        <GripVertical className="h-4 w-4 text-muted-foreground/40 group-hover/handle:text-primary/60 absolute" />
      </div>
    </div>
  ) : null;

  const textCol = (
    <div className="flex-1 min-w-0">
      <NodeViewContent className="prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[80px]" />
    </div>
  );

  return (
    <NodeViewWrapper
      className="my-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <div className="relative rounded-xl border border-dashed border-muted-foreground/20 p-4 hover:border-primary/40 transition-colors">
        {/* Flip layout button */}
        {editor.isEditable && hovered && (
          <button
            type="button"
            title="Flip layout"
            onClick={() =>
              updateAttributes({
                imagePosition: isLeft ? "right" : "left",
              })
            }
            className="absolute top-2 right-2 z-10 bg-background border rounded-md p-1.5 shadow-sm hover:bg-muted transition-colors"
          >
            <MoveHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        )}

        <div className="flex items-start" ref={containerRef}>
          {isLeft ? (
            <>
              {imageCol}
              {resizeHandle}
              {textCol}
            </>
          ) : (
            <>
              {textCol}
              {resizeHandle}
              {imageCol}
            </>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
}