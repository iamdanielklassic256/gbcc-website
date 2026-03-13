"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Heart, Rocket, Globe, ExternalLink } from "lucide-react";

export default function ProjectsPage() {
	const projects = [
		{
			name: "Hope of Glory Christian School",
			description: "A transformative educational sanctuary where academic excellence meets spiritual formation, empowering children to become future leaders.",
			icon: <GraduationCap size={28} />,
			image: "https://images.unsplash.com/photo-1509062522246-37324d5927ad?q=80&w=800",
			focus: ["Christian Curriculum", "Character Development", "Leadership Training"]
		},
		{
			name: "Gulu Child Development Program",
			description: "A compassionate initiative dedicated to healing and empowering communities, providing support to vulnerable children and families.",
			icon: <Heart size={28} />,
			image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
			focus: ["Trauma-Informed Care", "Community Resilience", "Family Support"]
		},
		{
			name: "Renew Child Development Program",
			description: "An innovative program creating sustainable pathways for child empowerment, focusing on healthcare and education.",
			icon: <Rocket size={28} />,
			image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800",
			website: "https://renewgulu.reachapp.co",
			focus: ["Preventative Healthcare", "Educational Scholarships", "Economic Empowerment"]
		},
		{
			name: "Empowering Ugandans Training",
			description: "A community development initiative bridging economic opportunities, skills training, and spiritual guidance.",
			icon: <Globe size={28} />,
			image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800",
			website: "https://empoweringugandans.org",
			focus: ["Basic Computer Training", "Sewing Training", "Discipleship Class"]
		}
	];

	return (
		<main className="min-h-screen">
			<Navbar />

			<section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200"
						alt="Ministries"
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
						Our <span className="text-brand-orange">Ministries</span>
					</motion.h1>
					<p className="text-white/70 text-lg max-w-2xl mx-auto">
						Holistic sustainable transformation and development through Christ-centered initiatives.
					</p>
				</div>
			</section>

			<section className="py-24 px-6">
				<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
					{projects.map((project, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row h-full group"
						>
							<div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
								<Image
									src={project.image}
									alt={project.name}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-700"
								/>
							</div>
							<div className="md:w-3/5 p-8 md:p-10 flex flex-col">
								<div className="w-14 h-14 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
									{project.icon}
								</div>
								<h2 className="text-2xl md:text-3xl font-bold mb-4">{project.name}</h2>
								<p className="text-foreground/60 text-sm mb-6 leading-relaxed flex-grow">
									{project.description}
								</p>
								<div className="space-y-3 mb-8">
									{project.focus.map((item, i) => (
										<div key={i} className="flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider">
											<div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
											{item}
										</div>
									))}
								</div>
								{project.website && (
									<a
										href={project.website}
										target="_blank"
										className="inline-flex items-center gap-2 text-brand-orange font-bold text-sm hover:gap-3 transition-all"
									>
										Visit Website <ExternalLink size={16} />
									</a>
								)}
							</div>
						</motion.div>
					))}
				</div>
			</section>

			<Footer />
		</main>
	);
}
