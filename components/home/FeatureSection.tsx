"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/utils/animation";
import { Tv, Users, HeartHandshake, BookOpen } from "lucide-react";
import Link from "next/link";

const features = [
	{
		title: "Watch Online",
		description: "Join us live every Sunday or catch up on recent messages.",
		icon: Tv,
		link: "/sermons",
		color: "from-blue-500 to-sky-400",
		bg: "bg-blue-50 dark:bg-blue-500/10",
		iconText: "text-blue-500"
	},
	{
		title: "Join a Group",
		description: "Find community and grow together in small group fellowships.",
		icon: Users,
		link: "/about",
		color: "from-brand-orange to-amber-400",
		bg: "bg-orange-50 dark:bg-brand-orange/10",
		iconText: "text-brand-orange"
	},
	{
		title: "Give Online",
		description: "Partner with us in reaching Gulu with the Gospel.",
		icon: HeartHandshake,
		link: "/give",
		color: "from-emerald-500 to-teal-400",
		bg: "bg-emerald-50 dark:bg-emerald-500/10",
		iconText: "text-emerald-500"
	},
	{
		title: "Daily Devotions",
		description: "Start your day with prayer and scripture to set the tone.",
		icon: BookOpen,
		link: "/events",
		color: "from-purple-500 to-fuchsia-400",
		bg: "bg-purple-50 dark:bg-purple-500/10",
		iconText: "text-purple-500"
	}
];

export default function FeatureSection() {
	return (
		<section className="py-16 sm:py-24 px-4 sm:px-6 bg-white dark:bg-[#020617] relative z-20 -mt-10 sm:-mt-20">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={stagger}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
				>
					{features.map((feature, idx) => (
						<Link key={idx} href={feature.link} className="block group">
							<motion.div
								variants={fadeUp}
								className="bg-white dark:bg-slate-900 rounded-[28px] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-all duration-500 h-full relative overflow-hidden"
							>
								{/* Hover Gradient Background */}
								<div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${feature.color} transition-opacity duration-500`} />
								
								<div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center ${feature.iconText} mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
									<feature.icon size={26} strokeWidth={2.5} />
								</div>
								
								<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors">
									{feature.title}
								</h3>
								
								<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
									{feature.description}
								</p>

								{/* Bottom Accent Line */}
								<div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-brand-orange to-amber-400 group-hover:w-full transition-all duration-500 ease-out" />
							</motion.div>
						</Link>
					))}
				</motion.div>
			</div>
		</section>
	);
}
