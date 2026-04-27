"use client";

import HTMLReactParser, { domToReact, type DOMNode } from "html-react-parser";
import Image from "next/image";

export function BlogContent({ html }: { html: string }) {
	const options = {
		replace: (domNode: DOMNode) => {
			const node = domNode as any;

			if (
				node.type === "tag" &&
				node.name === "div" &&
				node.attribs?.["data-type"] === "two-column-layout"
			) {
				const imagePosition: "left" | "right" =
					node.attribs["data-image-position"] === "right" ? "right" : "left";
				const imageSrc: string = node.attribs["data-image-src"] || "";
				const imageAlt: string = node.attribs["data-image-alt"] || "Layout image";
				const imageCaption: string = node.attribs["data-image-caption"] || "";
				const imageWidth: number = parseFloat(node.attribs["data-image-width"]) || 50;
				const imageHeight: number = parseFloat(node.attribs["data-image-height"]) || 400;

				return (
					<div className="two-column-layout my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
						<div
							className={`flex flex-col sm:flex-row gap-0 ${imagePosition === "right" ? "sm:flex-row-reverse" : ""
								}`}
						>
							{/* Image column */}
							{imageSrc && (
								<div
									className="shrink-0 relative"
									style={{ width: `${imageWidth}%` }}
								>
									<div className="relative w-full h-full min-h-[220px]">
										<Image
											src={imageSrc}
											alt={imageAlt}
											fill
											className="object-cover"
										/>
									</div>
									{imageCaption && (
										<p className="text-xs text-center text-slate-500 dark:text-slate-400 italic py-2 px-3 bg-slate-50 dark:bg-slate-800">
											{imageCaption}
										</p>
									)}
								</div>
							)}

							{/* Text column */}
							<div className="flex-1 min-w-0 p-6 prose prose-slate dark:prose-invert max-w-none">
								{domToReact(node.children as DOMNode[], options)}
							</div>
						</div>
					</div>
				);
			}

			return undefined;
		},
	};

	return (
		<>
			{HTMLReactParser(html, options)}
		</>
	);
}