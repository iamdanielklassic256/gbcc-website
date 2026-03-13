"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

export default function EventsPage() {
	const events = [
		{
			title: "Gulu Youth Conference 2024",
			date: "Nov 12-14, 2024",
			time: "9:00 AM - 5:00 PM",
			location: "Main Sanctuary",
			image: "https://images.unsplash.com/photo-1523580494863-6f3031224594?q=80&w=800",
			category: "Conference"
		},
		{
			title: "Christmas Carols Service",
			date: "Dec 22, 2024",
			time: "6:00 PM - 8:30 PM",
			location: "Community Hall",
			image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=800",
			category: "Worship"
		},
		{
			title: "New Year's Eve Prayer Night",
			date: "Dec 31, 2024",
			time: "9:00 PM - 12:30 AM",
			location: "Main Sanctuary",
			image: "https://images.unsplash.com/photo-1467307983825-619715426c70?q=80&w=800",
			category: "Prayer"
		}
	];

	return (
		<main className="min-h-screen">
			<Navbar />

			<section className="relative h-[40vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200"
						alt="Events"
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
						Upcoming <span className="text-brand-orange">Events</span>
					</motion.h1>
					<p className="text-white/70 text-lg max-w-2xl mx-auto">
						There is always something happening at GBCC. Join us!
					</p>
				</div>
			</section>

			<section className="py-24 px-6">
				<div className="max-w-5xl mx-auto space-y-8">
					{events.map((event, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 hover:border-brand-orange/30 transition-all p-4 group"
						>
							<div className="relative w-full md:w-80 h-64 flex-shrink-0 overflow-hidden rounded-2xl">
								<Image
									src={event.image}
									alt={event.title}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-500"
								/>
								<div className="absolute top-4 left-4">
									<span className="bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
										{event.category}
									</span>
								</div>
							</div>
							<div className="flex flex-col justify-center py-4 pr-6">
								<div className="flex items-center gap-4 text-brand-orange font-bold text-sm mb-4">
									<Calendar size={18} />
									{event.date}
								</div>
								<h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-brand-orange transition-colors">{event.title}</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-foreground/60">
									<div className="flex items-center gap-2">
										<Clock size={16} />
										{event.time}
									</div>
									<div className="flex items-center gap-2">
										<MapPin size={16} />
										{event.location}
									</div>
								</div>
								<button className="flex items-center gap-2 text-brand-blue font-bold group/btn">
									Get Details <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
								</button>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			<Footer />
		</main>
	);
}
