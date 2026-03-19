"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	Sparkles,
	Heart,
	Users,
	Church,
	MapPin,
	ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import heroimg from '@/assets/images/about/ignite5.jpg'

const initialMinistries = [
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

export default function MinistriesPage() {
	const [apiMinistries, setApiMinistries] = useState<ChurchMinistry[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";

	useEffect(() => {
		const fetchMinistries = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(`${apiUrl}/church_ministries`);
				if (!res.ok) throw new Error("Failed to fetch");
				const data = await res.json();
				setApiMinistries(Array.isArray(data) ? data : data.data || []);
			} catch (err) {
				console.error("Ministries fetch failed:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMinistries();
	}, [apiUrl]);

	// Combine them if there's API data, or use static ones
	const displayMinistries = apiMinistries.length > 0 ? apiMinistries : initialMinistries;

	return (
		<main className="min-h-screen">
			<Navbar />

			{/* Sub-page Hero */}
			<section className="relative h-[40vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src={heroimg}
						alt="Our Ministries"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" />
				</div>
				<div className="relative z-10 text-center px-4 sm:px-6">
					<motion.span 
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="inline-block text-brand-orange font-black uppercase tracking-[0.3em] text-xs mb-4"
					>
						Finding Your Place
					</motion.span>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter"
					>
						Our <span className="text-brand-orange">Ministries</span>
					</motion.h1>
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed"
					>
						At GBCC, we believe everyone has a unique purpose and a part to play in God&apos;s story. Discover a community where you can grow, serve, and belong.
					</motion.p>
				</div>
			</section>

			{/* All Ministries Grid */}
			<section className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
				{/* Decorative accents */}
				<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
				<div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

				<div className="max-w-7xl mx-auto relative z-10">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
						{isLoading ? (
							Array(6).fill(0).map((_, i) => (
								<div key={i} className="h-80 rounded-[48px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 animate-pulse" />
							))
						) : displayMinistries.map((min, idx) => {
							const isStatic = !(min as any).id;
							const name = isStatic ? (min as any).title : (min as ChurchMinistry).name;
							const description = isStatic ? (min as any).desc : (min as ChurchMinistry).description ?? '';
							const icon = isStatic ? (min as any).icon : <Sparkles size={28} />;
							const color = isStatic ? (min as any).color : "bg-brand-blue";

							return (
								<motion.div
									key={(min as any).id || idx}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: (idx % 3) * 0.1 }}
									whileHover={{ y: -12 }}
									className="group p-10 rounded-[48px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-brand-orange/10 transition-all duration-700 flex flex-col items-start"
								>
									<div className={`w-16 h-16 rounded-3xl ${color} flex items-center justify-center text-white shadow-xl mb-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
										{icon}
									</div>
									<h3 className="text-2xl sm:text-3xl font-black mb-6 text-slate-900 dark:text-white leading-tight uppercase tracking-tight group-hover:text-brand-orange transition-colors duration-500">
										{name}
									</h3>
									<p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-10 flex-1">
										{description}
									</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Involvement CTA */}
			<section className="py-24 px-4 sm:px-6">
				<div className="max-w-7xl mx-auto">
					<div className="relative overflow-hidden rounded-[60px] bg-[#020617] p-12 sm:p-24 text-center">
						<div className="absolute inset-0 opacity-20">
							<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-orange/40 via-transparent to-brand-blue/40" />
						</div>
						
						<div className="relative z-10 max-w-3xl mx-auto">
							<h2 className="text-4xl sm:text-6xl font-black text-white mb-8 leading-[0.95]">
								Ready to <span className="text-brand-orange text-glow">Serve?</span>
							</h2>
							<p className="text-white/60 text-lg sm:text-xl mb-12 leading-relaxed">
								Whether you&apos;re looking to join a community or start serving, we have a place for you. Reach out to us today to get started.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
								<Link href="/contact" className="w-full sm:w-auto px-12 py-6 bg-brand-orange text-white rounded-[32px] font-black uppercase tracking-widest shadow-2xl shadow-brand-orange/30 hover:-translate-y-1 transition-all active:scale-95">
									Contact Us
								</Link>
								<Link href="/" className="w-full sm:w-auto px-12 py-6 bg-white/5 text-white border border-white/10 rounded-[32px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
									Go Home
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
