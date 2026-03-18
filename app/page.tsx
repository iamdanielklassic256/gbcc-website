"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	ChevronRight,
	Play,
	Calendar,
	MapPin,
	Clock,
	Users,
	Heart,
	Target,
	BookOpen,
	ArrowRight,
	Send,
	Sparkles,
	Radio,
	Cross,
	User,
	Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import { fadeUp, stagger } from "@/utils/animation";
import GettingStarted from "@/components/home/GettingStarted";
import CoreIdentity from "@/components/home/CoreIdentity";
import UpdateSection from "@/components/home/UpdateSection";

/* ─── Types ─── */
interface EventItem {
	id: string;
	title: string;
	description: string;
	date: string;
	duration: string;
	location: string;
	image: string;
}

/* ─── Sermons Data ─── */
const sermons = [
	{
		title: "Revelations of the Harvest",
		speaker: "Pastor Daniel",
		videoId: "dQw4w9WgXcQ",
		image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600",
		category: "Teaching",
	},
	{
		title: "Evening Prayer Service",
		speaker: "Pastor Grace",
		videoId: "dQw4w9WgXcQ",
		image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600",
		category: "Prayer",
	},
	{
		title: "The Power of Faith",
		speaker: "Pastor John",
		videoId: "dQw4w9WgXcQ",
		image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=600",
		category: "Faith",
	},
];

/* ─── Schedule Data ─── */
const weeklySchedule = [
	{ day: "Sunday", time: "7:30 AM", event: "Early Morning Service", accent: true },
	{ day: "Sunday", time: "9:30 AM", event: "Main Service", accent: true },
	{ day: "Sunday", time: "11:30 AM", event: "Late Morning Service", accent: true },
	{ day: "Tuesday", time: "5:30 PM", event: "Women Fellowship", accent: false },
	{ day: "Wednesday", time: "6:00 PM", event: "Mid-Week Prayer", accent: false },
	{ day: "Thursday", time: "5:30 PM", event: "Youth Fellowship", accent: false },
	{ day: "Friday", time: "5:30 PM", event: "Men Fellowship", accent: false },
	{ day: "Saturday", time: "6:00 AM", event: "Dawn Prayer", accent: false },
];



export default function Home() {
	const [events, setEvents] = useState<EventItem[]>([]);
	const [eventsLoading, setEventsLoading] = useState(true);
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
				const res = await fetch(`${apiUrl}/events`);
				if (res.ok) {
					const data = await res.json();
					setEvents(data.slice(0, 3));
				}
			} catch (err) {
				console.error(err);
			} finally {
				setEventsLoading(false);
			}
		};
		fetchEvents();
	}, []);

	const getDateParts = (dateStr: string) => {
		try {
			const d = new Date(dateStr);
			if (isNaN(d.getTime())) return { day: "--", month: "---" };
			return {
				day: d.getDate().toString().padStart(2, "0"),
				month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
			};
		} catch {
			return { day: "--", month: "---" };
		}
	};

	return (
		<main className="min-h-screen bg-white dark:bg-[#020617]">
			<Navbar />
			<HeroSection />
			<GettingStarted />
			<CoreIdentity />
			<UpdateSection />

			{/* ═══════════════════════════════════════════════
			    6. SERMONS / MESSAGES SECTION
			═══════════════════════════════════════════════ */}
			{/* <section className="py-20 sm:py-28 px-4 sm:px-6">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={stagger}
						className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14"
					>
						<div>
							<motion.span
								variants={fadeUp}
								className="text-brand-orange font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
							>
								Recent Messages
							</motion.span>
							<motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
								Feed Your Soul with the <span className="text-brand-blue">Truth</span>
							</motion.h2>
						</div>
						<motion.div variants={fadeUp}>
							<Link
								href="/sermons"
								className="text-brand-orange font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm border-b-2 border-brand-orange/20 hover:border-brand-orange pb-1"
							>
								More Sermons <ArrowRight size={16} />
							</Link>
						</motion.div>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={stagger}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
					>
						{sermons.map((sermon, idx) => (
							<motion.div
								key={idx}
								variants={fadeUp}
								className="group bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-orange/20 transition-all duration-500 hover:-translate-y-1"
							>
								<div className="relative h-[220px] overflow-hidden">
									<Image src={sermon.image} alt={sermon.title} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
									<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
									<div className="absolute top-4 left-4">
										<span className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
											{sermon.category}
										</span>
									</div>
									<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
										<div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 scale-0 group-hover:scale-100 transition-transform duration-500">
											<Play fill="white" size={22} />
										</div>
									</div>
								</div>
								<div className="p-6">
									<div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium mb-3">
										<User size={12} />
										<span>{sermon.speaker}</span>
									</div>
									<h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors leading-snug">
										{sermon.title}
									</h3>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section> */}

			{/* ═══════════════════════════════════════════════
			    7. EVENTS SECTION (Dynamic from API)
			═══════════════════════════════════════════════ */}
			{/* <section className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={stagger}
						className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14"
					>
						<div>
							<motion.span
								variants={fadeUp}
								className="text-brand-orange font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
							>
								Upcoming Events
							</motion.span>
							<motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
								Don&apos;t Miss <span className="text-brand-orange">What&apos;s Next</span>
							</motion.h2>
						</div>
						<motion.div variants={fadeUp}>
							<Link
								href="/events"
								className="text-brand-orange font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm border-b-2 border-brand-orange/20 hover:border-brand-orange pb-1"
							>
								View All Events <ArrowRight size={16} />
							</Link>
						</motion.div>
					</motion.div>

					{eventsLoading ? (
						<div className="flex justify-center py-16">
							<Loader2 className="h-10 w-10 text-brand-orange animate-spin" />
						</div>
					) : events.length === 0 ? (
						<div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/80 dark:border-slate-800 p-12 text-center">
							<Calendar className="h-10 w-10 text-slate-300 mx-auto mb-4" />
							<p className="text-slate-500 dark:text-slate-400 font-medium">No upcoming events right now. Check back soon!</p>
						</div>
					) : (
						<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-5">
							{events.map((event) => {
								const dp = getDateParts(event.date);
								return (
									<motion.div
										key={event.id}
										variants={fadeUp}
										className="group bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-orange/20 transition-all duration-500 overflow-hidden"
									>
										<div className="flex flex-col sm:flex-row">
											<div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-0 sm:flex-col sm:min-w-[90px] p-5 sm:pt-6 sm:pb-6 sm:border-r border-slate-100 dark:border-slate-800">
												<span className="text-3xl sm:text-4xl font-black text-brand-orange leading-none">{dp.day}</span>
												<span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{dp.month}</span>
											</div>
											<div className="flex-1 p-5 sm:p-6">
												<div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1.5">
													<Clock size={12} />
													<span>{event.duration}</span>
													<span className="mx-1 text-slate-200 dark:text-slate-700">|</span>
													<MapPin size={12} />
													<span>{event.location}</span>
												</div>
												<h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors">
													{event.title}
												</h3>
												{event.description && (
													<p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{event.description}</p>
												)}
											</div>
											{event.image && (
												<div className="relative w-full sm:w-[140px] h-[120px] sm:h-auto flex-shrink-0">
													<Image src={event.image} alt={event.title} fill className="object-contain p-2" />
												</div>
											)}
										</div>
									</motion.div>
								);
							})}
						</motion.div>
					)}
				</div>
			</section> */}

			{/* ═══════════════════════════════════════════════
			    8. PROGRAMS & SCHEDULE SECTION
			═══════════════════════════════════════════════ */}
			{/* <section className="py-20 sm:py-28 px-4 sm:px-6 bg-brand-blue relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-0 left-0 w-full h-full opacity-[0.05]">
						<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
							<path d="M0 0 L100 0 L100 100 Z" fill="white" />
						</svg>
					</div>
					<div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-brand-orange/15 rounded-full blur-[130px]" />
				</div>

				<div className="max-w-6xl mx-auto relative z-10">
					<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
						<motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
							Weekly Schedule & <span className="text-brand-orange">Service Times</span>
						</motion.h2>
						<motion.p variants={fadeUp} className="text-white/55 max-w-xl mx-auto text-lg font-medium">
							We have multiple services and fellowships designed to help you connect with God and our community.
						</motion.p>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={stagger}
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
					>
						{weeklySchedule.map((item, idx) => (
							<motion.div
								key={idx}
								variants={fadeUp}
								className={`rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
									item.accent
										? "bg-brand-orange/20 border-brand-orange/30 hover:bg-brand-orange/30"
										: "bg-white/8 border-white/10 hover:bg-white/15"
								}`}
							>
								<span className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${item.accent ? "text-brand-orange" : "text-white/40"}`}>
									{item.day}
								</span>
								<p className="text-white font-bold text-base mb-1">{item.event}</p>
								<div className="flex items-center gap-1.5 text-white/60 text-sm">
									<Clock size={13} />
									<span>{item.time}</span>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section> */}

			{/* ═══════════════════════════════════════════════
			    9. NEWSLETTER SUBSCRIPTION SECTION
			═══════════════════════════════════════════════ */}
			{/* <section className="py-20 sm:py-28 px-4 sm:px-6">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="relative bg-slate-950 rounded-[36px] p-10 sm:p-14 md:p-20 overflow-hidden shadow-2xl"
					>
						<div className="absolute top-0 right-0 w-72 h-72 bg-brand-orange/20 blur-[120px] pointer-events-none" />
						<div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-blue/20 blur-[120px] pointer-events-none" />

						<div className="relative z-10 text-center">
							<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm mb-6">
								<Send size={14} className="text-brand-orange" />
								Stay Connected
							</div>

							<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
								Subscribe to Our <span className="text-brand-orange">Newsletter</span>
							</h2>
							<p className="text-white/50 max-w-lg mx-auto text-lg mb-10">
								Get weekly updates, devotionals, and event notifications delivered straight to your inbox.
							</p>

							<form
								onSubmit={(e) => {
									e.preventDefault();
									alert(`Thank you ${firstName}! You've been subscribed.`);
									setFirstName("");
									setLastName("");
									setEmail("");
								}}
								className="max-w-xl mx-auto space-y-4"
							>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<input
										type="text"
										placeholder="First name"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										required
										className="w-full px-5 py-3.5 rounded-xl bg-white/8 border border-white/10 text-white placeholder:text-white/30 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
									/>
									<input
										type="text"
										placeholder="Last name"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										required
										className="w-full px-5 py-3.5 rounded-xl bg-white/8 border border-white/10 text-white placeholder:text-white/30 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
									/>
								</div>
								<input
									type="email"
									placeholder="Email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="w-full px-5 py-3.5 rounded-xl bg-white/8 border border-white/10 text-white placeholder:text-white/30 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
								/>
								<button
									type="submit"
									className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-brand-orange/25 hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
								>
									Subscribe Now
									<Send size={16} />
								</button>
							</form>
						</div>
					</motion.div>
				</div>
			</section> */}

			<Footer />
		</main>
	);
}
