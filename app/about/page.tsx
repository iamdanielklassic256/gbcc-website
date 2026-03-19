"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	MapPin,
	Users,
	Heart,
	Sparkles,
	Church,
	ArrowRight,
	Plus,
	Minus,
} from "lucide-react";
import { useEffect, useState } from "react";
import overseer from '@/assets/images/overseer.jpg'
import people from '@/assets/images/1739714909261.jpg'
import heroimg from '@/assets/images/about/ignite5.jpg'

const milestones = [
	{ year: "2006", title: "The Foundation", desc: "GBCC was founded through a partnership between Ggaba Community Church and Rock Harbor Church." },
	{ year: "2010", title: "Building Roots", desc: "First permanent facility established in Gulu to serve the growing local congregation." },
	{ year: "2015", title: "Regional Expansion", desc: "Successfully planted over 20 churches across Northern Uganda villages." },
	{ year: "2020", title: "Community Impact", desc: "Launched holistic skill-training programs and scholarship initiatives for youth." },
	{ year: "Today", title: "A Living Legacy", desc: "Over 50 churches planted and thousands of lives transformed by the Gospel." },
];

const ministries = [
	{ title: "Spark Youth", desc: "Empowering the next generation to live boldly for Christ.", icon: <Sparkles size={24} />, color: "bg-purple-500" },
	{ title: "Women of Faith", desc: "Building strong, Godly women through fellowship and prayer.", icon: <Heart size={24} />, color: "bg-rose-500" },
	{ title: "Men of Honor", desc: "Equipping men to lead their families and communities.", icon: <Users size={18} />, color: "bg-blue-600" },
	{ title: "Sunday School", desc: "Nurturing children with the Word of God in a fun environment.", icon: <Church size={24} />, color: "bg-amber-500" },
	{ title: "Outreach & Evangelism", desc: "Reaching the unreached across Northern Uganda.", icon: <MapPin size={24} />, color: "bg-emerald-500" },
];

interface ChurchMinistry {
	id: string;
	name: string;
	description?: string;
	image_url: string;
}

const faqs = [
	{ q: "What should I expect on my first visit?", a: "You can expect a warm welcome, passionate worship, and a message rooted in Biblical truth. Our services usually last about 2 hours." },
	{ q: "Is there a dress code?", a: "Not at all. Whether you prefer a suit or casual wear, you belong here. We care more about you than what you wear." },
	{ q: "What about my children?", a: "We have a dedicated children's ministry (Sunday School) where your kids can learn about God safely while you enjoy the main service." },
	{ q: "Where can I park?", a: "We have designated parking areas within the church premises with security personnel to guide you." },
];

export default function AboutPage() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);
	const [apiMinistries, setApiMinistries] = useState<ChurchMinistry[]>([]);
	const [isLoadingMinistries, setIsLoadingMinistries] = useState(true);

	const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";

	useEffect(() => {
		const fetchMinistries = async () => {
			try {
				setIsLoadingMinistries(true);
				const res = await fetch(`${apiUrl}/church_ministries`);
				if (!res.ok) throw new Error("Failed to fetch");
				const data = await res.json();
				// Backend might return an array or { data: [] }
				setApiMinistries(Array.isArray(data) ? data : data.data || []);
			} catch (err) {
				console.error("Ministries fetch failed:", err);
			} finally {
				setIsLoadingMinistries(false);
			}
		};

		fetchMinistries();
	}, [apiUrl]);

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
						className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
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
					<span className="text-brand-orange font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 block underline decoration-brand-orange/30 underline-offset-8 transition-all">Our Roots</span>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">Founded with a <span className="text-brand-blue">Vision</span></h2>
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
								
								<h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-[0.95] tracking-tight">
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

			{/* ─── Timeline Section ─── */}
			<section className="py-24 px-4 sm:px-6 bg-white dark:bg-slate-950 overflow-hidden">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-16 sm:mb-20">
						<span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-4 block underline decoration-brand-orange/30 underline-offset-8">Our Journey</span>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">A History of <span className="text-brand-blue">Grace</span></h2>
						<p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base">Tracing our footsteps from the first spark of vision to the 50+ churches planted today.</p>
					</div>

					<div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 sm:ml-0 sm:mx-auto">
						{milestones.map((milestone, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1 }}
								className="mb-14 last:mb-0 pl-8 relative"
							>
								<div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-brand-orange border-4 border-white dark:border-slate-950 shadow-lg" />
								<div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
									<span className="text-3xl font-black text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-xl">{milestone.year}</span>
									<h3 className="text-xl font-bold text-slate-900 dark:text-white">{milestone.title}</h3>
								</div>
								<p className="mt-3 text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">{milestone.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ─── Departments & Ministries ─── */}
			<section className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/40 relative">
				{/* Decorative circles */}
				<div className="absolute top-1/4 -right-20 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
				<div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

				<div className="max-w-7xl mx-auto relative z-10">
					<div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
						<div className="max-w-2xl">
							<span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-4 block">Communities within GBCC</span>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight">Explore Our <span className="text-brand-orange">Ministries</span></h2>
							<p className="text-slate-500 text-base sm:text-lg">We believe church is a family. Find your place and grow with people who share your journey of faith.</p>
						</div>
						<div className="hidden lg:block">
							<Link href="/church-ministries" className="p-6 pr-10 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-6 group hover:border-brand-blue hover:shadow-brand-blue/10 transition-all duration-300 active:scale-95">
								<div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
									<Heart size={32} />
								</div>
								<div className="text-left">
									<p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Our Communities</p>
									<p className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
										View All Ministries
										<ArrowRight size={20} className="text-brand-orange group-hover:translate-x-1 transition-transform" />
									</p>
								</div>
							</Link>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{isLoadingMinistries ? (
							Array(3).fill(0).map((_, i) => (
								<div key={i} className="h-64 rounded-[40px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 animate-pulse" />
							))
						) : (apiMinistries.length > 0 ? apiMinistries : ministries).slice(0, 3).map((min, idx) => {
							// Use fallback logic for icons if needed since API doesn't have them
							const isStatic = !(min as any).id;
							const name = isStatic ? (min as any).title : (min as ChurchMinistry).name;
							const description = isStatic ? (min as any).desc : (min as ChurchMinistry).description ?? '';
							const icon = isStatic ? (min as any).icon : <Sparkles size={24} />;
							const color = isStatic ? (min as any).color : "bg-brand-blue";

							return (
								<motion.div
									key={(min as any).id || idx}
									whileHover={{ y: -8 }}
									className="p-8 sm:p-10 rounded-[40px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-start group"
								>
									<div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500`}>
										{icon}
									</div>
									<h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white leading-tight">{name}</h3>
									<p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-1">{description}</p>
									
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ─── Core Values ─── */}
			<section className="py-20 sm:py-24 px-4 sm:px-6 bg-white dark:bg-slate-950">
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

			{/* ─── FAQ Section ─── */}
			<section className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/30">
				<div className="max-w-3xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl sm:text-4xl font-black mb-4">Practical <span className="text-brand-blue">Info</span></h2>
						<p className="text-slate-500">Everything you need to know before visiting us this Sunday.</p>
					</div>

					<div className="space-y-4">
						{faqs.map((faq, idx) => (
							<div key={idx} className="border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
								<button
									onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
									className="w-full p-6 text-left flex items-center justify-between bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
								>
									<span className="font-bold text-slate-800 dark:text-white leading-tight pr-4">{faq.q}</span>
									<div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 transition-transform duration-300" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0)' }}>
										{openFaq === idx ? <Minus size={16} /> : <Plus size={16} />}
									</div>
								</button>
								{openFaq === idx && (
									<div className="p-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
										<p className="text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─── Call to Action ─── */}
			<section className="py-24 px-4 sm:px-6">
				<div className="max-w-6xl mx-auto relative group">
					<div className="absolute inset-0 bg-brand-orange rounded-[60px] blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
					
					<div className="relative bg-[#020617] rounded-[50px] sm:rounded-[70px] p-10 sm:p-20 overflow-hidden border border-white/5 flex flex-col items-center text-center">
						<div className="absolute inset-0 opacity-20 pointer-events-none">
							<div className="absolute -top-1/2 -left-1/4 w-[100%] h-[100%] bg-brand-orange/20 rounded-full blur-[120px]" />
							<div className="absolute -bottom-1/2 -right-1/4 w-[100%] h-[100%] bg-brand-blue/20 rounded-full blur-[120px]" />
						</div>

						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							whileInView={{ scale: 1, opacity: 1 }}
							viewport={{ once: true }}
							className="relative z-10 max-w-2xl"
						>
							<div className="w-20 h-20 rounded-3xl bg-brand-orange/20 flex items-center justify-center text-brand-orange mx-auto mb-8 shadow-2xl">
								<MapPin size={36} />
							</div>
							<h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight leading-[0.95]">
								Experience <br className="hidden sm:block" />
								<span className="text-brand-orange">Life Together.</span>
							</h2>
							<p className="text-white/60 text-lg sm:text-xl mb-12 leading-relaxed">
								Join us this Sunday at 10:00 AM. We can’t wait to welcome you to the family!
							</p>
							
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<button className="w-full sm:w-auto px-10 py-5 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-[24px] font-black tracking-wide shadow-2xl shadow-brand-orange/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 group/btn">
									Join This Sunday
									<ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
								</button>
								<button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[24px] font-black tracking-wide transition-all active:scale-95 text-center">
									Contact Us
								</button>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
