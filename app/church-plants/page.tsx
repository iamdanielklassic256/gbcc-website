"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, User, Calendar, Users } from "lucide-react";

export default function ChurchPlantsPage() {
	const plants = [
		{
			name: "City Bible Community Church",
			location: "Gulu City",
			pastor: "Pastor George Lawoko",
			contact: "+256 774 123 456",
			established: 2015,
			members: 350,
			description: "A vibrant church committed to community transformation and spiritual growth in Gulu City.",
			image: "https://images.unsplash.com/photo-1544427928-1428f0976532?q=80&w=800"
		},
		{
			name: "Adjumani Bible Community Church",
			location: "Adjumani Town",
			pastor: "Pastor Patrick Watmon",
			contact: "+256 782 987 654",
			established: 2018,
			members: 220,
			description: "Dedicated to healing and reconciliation, serving the Adjumani community through biblical teaching.",
			image: "https://images.unsplash.com/photo-1444005233317-7fb24f0da789?q=80&w=800"
		},
		{
			name: "Anaka Bible Community Church",
			location: "Anaka Town",
			pastor: "Pastor Solomon",
			contact: "+256 752 345 678",
			established: 2016,
			members: 275,
			description: "Empowering community through Christ-centered education and social programs in Anaka Town.",
			image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800"
		}
	];

	return (
		<main className="min-h-screen">
			<Navbar />

			<section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src="https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=1200"
						alt="Church Plants"
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
						Church <span className="text-brand-orange">Plants</span>
					</motion.h1>
					<p className="text-white/70 text-lg max-w-2xl mx-auto">
						Expanding God's kingdom across Northern Uganda through over 50 regional church plants.
					</p>
				</div>
			</section>

			<section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
						{plants.map((plant, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1 }}
								className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700 group hover:shadow-2xl transition-all duration-500"
							>
								<div className="relative h-60 w-full overflow-hidden">
									<Image
										src={plant.image}
										alt={plant.name}
										fill
										className="object-cover group-hover:scale-110 transition-transform duration-700"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
									<div className="absolute bottom-6 left-6">
										<p className="text-white/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
											<MapPin size={14} className="text-brand-orange" /> {plant.location}
										</p>
									</div>
								</div>
								<div className="p-8">
									<h3 className="text-2xl font-bold mb-4 group-hover:text-brand-orange transition-colors">{plant.name}</h3>
									<p className="text-foreground/60 text-sm mb-8 leading-relaxed">
										{plant.description}
									</p>
									<div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-700">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3 text-sm font-medium text-foreground/70">
												<User size={16} className="text-brand-blue" />
												{plant.pastor}
											</div>
											<div className="flex items-center gap-2 text-xs font-bold text-brand-orange bg-brand-orange/5 px-3 py-1 rounded-full">
												<Calendar size={12} /> EST. {plant.established}
											</div>
										</div>
										<div className="flex items-center gap-3 text-sm font-medium text-foreground/70">
											<Users size={16} className="text-brand-blue" />
											{plant.members} Active Members
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<div className="mt-20 p-12 bg-brand-blue rounded-[3rem] text-center text-white relative overflow-hidden">
						<div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Our Goal: 100 Church Plants</h2>
						<p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
							We are on a journey to plant 100 gospel-centered churches in Northern Uganda and beyond. Join us in this mission.
						</p>
						<button className="bg-brand-orange hover:bg-brand-orange/90 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-brand-orange/20 transition-all hover:scale-105">
							Partner with Us
						</button>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
