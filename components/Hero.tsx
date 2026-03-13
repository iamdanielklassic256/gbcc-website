"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, Play } from "lucide-react";

export default function Hero() {
	return (
		<section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/hero.png"
					alt="Church Interior"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
			</div>

			{/* Content */}
			<div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="max-w-2xl"
				>
					<div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 backdrop-blur-md px-3 py-1 rounded-full mb-6">
						<span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
						<span className="text-white text-xs font-bold uppercase tracking-wider">Join Us this Sunday</span>
					</div>

					<h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
						Experience the <span className="text-brand-orange italic">Grace</span> of God Together
					</h1>

					<p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
						Welcome to Gulu Bible Community Church. A place where faith meets community, and every heart finds a home.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 mb-12">
						<Link href="/events" className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl shadow-brand-orange/20">
							Join Our Service
							<ChevronRight size={20} />
						</Link>
						<Link href="/sermons" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all">
							Watch Online
							<Play size={18} />
						</Link>
					</div>
				</motion.div>

				{/* Quick Info Bar */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="w-full sm:w-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-wrap gap-8 items-center"
				>
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 rounded-full bg-brand-blue/30 flex items-center justify-center">
							<Calendar className="text-white" size={24} />
						</div>
						<div>
							<p className="text-white/60 text-xs font-medium uppercase tracking-widest">Next Service</p>
							<p className="text-white font-bold text-lg">Sunday: 9:00 AM & 11:30 AM</p>
						</div>
					</div>
					<div className="h-10 w-px bg-white/20 hidden sm:block" />
					<div className="flex items-center gap-4">
						<div>
							<p className="text-white/60 text-xs font-medium uppercase tracking-widest">Location</p>
							<p className="text-white font-bold text-lg">Gulu City, Uganda</p>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Decorative element */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
		</section>
	);
}
