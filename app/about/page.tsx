"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import overseer from '@/assets/images/overseer.jpg'
import people from '@/assets/images/1739714909261.jpg'
import heroimg from '@/assets/images/about/ignite5.jpg'

export default function AboutPage() {
	return (
		<main className="min-h-screen">
			<Navbar />

			{/* Sub-page Hero */}
			<section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src={heroimg}
						alt="About GBCC"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-slate-950/70" />
				</div>
				<div className="relative z-10 text-center px-4 sm:px-6">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4"
					>
						Our <span className="text-brand-orange">Story</span>
					</motion.h1>
					<p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4">
						Rooted in Gulu, growing in faith, and reaching the world with the unchanging Gospel of Jesus Christ.
					</p>
				</div>
			</section>

			{/* History Section */}
			<section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
				>
					<span className="text-brand-orange font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 block">Our Roots</span>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">Founded with a <span className="text-brand-blue">Vision</span></h2>
					<p className="text-foreground/70 text-lg mb-6 leading-relaxed">
						Founded in December 2006 through a partnership between Ggaba Community Church in Kampala and Rock Harbor Church in California, we are an indigenous, non-denominational evangelical church serving Gulu City.
					</p>
					<p className="text-foreground/70 text-lg mb-8 leading-relaxed">
						To equip the communities with Christ-centered knowledge and skills for holistic sustainable transformation and development.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
						<div className="p-6 rounded-2xl bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20">
							<h3 className="font-bold text-orange-600 dark:text-orange-400 mb-2">Our Mission</h3>
							<p className="text-sm text-foreground/70 leading-relaxed italic">&quot;To equip the communities with Christ-centered knowledge and skills for holistic sustainable transformation.&quot;</p>
						</div>
						<div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
							<h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Our Vision</h3>
							<p className="text-sm text-foreground/70 leading-relaxed italic">&quot;A changed community, freed from all kinds of oppression for holistic Godly progressive transformation with dignity.&quot;</p>
						</div>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl order-first lg:order-last"
				>
					<Image
						src={people}
						alt="Our Church Family"
						fill
						className="object-cover"
					/>
				</motion.div>
			</section>

			{/* ─── Leadership Legacy Spotlight ─── */}
			<section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#020617] text-white overflow-hidden">
				{/* Background Glows */}
				<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
				<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

				<div className="max-w-7xl mx-auto relative z-10">
					<div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
						
						{/* Image Showcase */}
						<motion.div 
							initial={{ opacity: 0, x: -40 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="w-full lg:w-5/12 relative group"
						>
							{/* Floating Decorative Elements */}
							<div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-brand-orange rounded-tl-[40px] z-10" />
							<div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-brand-blue rounded-br-[40px] z-10" />
							
							<div className="relative aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl shadow-brand-orange/10 border border-white/10 group-hover:border-brand-orange/30 transition-all duration-700">
								<Image
									src={overseer}
									alt="Pastor Martin & Hope Onen"
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
								
								<div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 p-4 sm:p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
									<p className="text-brand-orange font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1">Founding Visionaries</p>
									<p className="text-white text-base sm:text-lg font-bold">Pastor Martin & Hope Onen</p>
								</div>
							</div>

							{/* Stats Badge */}
							<div className="absolute -right-8 top-1/4 backdrop-blur-2xl bg-brand-orange text-white p-5 rounded-[32px] shadow-2xl hidden md:block border border-white/20 animate-bounce-slow">
								<div className="text-3xl font-black mb-0.5">50+</div>
								<div className="text-[10px] font-bold uppercase tracking-wider opacity-90">Churches Planted</div>
							</div>
						</motion.div>

						{/* Text Content */}
						<div className="w-full lg:w-7/12">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.2 }}
							>
								<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-orange text-xs font-black uppercase tracking-[0.2em] mb-8">
									<span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
									Leadership Legacy
								</span>
								
								<h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 sm:mb-8 leading-[0.95] tracking-tight">
									The Heart Behind <br className="hidden sm:block" />
									<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-white to-white">The Mission.</span>
								</h2>

								<div className="space-y-6 text-white/60 text-base sm:text-lg leading-relaxed mb-10 sm:mb-12">
									<p className="italic text-white/90 font-medium text-lg sm:text-xl border-l-4 border-brand-orange pl-5 sm:pl-6 py-2 bg-white/5 rounded-r-2xl">
										&quot;From the ground up — building God&apos;s kingdom across Northern Uganda one life at a time.&quot;
									</p>
									<p>
										Pastor Martin and Hope Onen have been the cornerstone of our mission in Northern Uganda. Beginning with a single vision, they laid the foundation of the ministry and have since led a movement that has transformed thousands of lives.
									</p>
									<p>
										Their apostolic calling has seen them mentor an entire generation of regional leaders, fostering spiritual growth that extends far beyond the walls of GBCC Gulu.
									</p>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
									{[
										{ label: "Established Structure", icon: "🏛️" },
										{ label: "Regional Mentorship", icon: "🌱" },
										{ label: "Community Empowerment", icon: "🤝" },
										{ label: "Spiritual Breakthroughs", icon: "🔥" }
									].map((item, i) => (
										<div key={i} className="flex items-center gap-4 p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
											<span className="text-xl sm:text-2xl">{item.icon}</span>
											<span className="text-xs sm:text-sm font-bold text-white/80">{item.label}</span>
										</div>
									))}
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12 sm:mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values</h2>
						<p className="text-foreground/60 text-sm sm:text-base max-w-xl mx-auto">The spiritual pillars that guide our walk with Christ and service to the community.</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{ title: "Living a Life of Faith", desc: "Committed to growing and expressing our faith in daily life through scripture study, worship, and spiritual disciplines." },
							{ title: "Prayer", desc: "Dedicated to consistent and powerful prayer as our spiritual foundation and source of divine guidance." },
							{ title: "Integrity", desc: "Living with honesty, transparency, and moral uprightness in all our relationships and endeavors." },
							{ title: "Love & Compassion", desc: "Showing God's love through genuine care, support, and active service to others in our community." },
							{ title: "Servanthood Leadership", desc: "Leading by example through humble service, community empowerment, and developing others." }
						].map((value, idx) => (
							<div key={idx} className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-[24px] sm:rounded-[32px] shadow-sm hover:shadow-xl transition-all group border border-slate-100 dark:border-slate-700">
								<h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-brand-blue group-hover:text-brand-orange transition-colors">{value.title}</h3>
								<p className="text-foreground/60 text-sm sm:text-base leading-relaxed">{value.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
