"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Share2, Facebook, Twitter, Link2, Check } from "lucide-react";
import { useState } from "react";

interface BlogPost {
	id: string;
	title: string;
	slug: string;
	content: string;
	excerpt: string;
	coverImage: string;
	tags: string;
	category: string;
	author: string;
	status: string;
	isFeatured: boolean;
	publishedAt: string;
	viewCount: number;
	createdAt: string;
	updatedAt: string;
}

interface ParsedBlock {
	type: "html" | "two-column";
	html?: string;
	imageSrc?: string;
	imageAlt?: string;
	imageCaption?: string;
	imagePosition?: "left" | "right";
	innerHtml?: string;
}

function parseContent(content: string): ParsedBlock[] {
	const blocks: ParsedBlock[] = [];
	const OPEN_TAG = 'data-type="two-column-layout"';

	let remaining = content;

	while (remaining.includes(OPEN_TAG)) {
		const divStart = remaining.lastIndexOf("<div", remaining.indexOf(OPEN_TAG));

		const before = remaining.slice(0, divStart).trim();
		if (before) blocks.push({ type: "html", html: before });

		let depth = 0;
		let i = divStart;
		let closeIndex = -1;

		while (i < remaining.length) {
			if (remaining.slice(i).match(/^<div[\s>]/)) {
				depth++;
				i += 4;
			} else if (remaining.slice(i, i + 6) === "</div>") {
				depth--;
				if (depth === 0) {
					closeIndex = i;
					break;
				}
				i += 6;
			} else {
				i++;
			}
		}

		if (closeIndex === -1) break;

		const fullBlock = remaining.slice(divStart, closeIndex + 6);
		const openTagEnd = fullBlock.indexOf(">");
		const attrs = fullBlock.slice(0, openTagEnd);
		const innerHtml = fullBlock.slice(openTagEnd + 1, -6).trim();

		const decodeAttr = (val: string) =>
			val.replace(/&amp;/g, "&").replace(/&quot;/g, '"');

		const imgSrc = decodeAttr(attrs.match(/imagesrc="([^"]*)"/i)?.[1] || "");
		const imgAlt = decodeAttr(attrs.match(/imagealt="([^"]*)"/i)?.[1] || "");
		const imgCaption = decodeAttr(attrs.match(/imagecaption="([^"]*)"/i)?.[1] || "");
		const imgPosition = (attrs.match(/imageposition="([^"]*)"/i)?.[1] || "right") as "left" | "right";

		blocks.push({
			type: "two-column",
			imageSrc: imgSrc,
			imageAlt: imgAlt,
			imageCaption: imgCaption,
			imagePosition: imgPosition,
			innerHtml,
		});

		remaining = remaining.slice(closeIndex + 6).trim();
	}

	if (remaining.trim()) {
		blocks.push({ type: "html", html: remaining.trim() });
	}

	return blocks;
}

function TwoColumnBlock({ block }: { block: ParsedBlock }) {
	const imageCol = (
		<div className="flex flex-col gap-3 w-full md:w-[42%] flex-shrink-0">
			{block.imageSrc && (
				<figure className="m-0">
					<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
						<Image
							src={block.imageSrc}
							alt={block.imageAlt || ""}
							fill
							className="object-cover"
							unoptimized={block.imageSrc.includes("drive.google.com")}
						/>
					</div>
					{block.imageCaption && (
						<figcaption className="mt-2 text-[12px] text-slate-400 dark:text-slate-500 italic text-center leading-snug px-1">
							{block.imageCaption}
						</figcaption>
					)}
				</figure>
			)}
		</div>
	);

	const textCol = (
		<div
			className="blog-prose flex-1 min-w-0"
			dangerouslySetInnerHTML={{ __html: block.innerHtml || "" }}
		/>
	);

	return (
		<div
			className={`flex flex-col md:flex-row gap-8 md:gap-10 my-10 items-start ${block.imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
				}`}
		>
			{imageCol}
			{textCol}
		</div>
	);
}

function ShareBar({ postUrl, postTitle }: { postUrl: string; postTitle: string }) {
	const [copied, setCopied] = useState(false);

	const handleShare = (platform: "facebook" | "twitter" | "copy") => {
		const encodedUrl = encodeURIComponent(postUrl);
		const encodedTitle = encodeURIComponent(postTitle);
		const urls: Record<string, string> = {
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
			twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
		};
		if (platform === "copy") {
			navigator.clipboard.writeText(postUrl).then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			});
			return;
		}
		window.open(urls[platform], "_blank", "noopener,noreferrer");
	};

	return (
		<div className="flex items-center gap-3 my-10 py-6 border-y border-slate-100 dark:border-slate-800">
			<span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mr-1">
				<Share2 size={13} />
				Share
			</span>
			<button
				onClick={() => handleShare("facebook")}
				className="flex items-center gap-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] dark:text-[#4ea3f8] px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
			>
				<Facebook size={13} />
				Facebook
			</button>
			<button
				onClick={() => handleShare("twitter")}
				className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
			>
				<Twitter size={13} />
				Twitter
			</button>
			<button
				onClick={() => handleShare("copy")}
				className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ml-auto ${copied
					? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
					: "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
					}`}
			>
				{copied ? <Check size={13} /> : <Link2 size={13} />}
				{copied ? "Copied!" : "Copy link"}
			</button>
		</div>
	);
}

export default function BlogCard({ post }: { post: BlogPost }) {
	const blocks = parseContent(post.content);

	const postUrl =
		typeof window !== "undefined"
			? window.location.href
			: `https://www.gulubcc.org/blogs/${post.slug}`;

	const tags = post.tags
		? post.tags
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean)
		: [];

	return (
		<motion.article
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.1 }}
			className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 sm:p-10 md:p-14 mb-10"
		>
			<div className="blog-prose">
				{blocks.map((block, idx) =>
					block.type === "two-column" ? (
						<TwoColumnBlock key={idx} block={block} />
					) : (
						<div
							key={idx}
							dangerouslySetInnerHTML={{ __html: block.html || "" }}
						/>
					)
				)}
			</div>

			{tags.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-10">
					{tags.map((tag) => (
						<span
							key={tag}
							className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
						>
							#{tag}
						</span>
					))}
				</div>
			)}

			<ShareBar postUrl={postUrl} postTitle={post.title} />
		</motion.article>
	);
}