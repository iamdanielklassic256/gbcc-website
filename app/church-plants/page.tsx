"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export interface ChurchPlant {
	id: string;
	name: string;
	slug: string;
	location: string;
	image?: string;
	description: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export default function ChurchPlantsPage() {
	const [plants, setPlants] = useState<ChurchPlant[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPlants = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
				const res = await fetch(`${apiUrl}/church_branches`, { cache: "no-store" });
				if (!res.ok) {
					console.error("Failed to fetch church plants:", res.statusText);
					return;
				}
				const data: ChurchPlant[] = await res.json();
				setPlants(data.filter((b) => b.isActive));
			} catch (error) {
				console.error("Failed to fetch church plants:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPlants();
	}, []);

	return (
		<main className="min-h-screen">
			<Navbar />

			<section className="relative h-[50vh] min-h-100 w-full flex items-center justify-center overflow-hidden">
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
						Expanding God&apos;s kingdom across Northern Uganda through over 50 regional church plants.
					</p>
				</div>
			</section>

			<section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
				<div className="max-w-7xl mx-auto">
					{loading ? (
						<div className="flex items-center justify-center py-24">
							<div className="w-12 h-12 rounded-full border-4 border-brand-orange border-t-transparent animate-spin" />
						</div>
					) : plants.length === 0 ? (
						<div className="text-center py-24 text-foreground/50">
							<p className="text-xl font-medium">No active church plants found.</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
							{plants.map((plant, idx) => (
								<motion.div
									key={plant.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: Math.min(idx * 0.1, 0.5) }}
									className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700 group hover:shadow-2xl transition-all duration-500"
								>
									<div className="relative h-60 w-full overflow-hidden">
										<Image
											src={plant.image || "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=1200"}
											alt={plant.name}
											fill
											className="object-cover group-hover:scale-110 transition-transform duration-700"
										/>
										<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
										<div className="absolute bottom-6 left-6">
											<p className="text-white/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
												<MapPin size={14} className="text-brand-orange" /> {plant.location}
											</p>
										</div>
									</div>
									<div className="p-8 flex flex-col">
										<h3 className="text-2xl font-bold mb-4 group-hover:text-brand-orange transition-colors">{plant.name}</h3>
										<p 
										className="text-foreground/60 text-sm leading-relaxed line-clamp-3 mb-4"
										dangerouslySetInnerHTML={{ __html: plant.description }}/>
											
									
										<Link
											href={`/church-plants/${plant.slug}`}
											className="mt-auto inline-flex items-center gap-1 text-brand-orange font-semibold text-sm hover:underline"
										>
											Read More →
										</Link>
									</div>
								</motion.div>
							))}
						</div>
					)}

					<div className="mt-20 p-12 bg-brand-blue rounded-[3rem] text-center text-white relative overflow-hidden">
						<div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
						<h2 className="text-3xl md:text-4xl font-bold mb-6 italic underline uppercase tracking-tighter decoration-brand-orange underline-offset-8">
							Our Goal: 1000 Churches &amp; 1000 Leaders
						</h2>
						<p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
							We are on a journey to plant 1000 gospel-centered churches and equip 1000 leaders in Northern Uganda and beyond. Join us in this mission.
						</p>
						<Link
							href="/contact"
							className="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-brand-orange/20 transition-all hover:scale-105"
						>
							Partner with Us
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
