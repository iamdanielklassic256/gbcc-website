"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SermonSection from "@/components/SermonSection";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Filter, Play } from "lucide-react";

export default function SermonsPage() {
	return (
		<main className="min-h-screen">
			<Navbar />

			<section className="relative h-[40vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1200"
						alt="Sermon Archive"
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-slate-950/80" />
				</div>
				<div className="relative z-10 text-center px-6">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-5xl md:text-7xl font-bold text-white mb-4"
					>
						Recent <span className="text-brand-orange">Messages</span>
					</motion.h1>
					<p className="text-white/70 text-lg max-w-2xl mx-auto">
						Watch and listen to our latest sermons on demand.
					</p>
				</div>
			</section>

			{/* Search & Filter Bar */}
			<section className="py-12 px-6 border-b border-slate-100 dark:border-slate-800">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
					<div className="flex-grow relative">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
						<input
							type="text"
							placeholder="Search by title, topic or speaker..."
							className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-brand-orange outline-none transition-all"
						/>
					</div>
					<div className="flex gap-4">
						<button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 transition-all">
							<Filter size={20} />
							Topic
						</button>
						<button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 transition-all">
							<Filter size={20} />
							Speaker
						</button>
					</div>
				</div>
			</section>

			{/* Use the existing SermonSection component for the grid */}
			<SermonSection />

			{/* Additional Sermon Grid (Placeholder for pagination simulation) */}
			<section className="pb-24 px-6">
				<div className="max-w-7xl mx-auto flex justify-center">
					<button className="px-10 py-4 rounded-full border-2 border-brand-blue text-brand-blue font-bold hover:bg-brand-blue hover:text-white transition-all">
						Load More Messages
					</button>
				</div>
			</section>

			<Footer />
		</main>
	);
}
