"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Heart, BookOpen, MapPin } from "lucide-react";

export default function AboutPage() {
	return (
		<main className="min-h-screen">
			<Navbar />

			{/* Sub-page Hero */}
			<section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src="/hero.png"
						alt="About GBCC"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-slate-950/70" />
				</div>
				<div className="relative z-10 text-center px-6">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-5xl md:text-7xl font-bold text-white mb-4"
					>
						Our <span className="text-brand-orange">Story</span>
					</motion.h1>
					<p className="text-white/70 text-lg max-w-2xl mx-auto">
						Rooted in Gulu, growing in faith, and reaching the world with the unchanging Gospel of Jesus Christ.
					</p>
				</div>
			</section>

			{/* History Section */}
			<section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
				>
					<span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block">Our Roots</span>
					<h2 className="text-4xl md:text-5xl font-bold mb-8">Founded with a <span className="text-brand-blue">Vision</span></h2>
					<p className="text-foreground/70 text-lg mb-6 leading-relaxed">
						Founded in December 2006 through a partnership between Ggaba Community Church in Kampala and Rock Harbor Church in California, we are an indigenous, non-denominational evangelical church serving Gulu City.
					</p>
					<p className="text-foreground/70 text-lg mb-8 leading-relaxed">
						To equip the communities with Christ-centered knowledge and skills for holistic sustainable transformation and development.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
						<div className="p-6 rounded-2xl bg-orange-50 border border-orange-100">
							<h3 className="font-bold text-orange-600 mb-2">Our Mission</h3>
							<p className="text-sm text-foreground/70 leading-relaxed">To equip the communities with Christ-centered knowledge and skills for holistic sustainable transformation.</p>
						</div>
						<div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
							<h3 className="font-bold text-blue-600 mb-2">Our Vision</h3>
							<p className="text-sm text-foreground/70 leading-relaxed">A changed community, freed from all kinds of oppression for holistic Godly progressive transformation with dignity.</p>
						</div>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					className="relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl"
				>
					<Image
						src="/community.png"
						alt="Our Church Family"
						fill
						className="object-cover"
					/>
				</motion.div>
			</section>

			{/* Leadership Spotlight */}
			<section className="py-24 px-6 bg-slate-950 text-white overflow-hidden relative">
				<div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
					<div className="lg:w-1/2">
						<span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block">Our Leadership</span>
						<h2 className="text-4xl md:text-5xl font-bold mb-8">Pastor Martin & Hope Onen</h2>
						<p className="text-white/60 text-lg leading-relaxed mb-8 italic">
							"From the ground up — building God's kingdom across Northern Uganda"
						</p>
						<p className="text-white/60 text-lg leading-relaxed mb-8">
							Pastor Martin and Hope Onen have been the cornerstone of our mission in Northern Uganda. Beginning with a single vision, they laid the foundation of the ministry and have since led a movement that has planted over 50 churches across the region.
						</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{[
								"Planted over 50 churches",
								"Established ministry structures",
								"Mentored regional leaders",
								"Fostered spiritual growth"
							].map((item, i) => (
								<div key={i} className="flex items-center gap-2">
									<div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
									<span className="text-sm font-medium">{item}</span>
								</div>
							))}
						</div>
					</div>
					<div className="lg:w-1/2 relative">
						<div className="w-full aspect-[4/5] bg-gradient-to-br from-brand-orange to-brand-blue rounded-[40px] p-1">
							<div className="w-full h-full bg-slate-900 rounded-[38px] overflow-hidden relative">
								{/* Placeholder image for pastor if no real image available, otherwise use pastorimg */}
								<div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-4xl">
									LEADERSHIP
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
						<p className="text-foreground/60 max-w-xl mx-auto">The spiritual pillars that guide our walk with Christ and service to the community.</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{ title: "Living a Life of Faith", desc: "Committed to growing and expressing our faith in daily life through scripture study, worship, and spiritual disciplines." },
							{ title: "Prayer", desc: "Dedicated to consistent and powerful prayer as our spiritual foundation and source of divine guidance." },
							{ title: "Integrity", desc: "Living with honesty, transparency, and moral uprightness in all our relationships and endeavors." },
							{ title: "Love & Compassion", desc: "Showing God's love through genuine care, support, and active service to others in our community." },
							{ title: "Servanthood Leadership", desc: "Leading by example through humble service, community empowerment, and developing others." }
						].map((value, idx) => (
							<div key={idx} className="bg-white dark:bg-slate-800 p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-all group border border-slate-100 dark:border-slate-700">
								<h3 className="text-xl font-bold mb-4 text-brand-blue group-hover:text-brand-orange transition-colors">{value.title}</h3>
								<p className="text-foreground/60 leading-relaxed">{value.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
