"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Calendar, User } from "lucide-react";
import { fadeUp, stagger } from "@/utils/animation";

interface Blog {
	id: string;
	title: string;
	slug: string;
	content?: string;
	excerpt: string;
	coverImage: string;
	category: string;
	author: string;
	status: string;
	publishedAt: string;
}

export default function BlogSection() {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
				const res = await fetch(`${apiUrl}/blogs`);
				if (!res.ok) throw new Error("Failed to fetch blogs");
				const data: Blog[] = await res.json();
				const publishedBlogs = data.filter((b) => b.status === "published");
				setBlogs(publishedBlogs.slice(0, 4)); // Only grab a max of 4 as requested
			} catch (err) {
				console.error("Home blogs fetch failed:", err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchBlogs();
	}, []);

	const formatDate = (dateString: string) => {
		if (!dateString) return "";
		return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString));
	};

	return (
		<section className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={stagger}
					className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14"
				>
					<div>
						<motion.span
							variants={fadeUp}
							className="text-brand-orange font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
						>
							Church Journal
						</motion.span>
						<motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
							Latest From Our <span className="text-brand-blue">Blogs</span>
						</motion.h2>
					</div>
					<motion.div variants={fadeUp}>
						<Link
							href="/blogs"
							className="text-brand-orange font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm border-b-2 border-brand-orange/20 hover:border-brand-orange pb-1"
						>
							Read All Articles <ArrowRight size={16} />
						</Link>
					</motion.div>
				</motion.div>

				{!isLoading && blogs.length > 0 ? (
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
						}}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
					>
						{blogs.map((blog, idx) => (
							<motion.div
								key={blog.id || idx}
								variants={fadeUp}
								className="group bg-white dark:bg-slate-900 rounded-[28px] overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full cursor-pointer"
							>
								<Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full group/card">
									{/* Image Container */}
									<div className="relative h-56 w-full overflow-hidden flex-shrink-0">
										<Image
											src={blog.coverImage || "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600"}
											alt={blog.title}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
										
										{/* Category Badge */}
										<div className="absolute top-4 left-4">
											<span className="bg-white/95 text-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
												{blog.category || "Ministry"}
											</span>
										</div>
									</div>

									{/* Content */}
									<div className="p-6 flex flex-col flex-1">
										
										<h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-brand-orange transition-colors line-clamp-2">
											{blog.title}
										</h3>
										
										{/* Allow HTML in excerpt in case backend passes it with tags */}
										<div 
											className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1 prose prose-sm dark:prose-invert prose-p:my-0 prose-headings:my-0 prose-ul:my-0"
											dangerouslySetInnerHTML={{ __html: blog.excerpt || blog.content?.substring(0, 150) + "..." || "Dive deeply into our insights as we explore faith, community, and service at GBCC." }}
										/>
										
										<div className="pt-5 border-t border-slate-100 dark:border-slate-800 ">
											
											<div className="flex flex-row items-center justify-center gap-2 text-white font-bold bg-orange-600 p-1 rounded-lg">
												Read
												<ArrowRight size={14} />
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						))}
					</motion.div>
				) : !isLoading && blogs.length === 0 ? (
					<div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[28px] border border-slate-100 dark:border-slate-800 shadow-xl max-w-2xl mx-auto">
						<BookOpen size={48} className="mx-auto text-slate-200 dark:text-slate-700 mb-4" />
						<h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No Articles Yet</h3>
						<p className="text-slate-500 text-sm">Check back shortly for new stories and journals.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="bg-slate-200 dark:bg-slate-800 h-[400px] rounded-[28px]" />
						))}
					</div>
				)}
			</div>
		</section>
	);
}
