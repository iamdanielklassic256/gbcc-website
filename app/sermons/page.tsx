"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Play, User, Loader2, AlertCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

interface Sermon {
	url: string;
	pastor_name: string;
	title: string;
}

export default function SermonsPage() {
	const [sermons, setSermons] = useState<Sermon[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);

	useEffect(() => {
		const fetchSermons = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
				const res = await fetch(`${apiUrl}/sermons`);
				if (!res.ok) throw new Error("Failed to fetch sermons");
				const data = await res.json();
				setSermons(data);
			} catch (err) {
				console.error(err);
				setError("Failed to load sermons.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchSermons();
	}, []);

	const getYoutubeThumbnail = (url: string) => {
		if (!url) return "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600&auto=format&fit=crop";
		const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
		const match = url.match(regex);
		if (match && match[1]) {
			return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
		}
		// Fallback image if not a youtube link or regex fails
		return "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600&auto=format&fit=crop";
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

	const filteredSermons = sermons.filter(s => 
		s.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
		s.pastor_name?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const fadeUp = {
		hidden: { opacity: 0, y: 24 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
		},
	};

	const handlePlay = (url: string) => {
		if (!url) return;
		const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
		const match = url.match(regex);
		if (match && match[1]) {
			// standard embed player without extra parameters to avoid Error 153 config issue
			setPlayingVideoUrl(`https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1`);
		} else {
			setPlayingVideoUrl(url); // Fallback for raw urls
		}
	};

	return (
		<main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
			<Navbar />

			<section className="relative h-[45vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1200"
						alt="Sermons backdrop"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-slate-950/80" />
				</div>
				<div className="relative z-10 text-center px-6">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
					>
						Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Messages</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-medium"
					>
						Watch and listen to our latest sermons on demand. Be encouraged, equipped, and transformed by the Word of God.
					</motion.p>
				</div>
			</section>

			{/* Search & Filter Bar */}
			<section className="py-10 px-4 sm:px-6 relative -mt-8 z-20">
				<div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4">
					<div className="flex-grow relative">
						<Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
						<input
							type="text"
							placeholder="Search by title or pastor..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-orange outline-none transition-all text-slate-900 dark:text-white"
						/>
					</div>
					<div className="flex gap-4">
						<button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
							<Filter size={20} />
							Topic
						</button>
					</div>
				</div>
			</section>

			{/* Sermons List */}
			<section className="py-12 px-4 sm:px-6 mb-20">
				<div className="max-w-7xl mx-auto">
					{isLoading && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex flex-col items-center justify-center py-28"
						>
							<div className="relative">
								<div className="absolute inset-0 rounded-full bg-brand-orange/20 animate-ping" />
								<Loader2 className="h-12 w-12 text-brand-orange animate-spin relative z-10" />
							</div>
							<p className="text-lg text-slate-500 font-semibold mt-6">
								Loading messages...
							</p>
						</motion.div>
					)}

					{!isLoading && error && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 rounded-3xl p-10 text-center flex flex-col items-center shadow-xl max-w-2xl mx-auto"
						>
							<div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-5">
								<AlertCircle className="h-8 w-8 text-red-500" />
							</div>
							<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
								Unable to load messages
							</h3>
							<p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
							<button
								onClick={() => window.location.reload()}
								className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/20"
							>
								Retry
							</button>
						</motion.div>
					)}

					{!isLoading && !error && filteredSermons.length === 0 && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-16 text-center shadow-xl max-w-2xl mx-auto"
						>
							<div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
								<Play className="h-10 w-10 text-slate-300 dark:text-slate-600 ml-1" />
							</div>
							<h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
								No Messages Found
							</h3>
							<p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
								{searchQuery ? "We couldn't find any sermons matching your search." : "There are currently no sermons available to display."}
							</p>
						</motion.div>
					)}

					{/* Sermon Grid */}
					{!isLoading && !error && filteredSermons.length > 0 && (
						<motion.div
							initial="hidden"
							animate="visible"
							variants={{
								hidden: { opacity: 0 },
								visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
							}}
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
						>
							{filteredSermons.map((sermon, idx) => (
								<motion.div
									key={idx}
									variants={fadeUp}
									className="bg-white dark:bg-slate-900 rounded-[28px] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 border border-slate-100 dark:border-slate-800 transition-all duration-500 group flex flex-col cursor-pointer"
									onClick={() => handlePlay(sermon.url)}
								>
									{/* Thumbnail */}
									<div className="block relative h-60 sm:h-64 w-full overflow-hidden flex-shrink-0">
										<Image
											src={getYoutubeThumbnail(sermon.url)}
											alt={sermon.title}
											fill
											className="object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
										/>
										<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
										
										{/* Play Button Overlay */}
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="w-16 h-16 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white border border-white/40 transform scale-90 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
												<Play fill="white" size={24} className="ml-1" />
											</div>
										</div>
									</div>
									
									{/* Content */}
									<div className="p-6 sm:p-8 flex flex-col flex-grow">
										<div className="flex items-center gap-4 text-xs font-bold text-brand-orange uppercase tracking-wider mb-4">
											<div className="flex items-center gap-1.5">
												<User size={15} /> 
												<span className="truncate">{sermon.pastor_name || "Guest Speaker"}</span>
											</div>
										</div>
										<h3 className="text-xl sm:text-2xl font-extrabold mb-5 text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors duration-300 leading-tight">
											{sermon.title}
										</h3>
										
										<div className="pt-5 mt-auto border-t border-slate-100 dark:border-slate-800 flex gap-4">
											<a 
												href={getYoutubeWatchUrl(sermon.url)}
												onClick={(e) => {
													e.stopPropagation(); // prevent modal from opening if they explicitly want to go to youtube
												}}
												target="_blank" 
												rel="noopener noreferrer"
												className="text-sm font-bold text-white bg-slate-800 hover:bg-black hover:dark:bg-slate-700 px-6 py-2.5 rounded-xl shadow-md transition-all w-full text-center"
											>
												Watch on YouTube
											</a>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					)}
				</div>
			</section>

			{/* Video Modal Overlay */}
			<AnimatePresence>
				{playingVideoUrl && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6"
						onClick={() => setPlayingVideoUrl(null)}
					>
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							transition={{ delay: 0.1, duration: 0.3 }}
							className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black ring-1 ring-white/10"
							onClick={(e) => e.stopPropagation()}
						>
							<button
								onClick={() => setPlayingVideoUrl(null)}
								className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-brand-orange flex items-center justify-center text-white transition-colors"
							>
								<X size={20} />
							</button>
							<iframe
								src={playingVideoUrl}
								title="Sermon Video Player"
								className="w-full h-full border-none"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<Footer />
		</main>
	);
}
