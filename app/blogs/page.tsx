"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User, BookOpen, Sparkles, Search, Loader2, AlertCircle } from "lucide-react";
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

export default function BlogsPage() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeCategory, setActiveCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
				const res = await fetch(`${apiUrl}/blogs`);
				if (!res.ok) throw new Error("Failed to fetch blogs");
				const data = await res.json();
				const publishedData = data.filter((p: BlogPost) => p.status === "published");
				setPosts(publishedData);
			} catch (err) {
				console.error(err);
				setError("Failed to load blog posts.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchBlogs();
	}, []);

	// Extract unique categories from fetched posts
	const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];

	const filteredPosts = posts.filter((post) => {
		const matchesCategory = activeCategory === "All" || post.category === activeCategory;
		const matchesSearch =
			searchQuery === "" ||
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const featuredPost = posts.find((p) => p.isFeatured);
	const regularPosts = filteredPosts.filter((p) => !p.isFeatured || activeCategory !== "All" || searchQuery !== "");

	const formatDate = (dateStr: string) => {
		try {
			const d = new Date(dateStr);
			if (isNaN(d.getTime())) return dateStr;
			return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
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

	const fadeUp = {
		hidden: { opacity: 0, y: 24 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
		},
	};

	const stagger = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
	};

	return (
		<main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
			<Navbar />

			{/* ─── Hero ─── */}
			<section className="relative min-h-[48vh] w-full flex items-center justify-center overflow-hidden bg-slate-950">
				<div className="absolute inset-0 z-0">
					<Image
						src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200"
						alt="Blog backdrop"
						fill
						className="object-cover opacity-25"
						priority
					/>
				</div>
				<div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
					<div className="absolute top-[-15%] right-[10%] w-[50%] h-[50%] bg-brand-blue/20 rounded-full blur-[160px]" />
					<div className="absolute bottom-[-15%] left-[5%] w-[45%] h-[45%] bg-brand-orange/20 rounded-full blur-[130px]" />
				</div>

				<div className="relative z-10 text-center px-6 py-32 md:py-40 max-w-4xl mx-auto">
					<motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-5">
						<motion.div
							variants={fadeUp}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold text-sm shadow-lg"
						>
							<BookOpen size={15} className="text-brand-orange" />
							<span>Stories, Insights &amp; Inspiration</span>
						</motion.div>

						<motion.h1
							variants={fadeUp}
							className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[0.95]"
						>
							Our{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-brand-orange">
								Blog
							</span>
						</motion.h1>

						<motion.p
							variants={fadeUp}
							className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto font-medium"
						>
							Devotionals, testimonies, outreach stories, and updates from the heart of GBCC.
						</motion.p>
					</motion.div>
				</div>

				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-[#020617] to-transparent pointer-events-none z-10" />
			</section>

			{/* ─── Loading ─── */}
			{isLoading && (
				<section className="px-4 sm:px-6 py-28">
					<div className="max-w-6xl mx-auto">
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center">
							<div className="relative">
								<div className="absolute inset-0 rounded-full bg-brand-orange/20 animate-ping" />
								<Loader2 className="h-12 w-12 text-brand-orange animate-spin relative z-10" />
							</div>
							<p className="text-lg text-foreground/50 font-semibold mt-6">Loading articles...</p>
						</motion.div>
					</div>
				</section>
			)}

			{/* ─── Error ─── */}
			{!isLoading && error && (
				<section className="px-4 sm:px-6 py-20">
					<div className="max-w-6xl mx-auto">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 rounded-3xl p-10 text-center flex flex-col items-center shadow-xl"
						>
							<div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-5">
								<AlertCircle className="h-8 w-8 text-red-500" />
							</div>
							<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h3>
							<p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
							<button
								onClick={() => window.location.reload()}
								className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
							>
								Retry
							</button>
						</motion.div>
					</div>
				</section>
			)}

			{/* ─── Content ─── */}
			{!isLoading && !error && (
				<>
					{/* Featured Post */}
					{activeCategory === "All" && featuredPost && searchQuery === "" && (
						<section className="relative z-10 -mt-16 px-4 sm:px-6 mb-12">
							<div className="max-w-6xl mx-auto">
								<Link href={`/blogs/${featuredPost.slug}`}>
									<motion.article
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6 }}
										className="group relative bg-white dark:bg-slate-900 rounded-[28px] overflow-hidden shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-slate-800 hover:shadow-2xl hover:border-brand-orange/20 transition-all duration-500"
									>
										<div className="grid grid-cols-1 lg:grid-cols-2">
											<div className="relative h-[280px] sm:h-[340px] lg:h-[440px] overflow-hidden">
												{featuredPost.coverImage ? (
													<Image
														src={featuredPost.coverImage}
														alt={featuredPost.title}
														fill
														className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
													/>
												) : (
													<div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
														<BookOpen className="h-16 w-16 text-slate-300 dark:text-slate-600 opacity-40" />
													</div>
												)}
												<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/5" />
												<div className="absolute top-5 left-5">
													<span className="bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
														<Sparkles size={12} />
														Featured
													</span>
												</div>
											</div>

											<div className="flex flex-col justify-center p-7 sm:p-8 lg:p-12">
												{featuredPost.category && (
													<span className={`self-start text-[11px] font-bold px-3 py-1 rounded-full mb-4 ${categoryColors[featuredPost.category] || "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}>
														{featuredPost.category}
													</span>
												)}

												<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-brand-orange transition-colors duration-300">
													{featuredPost.title}
												</h2>

												<p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-6 line-clamp-3">
													{featuredPost.excerpt}
												</p>

												<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400 dark:text-slate-500 mb-6">
													<span className="flex items-center gap-1.5">
														<User size={14} />
														{featuredPost.author}
													</span>
													<span className="text-slate-200 dark:text-slate-700">•</span>
													<span className="flex items-center gap-1.5">
														<Calendar size={14} />
														{formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
													</span>
													<span className="text-slate-200 dark:text-slate-700">•</span>
													<span className="flex items-center gap-1.5">
														<Clock size={14} />
														{estimateReadTime(featuredPost.content)}
													</span>
												</div>

												<span className="self-start flex items-center gap-2.5 bg-brand-orange hover:bg-brand-orange/90 text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-brand-orange/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] group/btn">
													Read Article
													<ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
												</span>
											</div>
										</div>
									</motion.article>
								</Link>
							</div>
						</section>
					)}

					{/* Filters & Search */}
					<section className="px-4 sm:px-6 mb-10">
						<div className="max-w-6xl mx-auto">
							<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
								<div className="flex flex-wrap gap-2">
									{categories.map((cat) => (
										<button
											key={cat}
											onClick={() => setActiveCategory(cat)}
											className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300
												${activeCategory === cat
													? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
													: "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-brand-orange/30 hover:text-brand-orange"
												}`}
										>
											{cat}
										</button>
									))}
								</div>

								<div className="relative w-full sm:w-auto">
									<Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
									<input
										type="text"
										placeholder="Search articles..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all placeholder:text-slate-400"
									/>
								</div>
							</div>
						</div>
					</section>

					{/* Blog Grid */}
					<section className="px-4 sm:px-6 pb-28">
						<div className="max-w-6xl mx-auto">
							{/* Empty State */}
							{posts.length === 0 && (
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-16 text-center flex flex-col items-center shadow-lg"
								>
									<div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
										<BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600" />
									</div>
									<h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">No Articles Yet</h3>
									<p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
										We haven&apos;t published any blog posts yet. Check back soon for updates!
									</p>
								</motion.div>
							)}

							{/* Filtered Empty */}
							{posts.length > 0 && filteredPosts.length === 0 && (
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-16 text-center flex flex-col items-center shadow-lg"
								>
									<div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
										<Search className="h-10 w-10 text-slate-300 dark:text-slate-600" />
									</div>
									<h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">No Articles Found</h3>
									<p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
										No blog posts match your current filters. Try adjusting your search or category.
									</p>
								</motion.div>
							)}

							{/* Cards Grid */}
							{filteredPosts.length > 0 && (
								<motion.div
									initial="hidden"
									animate="visible"
									variants={stagger}
									className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
								>
									{(activeCategory === "All" && searchQuery === "" ? regularPosts : filteredPosts).map((post) => (
										<motion.article key={post.id} variants={fadeUp}>
											<Link
												href={`/blogs/${post.slug}`}
												className="group flex flex-col bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-brand-orange/5 hover:border-brand-orange/20 transition-all duration-500 hover:-translate-y-1 h-full"
											>
												{/* Image */}
												<div className="relative h-[200px] sm:h-[220px] overflow-hidden">
													{post.coverImage ? (
														<Image
															src={post.coverImage}
															alt={post.title}
															fill
															className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
														/>
													) : (
														<div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
															<BookOpen className="h-12 w-12 text-slate-300 dark:text-slate-600 opacity-40" />
														</div>
													)}
													<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
													{post.category && (
														<div className="absolute top-4 left-4">
															<span className={`text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md ${categoryColors[post.category] || "bg-slate-100/90 text-slate-600 dark:bg-slate-800/90 dark:text-slate-400"}`}>
																{post.category}
															</span>
														</div>
													)}
												</div>

												{/* Content */}
												<div className="flex flex-col flex-1 p-5 sm:p-6">
													{/* Meta */}
													<div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 font-medium mb-3">
														<span className="flex items-center gap-1">
															<Calendar size={12} />
															{formatDate(post.createdAt)}
														</span>
														<span className="text-slate-200 dark:text-slate-700">•</span>
														<span className="flex items-center gap-1">
															<Clock size={12} />
															{estimateReadTime(post.content)}
														</span>
													</div>

													{/* Title */}
													<h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-brand-orange transition-colors duration-300 line-clamp-2">
														{post.title}
													</h3>

													{/* Excerpt */}
													<p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2 flex-1">
														{post.excerpt}
													</p>

													{/* Footer */}
													<div className="pt-5 border-t border-slate-100 dark:border-slate-800 ">
											
											<div className="flex flex-row items-center justify-center gap-2 text-white font-bold bg-orange-600 p-1 rounded-lg">
												Read
												<ArrowRight size={14} />
											</div>
										</div>
												</div>
											</Link>
										</motion.article>
									))}
								</motion.div>
							)}
						</div>
					</section>
				</>
			)}

			<Footer />
		</main>
	);
}
