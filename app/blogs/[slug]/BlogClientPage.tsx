"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	Calendar,
	Clock,
	ArrowLeft,
	User,
	Share2,
	Facebook,
	Twitter,
	BookOpen,
	Eye,
	Tag,
	MessageSquare,
	Send,
	AlertCircle,
	Link2,
	Check,
} from "lucide-react";
import { useState, useEffect } from "react";

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

const categoryColors: Record<string, string> = {
	Devotional: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
	Outreach: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
	Youth: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
	Testimony: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
	Family: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
	Worship: "bg-brand-orange/10 text-brand-orange",
	Training: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

export default function BlogClientPage({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
	const formatDate = (dateStr: string) => {
		try {
			const d = new Date(dateStr);
			if (isNaN(d.getTime())) return dateStr;
			return d.toLocaleDateString("en-US", {
				weekday: "long",
				month: "long",
				day: "numeric",
				year: "numeric",
			});
		} catch {
			return dateStr;
		}
	};

	const estimateReadTime = (content: string) => {
		const text = content.replace(/<[^>]*>/g, "");
		const words = text.split(/\s+/).length;
		const minutes = Math.max(1, Math.ceil(words / 200));
		return `${minutes} min read`;
	};

	const tags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

	const postUrl = typeof window !== "undefined"
		? window.location.href
		: `https://www.gulubcc.org/blogs/${post.slug}`;

	const [copied, setCopied] = useState(false);

	const handleShare = (platform: "facebook" | "twitter" | "whatsapp" | "copy") => {
		const encodedUrl = encodeURIComponent(postUrl);
		const encodedTitle = encodeURIComponent(post.title);
		const urls: Record<string, string> = {
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
			twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
			whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
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

	// --- Comment Section Logic ---
	interface Comment {
		id: string;
		message: string;
		createdAt: string;
	}

	const [comments, setComments] = useState<Comment[]>([]);
	const [newComment, setNewComment] = useState("");
	const [isPosting, setIsPosting] = useState(false);
	const [isLoadingComments, setIsLoadingComments] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";

	const fetchComments = async () => {
		try {
			setIsLoadingComments(true);
			const res = await fetch(`${apiUrl}/comments?blogId=${post.id}`);
			if (!res.ok) throw new Error("Failed to load comments");
			const json = await res.json();
			// JSON format based on backend is { data: CommentEntity[], meta: ... }
			setComments(json.data || []);
		} catch (err) {
			console.error("Comment fetch failed:", err);
		} finally {
			setIsLoadingComments(false);
		}
	};

	useEffect(() => {
		fetchComments();
	}, [post.id]);

	const handlePostComment = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newComment.trim()) return;

		setIsPosting(true);
		setError(null);

		try {
			const res = await fetch(`${apiUrl}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"accept": "application/json"
				},
				body: JSON.stringify({
					blogId: post.id,
					message: newComment
				})
			});

			if (!res.ok) throw new Error("Failed to post comment");

			// Refresh comments after successful post
			await fetchComments();
			setNewComment("");
		} catch (err: any) {
			setError(err.message || "Something went wrong. Please try again.");
		} finally {
			setIsPosting(false);
		}
	};

	return (
		<main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
			<Navbar />

			{/* ─── Hero Image ─── */}
			<section className="relative w-full h-[45vh] sm:h-[50vh] md:h-[55vh] min-h-[380px] overflow-hidden bg-slate-950">
				{post.coverImage ? (
					<Image
						src={post.coverImage}
						alt={post.title}
						fill
						className="object-cover opacity-40"
						priority
					/>
				) : (
					<div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

				{/* Back Button */}
				<div className="absolute top-24 left-4 sm:left-8 z-20">
					<Link
						href="/blogs"
						className="flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 border border-white/10"
					>
						<ArrowLeft size={16} />
						All Articles
					</Link>
				</div>

				{/* Title Overlay */}
				<div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-8 pb-10 md:pb-14">
					<div className="max-w-3xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="space-y-4"
						>
							{post.category && (
								<span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${categoryColors[post.category] || "bg-slate-100/90 text-slate-600 dark:bg-slate-800/90 dark:text-slate-400"}`}>
									{post.category}
								</span>
							)}

							<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
								{post.title}
							</h1>

							<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
								<span className="flex items-center gap-1.5">
									<User size={14} />
									{post.author}
								</span>
								<span className="text-white/20">•</span>
								<span className="flex items-center gap-1.5">
									<Calendar size={14} />
									{formatDate(post.publishedAt || post.createdAt)}
								</span>
								<span className="text-white/20">•</span>
								<span className="flex items-center gap-1.5">
									<Clock size={14} />
									{estimateReadTime(post.content)}
								</span>
								{post.viewCount > 0 && (
									<>
										<span className="text-white/20">•</span>
										<span className="flex items-center gap-1.5">
											<Eye size={14} />
											{post.viewCount} views
										</span>
									</>
								)}
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* ─── Article Body ─── */}
			<section className="relative z-10 px-4 sm:px-6">
				<div className="max-w-3xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-xl -mt-10 sm:-mt-14 p-6 sm:p-8 md:p-12 lg:p-16 mb-12"
					>
						{/* Post Cover Image inside Content */}
						{post.coverImage && (
							<div className="relative w-full md:w-1/2 lg:w-[380px] h-[240px] sm:h-[300px] mb-8 md:mb-6 md:ml-8 md:float-right rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
								<Image
									src={post.coverImage}
									alt={post.title}
									fill
									className="object-cover"
								/>
							</div>
						)}

						{/* Rendered HTML Content */}
						<article
							className="prose prose-slate dark:prose-invert max-w-none
								prose-headings:font-extrabold prose-headings:tracking-tight
								prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-10 prose-h2:mb-4
								prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-8 prose-h3:mb-3
								prose-p:text-[16px] prose-p:sm:text-[17px] prose-p:leading-[1.85] prose-p:mb-6 prose-p:text-slate-600 prose-p:dark:text-slate-400
								prose-blockquote:border-l-4 prose-blockquote:border-brand-orange prose-blockquote:bg-brand-orange/5 prose-blockquote:rounded-r-2xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-slate-700 prose-blockquote:dark:text-slate-300
								prose-strong:text-slate-800 prose-strong:dark:text-slate-200
								prose-a:text-brand-orange prose-a:no-underline prose-a:hover:underline
								prose-img:rounded-2xl prose-img:shadow-lg
								prose-ul:text-slate-600 prose-ul:dark:text-slate-400
								prose-ol:text-slate-600 prose-ol:dark:text-slate-400
								prose-li:text-[16px] prose-li:sm:text-[17px] prose-li:leading-[1.85]"
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>

						{/* Tags */}
						{tags.length > 0 && (
							<div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
								<Tag size={14} className="text-slate-400" />
								{tags.map((tag) => (
									<span
										key={tag}
										className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
									>
										{tag}
									</span>
								))}
							</div>
						)}

						{/* Share Bar */}
						<div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
							<div className="flex items-center gap-2 text-sm font-semibold text-slate-400 dark:text-slate-500">
								<Share2 size={16} />
								Share this article
							</div>
							<div className="flex items-center gap-2">
								<button
									onClick={() => handleShare("facebook")}
									title="Share on Facebook"
									className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-all duration-300"
								>
									<Facebook size={18} />
								</button>
								<button
									onClick={() => handleShare("twitter")}
									title="Share on X (Twitter)"
									className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-sky-900/30 text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 flex items-center justify-center transition-all duration-300"
								>
									<Twitter size={18} />
								</button>
								<button
									onClick={() => handleShare("whatsapp")}
									title="Share on WhatsApp"
									className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-green-100 dark:hover:bg-green-900/30 text-slate-500 hover:text-green-600 dark:hover:text-green-400 flex items-center justify-center transition-all duration-300"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
								</button>
								<button
									onClick={() => handleShare("copy")}
									title="Copy link"
									className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-all duration-300"
								>
									{copied ? <Check size={18} className="text-green-500" /> : <Link2 size={18} />}
								</button>
							</div>
						</div>
					</motion.div>

					{/* ─── CommentSection ─── */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 sm:p-8 md:p-12 mb-12"
					>
						<div className="flex items-center gap-3 mb-8">
							<div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
								<MessageSquare size={20} />
							</div>
							<h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
								Thoughts & Reflections <span className="text-slate-400 font-medium ml-2 text-sm">({comments.length})</span>
							</h3>
						</div>

						{/* Comment Form */}
						<form onSubmit={handlePostComment} className="mb-12">
							<div className="relative group">
								<textarea
									value={newComment}
									onChange={(e) => setNewComment(e.target.value)}
									placeholder="Write your thought here..."
									className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${error ? 'border-red-500/50' : 'border-slate-200 dark:border-slate-700'} rounded-2xl p-4 sm:p-6 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none focus:ring-2 ${error ? 'focus:ring-red-500/20' : 'focus:ring-brand-orange/40'} focus:border-brand-orange transition-all resize-none min-h-[120px]`}
									required
								/>
								<div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
									{error && (
										<span className="text-[10px] sm:text-xs font-bold text-red-500 flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-1 rounded shadow-sm">
											<AlertCircle size={10} /> {error}
										</span>
									)}
									<button
										type="submit"
										disabled={isPosting || !newComment.trim()}
										className="bg-brand-orange hover:bg-brand-orange/90 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-orange/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 group/btn"
									>
										{isPosting ? "Posting..." : "Post Reflection"}
										<Send size={15} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
									</button>
								</div>
							</div>
						</form>

						{/* Comments List */}
						<div className="space-y-6">
							{isLoadingComments ? (
								<div className="flex flex-col items-center justify-center py-10 opacity-30">
									<motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
										<MessageSquare size={30} />
									</motion.div>
									<p className="text-xs font-bold mt-3 uppercase tracking-widest">Gathering thoughts...</p>
								</div>
							) : comments.length > 0 ? (
								comments.map((comment, idx) => (
									<motion.div
										key={comment.id || idx}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										className="p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 rounded-2xl relative overflow-hidden group/comment"
									>
										<div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue group-hover/comment:bg-brand-orange transition-colors duration-500" />
										<p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
											{comment.message}
										</p>
										<div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
											<span>Faithful Reader</span>
											<span>•</span>
											<span>{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Just now'}</span>
										</div>
									</motion.div>
								))
							) : (
								<div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
									<p className="text-slate-400 font-medium italic">Be the first to share a thought.</p>
								</div>
							)}
						</div>
					</motion.div>

					{/* Author Card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-lg p-6 sm:p-8 mb-16 flex items-center gap-5"
					>
						<div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
							<User size={28} className="text-brand-orange" />
						</div>
						<div>
							<p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
								Written by
							</p>
							<p className="text-lg font-bold text-slate-900 dark:text-white">
								{post.author}
							</p>
							<p className="text-sm text-slate-500 dark:text-slate-400">
								Gulu Bible Community Church
							</p>
						</div>
					</motion.div>
				</div>
			</section>

			{/* ─── Related Posts ─── */}
			{relatedPosts.length > 0 && (
				<section className="px-4 sm:px-6 pb-28">
					<div className="max-w-6xl mx-auto">
						<h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-8">
							More Articles
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{relatedPosts.map((related) => (
								<Link key={related.id} href={`/blogs/${related.slug}`}>
									<article className="group flex flex-col bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-orange/20 transition-all duration-500 hover:-translate-y-1 h-full">
										<div className="relative h-[180px] overflow-hidden">
											{related.coverImage ? (
												<Image
													src={related.coverImage}
													alt={related.title}
													fill
													className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
												/>
											) : (
												<div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
													<BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600 opacity-40" />
												</div>
											)}
											<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
											{related.category && (
												<div className="absolute top-3 left-3">
													<span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${categoryColors[related.category] || "bg-slate-100/90 text-slate-600"}`}>
														{related.category}
													</span>
												</div>
											)}
										</div>
										<div className="flex flex-col flex-1 p-5">
											<span className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-2 flex items-center gap-1">
												<Calendar size={11} />
												{formatDate(related.publishedAt || related.createdAt)}
											</span>
											<h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-brand-orange transition-colors duration-300 line-clamp-2">
												{related.title}
											</h3>
										</div>
									</article>
								</Link>
							))}
						</div>
					</div>
				</section>
			)}

			<Footer />
		</main>
	);
}
