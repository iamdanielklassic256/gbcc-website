"use client";

import Image from "next/image";
import { Play, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

interface SermonProps {
	title: string;
	speaker: string;
	date: string;
	image: string;
	category: string;
}

export default function SermonSection() {
	const sermons: SermonProps[] = [
		{
			title: "The Power of Faith",
			speaker: "Pastor John Smith",
			date: "January 21, 2024",
			image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600&auto=format&fit=crop",
			category: "Faith",
		},
		{
			title: "Living with Purpose",
			speaker: "Pastor Emily Rodriguez",
			date: "January 14, 2024",
			image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop",
			category: "Life Mission",
		},
		{
			title: "Overcoming Challenges",
			speaker: "Pastor Michael Lee",
			date: "January 7, 2024",
			image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=600&auto=format&fit=crop",
			category: "Hope",
		},
	];

	return (
		<section id="sermons" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
					<div className="max-w-xl">
						<span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Recent Messages</span>
						<h2 className="text-4xl md:text-5xl font-bold leading-tight">Feed Your Soul with the <span className="text-brand-blue">Truth</span></h2>
					</div>
					<button className="text-brand-orange font-bold flex items-center gap-2 hover:gap-4 transition-all pb-2 border-b-2 border-brand-orange/20 hover:border-brand-orange">
						View All Sermons <Calendar size={18} />
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{sermons.map((sermon, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group"
						>
							<div className="relative h-64 w-full overflow-hidden">
								<Image
									src={sermon.image}
									alt={sermon.title}
									fill
									className="object-cover group-hover:scale-110 transition-transform duration-700"
								/>
								<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
								<div className="absolute top-4 left-4">
									<span className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
										{sermon.category}
									</span>
								</div>
								<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
									<div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40 transform scale-0 group-hover:scale-100 transition-transform duration-500">
										<Play fill="white" size={24} />
									</div>
								</div>
							</div>
							<div className="p-8">
								<div className="flex items-center gap-4 text-xs text-foreground/40 font-medium mb-4">
									<div className="flex items-center gap-1">
										<Calendar size={14} /> {sermon.date}
									</div>
									<div className="flex items-center gap-1">
										<User size={14} /> {sermon.speaker}
									</div>
								</div>
								<h3 className="text-xl font-bold mb-4 group-hover:text-brand-orange transition-colors duration-300 leading-snug">
									{sermon.title}
								</h3>
								<div className="flex gap-4">
									<button className="text-sm font-bold text-brand-blue hover:text-brand-orange transition-colors">Listen</button>
									<button className="text-sm font-bold text-brand-blue hover:text-brand-orange transition-colors">Notes</button>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
