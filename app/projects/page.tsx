"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Heart, Rocket, Globe, ExternalLink } from "lucide-react";
import empower from '@/assets/projects/empowering.jpeg'
import students from '@/assets/projects/empower.jpg'

export default function ProjectsPage() {
	const projects = [
	{
		name: "Hope of Glory Christian School",
		description: "A Christ-centered school offering Nursery and Primary education, dedicated to nurturing young minds through academic excellence, strong moral values, and spiritual growth.",
		focus: ["Nursery & Primary Education", "Christian Values", "Holistic Child Development"]
	},
	{
		name: "Gulu Child Development Program",
		description: "A child sponsorship program committed to supporting vulnerable children through education from nursery to university, while strengthening families and communities.",
		focus: ["Child Sponsorship", "Education Support", "Community & Family Empowerment"]
	},
	{
		name: "Renew Child Development Program",
		description: "A holistic child sponsorship initiative empowering children from nursery to university through education, healthcare, and long-term community development.",
		website: "https://www.renewgulu.org/",
		focus: ["Education Sponsorship", "Healthcare Support", "Sustainable Community Development"]
	},
	{
		name: "Empowering Ugandans Training",
		description: "A life-changing initiative equipping individuals with practical skills and spiritual guidance through programs in computer training, tailoring, and discipleship.",
		website: "https://empoweringugandans.org",
		focus: ["Computer Skills Training", "Sewing & Tailoring", "Discipleship & Life Skills"]
	}
];

	return (
		<main className="min-h-screen">
			<Navbar />

			<section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src={students}
						alt="Projects"
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
						Our <span className="text-brand-orange">Projects</span>
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
							<div className=" p-8 md:p-10 flex flex-col">
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
