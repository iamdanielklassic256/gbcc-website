"use client";

import Image from 'next/image';
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, User, Loader2 } from "lucide-react";
import { fadeUp, stagger } from '@/utils/animation';

interface Sermon {
	url: string;
	pastor_name: string;
	title: string;
}

const SermonSection = () => {
	const [sermons, setSermons] = useState<Sermon[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSermons = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
				const res = await fetch(`${apiUrl}/sermons`);
				if (!res.ok) throw new Error("Failed to fetch sermons");
				const data: Sermon[] = await res.json();
				// only take the 3 most recent
				setSermons(data.slice(0, 3));
			} catch (err) {
				console.error("Failed to load home sermons", err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchSermons();
	}, []);

	const getYoutubeThumbnail = (url: string) => {
		if (!url) return "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop";
		const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
		const match = url.match(regex);
		if (match && match[1]) {
			return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
		}
		return "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop";
	};

	const getYoutubeWatchUrl = (url: string) => {
		if (!url) return "#";
		const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
		const match = url.match(regex);
		if (match && match[1]) {
			return `https://www.youtube.com/watch?v=${match[1]}`;
		}
		return url;
	};

	return (
		<section className="py-20 sm:py-28 px-4 sm:px-6">
			<div className="max-w-6xl mx-auto">
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
							Recent Messages
						</motion.span>
						<motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
							Feed Your Soul with the <span className="text-brand-blue">Truth</span>
						</motion.h2>
					</div>
					<motion.div variants={fadeUp}>
						<Link
							href="/sermons"
							className="text-brand-orange font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm border-b-2 border-brand-orange/20 hover:border-brand-orange pb-1"
						>
							More Sermons <ArrowRight size={16} />
						</Link>
					</motion.div>
				</motion.div>

				{isLoading ? (
					<div className="flex flex-col items-center justify-center py-20">
						<Loader2 className="h-10 w-10 text-brand-orange animate-spin mb-4" />
						<p className="text-slate-500 font-medium">Loading recent sermons...</p>
					</div>
				) : sermons.length > 0 ? (
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={stagger}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
					>
						{sermons.map((sermon, idx) => (
							<Link key={idx} href={getYoutubeWatchUrl(sermon.url)} target="_blank" rel="noopener noreferrer">
								<motion.div
									variants={fadeUp}
									className="group bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-orange/20 transition-all duration-500 hover:-translate-y-1 block h-full flex flex-col"
								>
									<div className="relative h-[220px] overflow-hidden flex-shrink-0">
										<Image src={getYoutubeThumbnail(sermon.url)} alt={sermon.title} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
										<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
										
										<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
											<div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
												<Play fill="white" size={22} className="ml-1" />
											</div>
										</div>
									</div>
									<div className="p-6 flex flex-col flex-1">
										<div className="flex items-center gap-2 text-xs text-brand-orange font-bold uppercase tracking-wider mb-3">
											<User size={14} />
											<span className="truncate">{sermon.pastor_name || "Guest Speaker"}</span>
										</div>
										<h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
											{sermon.title}
										</h3>
									</div>
								</motion.div>
							</Link>
						))}
					</motion.div>
				) : (
					<div className="text-center py-10 bg-slate-100 dark:bg-slate-800/50 rounded-3xl mx-auto max-w-2xl">
						<Play size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
						<h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">No messages available</h3>
						<p className="text-slate-500 text-sm">Check back later for new sermon uploads.</p>
					</div>
				)}
			</div>
		</section>
	)
}

export default SermonSection;