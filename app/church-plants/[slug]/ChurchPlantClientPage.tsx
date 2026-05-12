"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, Calendar } from "lucide-react";
import type { ChurchPlant } from "@/app/church-plants/page";

export default function ChurchPlantClientPage({
	plant,
}: {
	plant: ChurchPlant | null;
}) {
	if (!plant) {
		return (
			<main className="min-h-screen">
				<Navbar />
				<div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-6">
					<h1 className="text-4xl font-bold">Church Plant Not Found</h1>
					<p className="text-foreground/60 max-w-md">
						This church plant does not exist or is no longer active.
					</p>
					<Link
						href="/church-plants"
						className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-orange/90 transition-all"
					>
						<ArrowLeft size={16} /> Back to Church Plants
					</Link>
				</div>
				<Footer />
			</main>
		);
	}

	const formattedDate = new Date(plant.createdAt).toLocaleDateString("en-UG", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<main className="min-h-screen">
			<Navbar />

			{/* Hero */}
			<section className="relative h-[55vh] min-h-105 w-full flex items-end overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src={plant.image || "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=1600"}
						alt={plant.name}
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
				</div>
				<div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-14">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						
						<Link
							href="/church-plants"
							className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
						>
							<ArrowLeft size={14} /> All Church Plants
						</Link>
						<h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
							{plant.name}
						</h1>
						<div className="flex flex-wrap items-center gap-5 text-sm text-white/70">
							<span className="flex items-center gap-1.5">
								<MapPin size={14} className="text-brand-orange" />
								{plant.location}
							</span>
							
						</div>
					</motion.div>
				</div>
			</section>

			{/* Content */}
			<section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
				<div className="max-w-5xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
						{/* Main description */}
						<motion.div
							className="lg:col-span-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
						>
							<h2 className="text-2xl font-bold mb-6 text-foreground">About This Church</h2>
							{plant.description ? (
								<div
									className="prose prose-sm max-w-none text-foreground
										prose-headings:font-semibold prose-headings:text-foreground
										prose-a:text-primary prose-a:underline
										prose-strong:text-foreground
										prose-ul:list-disc prose-ol:list-decimal"
									dangerouslySetInnerHTML={{ __html: plant.description }}
								/>
							) : (
								<p className="text-sm text-muted-foreground italic">No description provided.</p>
							)}
						</motion.div>

						{/* CTA */}
						<motion.aside
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="flex justify-center space-y-6"
						>
							<div className="flex flex-col items-center justify-center bg-brand-blue w-200 rounded-3xl p-8 text-white">
								<h3 className="text-lg font-bold mb-3">Partner With Us</h3>
								<p className="text-white/70 text-sm mb-5 leading-relaxed">
									Support this church plant and help expand the kingdom across Northern Uganda.
								</p>
								<Link
									href="/contact"
									className="w-80 block text-center bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 text-sm"
								>
									Get In Touch
								</Link>
							</div>
						</motion.aside>
					</div>

					{/* Back link */}
					<div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-700">
						<Link
							href="/church-plants"
							className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:underline"
						>
							<ArrowLeft size={16} /> Back to All Church Plants
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
