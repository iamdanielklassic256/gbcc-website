"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Church } from "lucide-react";
import { useEffect, useState } from "react";

export interface ChurchPlant {
	id: string;
	name: string;
	location: string;
	slug: string;
	createdAt: string;
	image?: string;
	description: string;
	isActive: boolean;
}

const FALLBACK_IMAGE =
	"https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=1200";

/** Turns rich-text/HTML descriptions into a clean plain-text preview for the card */
const toPreview = (html?: string) =>
	(html ?? "")
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/\s+/g, " ")
		.trim();

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

			{/* ---------- Hero ---------- */}
			<section className="relative h-[50vh] min-h-100 w-full flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src={FALLBACK_IMAGE}
						alt="Church Plants"
						fill
						priority
						sizes="100vw"
						className="object-cover scale-105"
					/>
					<div className="absolute inset-0 bg-slate-950/80" />
					{/* soft orange glow to give the hero some depth */}
					<div className="absolute -bottom-32 left-1/2 h-72 w-2xl -translate-x-1/2 rounded-full bg-brand-orange/20 blur-[120px]" />
				</div>

				<div className="relative z-10 text-center px-6">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-5"
					>
						Church <span className="text-brand-orange">Plants</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.15 }}
						className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
					>
						Expanding God&apos;s kingdom across Northern Uganda through over 50 regional church plants.
					</motion.p>

					{!loading && plants.length > 0 && (
						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md"
						>
							<span className="h-2 w-2 rounded-full bg-brand-orange" />
							{plants.length} active {plants.length === 1 ? "church plant" : "church plants"}
						</motion.div>
					)}
				</div>
			</section>

			{/* ---------- Listing ---------- */}
			<section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
				<div className="max-w-7xl mx-auto">

					{loading ? (
						/* skeleton cards that mirror the real layout */
						<div
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
							aria-busy="true"
						>
							{Array.from({ length: 6 }).map((_, i) => (
								<div
									key={i}
									className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
								>
									<div className="h-60 w-full animate-pulse bg-slate-200 dark:bg-slate-700" />
									<div className="space-y-4 p-8">
										<div className="h-1 w-10 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
										<div className="h-6 w-2/3 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
										<div className="h-4 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
										<div className="h-4 w-4/5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
									</div>
								</div>
							))}
						</div>
					) : plants.length === 0 ? (
						<div className="flex flex-col items-center text-center py-24">
							<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-orange/10">
								<Church className="h-9 w-9 text-brand-orange" />
							</div>
							<p className="text-xl font-semibold">No active church plants found.</p>
							<p className="mt-2 max-w-md text-foreground/50">
								New church plants will appear here as soon as they are added. Please check back soon.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
							{plants.map((plant, idx) => {
								const preview = toPreview(plant.description);
								return (
									<motion.div
										key={plant.id}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: Math.min(idx * 0.1, 0.5) }}
										className="h-full"
									>
										<article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800">
											{/* image + location pill */}
											<div className="relative h-60 w-full overflow-hidden">
												<Image
													src={plant.image || FALLBACK_IMAGE}
													alt={plant.name}
													fill
													sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
													className="object-cover transition-transform duration-700 group-hover:scale-110"
												/>
												<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
												<div className="absolute bottom-5 left-5 right-5">
													<p className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-black/30 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
														<MapPin size={14} className="shrink-0 text-brand-orange" />
														<span className="truncate">{plant.location}</span>
													</p>
												</div>
											</div>

											{/* content */}
											<div className="flex flex-1 flex-col gap-4 p-8">
												<div className="h-1 w-10 rounded-full bg-brand-orange transition-all duration-500 group-hover:w-20" />
												<h3 className="text-xl text-center font-bold leading-snug transition-colors group-hover:text-brand-orange">
													{plant.name}
												</h3>
												
											</div>
										</article>
									</motion.div>
								);
							})}
						</div>
					)}

					{/* ---------- Goal banner ---------- */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="relative mt-24 overflow-hidden rounded-[2.5rem] bg-brand-blue px-8 py-14 text-center text-white md:px-16 md:py-20"
					>
						<div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
						<div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-orange/20 blur-[100px] translate-x-1/3 translate-y-1/3" />

						<div className="relative z-10">
							<h2 className="mx-auto max-w-3xl text-3xl md:text-5xl font-bold leading-tight tracking-tight text-balance">
								Our Goal: 10,000 Churches &amp; 10,000 Leaders
							</h2>
							<div className="mx-auto mt-6 h-1.5 w-24 rounded-full bg-brand-orange" />
							<p className="mx-auto mt-8 mb-10 max-w-2xl text-lg leading-relaxed text-white/70">
								We are on a journey to plant 1000 gospel-centered churches and equip 1000 leaders in Northern Uganda and beyond. Join us in this mission.
							</p>
							<Link
								href="/contact"
								className="inline-block rounded-full bg-brand-orange px-10 py-4 font-bold text-white shadow-xl shadow-brand-orange/20 transition-all hover:scale-105 hover:bg-brand-orange/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
							>
								Partner with Us
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

			<Footer />
		</main>
	);
}