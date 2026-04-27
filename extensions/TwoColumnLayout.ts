// src/extensions/TwoColumnLayout.ts
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { TwoColumnLayoutView } from "./TwoColumnLayoutView";

export const TwoColumnLayout = Node.create({
  name: "twoColumnLayout",
  group: "block",
  content: "block+",
  atom: false,
  draggable: true,

  addAttributes() {
    return {
      imagePosition: { default: "left" }, // "left" | "right"
      imageSrc: { default: "" },
      imageAlt: { default: "" },
      imageCaption: { default: "" },
      imageWidth: { default: 50 }, // percentage 20–80
      imageHeight: { default: null }, // px number or null (auto)
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="two-column-layout"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "two-column-layout" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TwoColumnLayoutView);
  },
});