"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	Calendar,
	MapPin,
	Clock,
	Loader2,
	AlertCircle,
	Sparkles,
	Radio,
	BookOpen,
	Heart,
	Flame,
	Shield,
	GraduationCap,
	Phone,
	Mail,
	FileText,
	CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";

interface EventItem {
	id: string;
	title: string;
	description: string;
	date: string;
	duration: string;
	location: string;
	image: string;
}

const weeklyPrograms = [
	{
		day: "Sunday",
		time: "7:00 PM - 8:00 PM",
		title: "Radio Program",
		description: "Officially resumed! Support the broadcast by donating 10,000/= per month.",
		icon: Radio,
		color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
		border: "hover:border-purple-300 dark:hover:border-purple-500/30"
	},
	{
		day: "Mon - Fri",
		time: "8:00 AM - 9:00 AM",
		title: "Daily Devotion",
		description: "Start your morning with prayer and scripture to set the tone for your day.",
		icon: BookOpen,
		color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
		border: "hover:border-emerald-300 dark:hover:border-emerald-500/30"
	},
	{
		day: "Tuesday",
		time: "5:00 PM",
		title: "Virtuous Women Ministry",
		description: "A time of fellowship, encouragement, and prayer for the women.",
		icon: Heart,
		color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
		border: "hover:border-rose-300 dark:hover:border-rose-500/30"
	},
	{
		day: "Wednesday",
		time: "9:00 AM - 4:00 PM",
		title: "Mid-week Prayer & Fasting",
		description: "Dedicated hours of pursuing God's presence in prayer and fasting.",
		icon: Flame,
		color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
		border: "hover:border-amber-300 dark:hover:border-amber-500/30"
	},
	{
		day: "Thursday",
		time: "4:30 PM - 5:30 PM",
		title: "Bible Study",
		description: "Deep dive into the Word of God together to grow in truth.",
		icon: FileText,
		color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
		border: "hover:border-blue-300 dark:hover:border-blue-500/30"
	},
	{
		day: "Friday",
		time: "5:00 PM",
		title: "Men of Honor Fellowship",
		description: "Empowering men to lead with integrity. Gather here at the church.",
		icon: Shield,
		color: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
		border: "hover:border-slate-400 dark:hover:border-slate-500/30"
	}
];

const aruCourses = [
	{
		title: "Diploma of Arts in Theology",
		qualification: "‘A’ Level certificate with 1 principle pass and 2 subsidiaries. OR an equivalent from an accredited institution.",
		schedule: "Saturdays from 8:00 AM - 5:00 PM"
	},
	{
		title: "Certificate in Theology",
		qualification: "Senior Four (4) certificate with credits in Math and English. OR an equivalent from an accredited institution.",
		schedule: "Saturdays 8:00 AM - 5:00 PM, Sundays 3:00 PM - 5:00 PM"
	},
	{
		title: "Certificate in Christian Ministry",
		qualification: "Ability to read and write.",
		schedule: "Modular: 10 days a semester."
	}
];

export default function EventsPage() {
	const [events, setEvents] = useState<EventItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const apiUrl =
					process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
				const res = await fetch(`${apiUrl}/events`);
				if (!res.ok) throw new Error("Failed to fetch events");
				const data = await res.json();
				setEvents(data);
			} catch (err) {
				console.error(err);
				setError("Failed to load upcoming events.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchEvents();
	}, []);

	const getDateParts = (dateStr: string) => {
		try {
			const d = new Date(dateStr);
			if (isNaN(d.getTime()))
				return { day: "--", month: "---", year: "----", weekday: "---" };
			return {
				day: d.getDate().toString().padStart(2, "0"),
				month: d
					.toLocaleDateString("en-US", { month: "short" })
					.toUpperCase(),
				year: d.getFullYear().toString(),
				weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
			};
		} catch {
			return { day: "--", month: "---", year: "----", weekday: "---" };
		}
	};

	const getEventStatus = (dateStr: string) => {
		try {
			const eventDate = new Date(dateStr);
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			eventDate.setHours(0, 0, 0, 0);
			const diff = Math.ceil(
				(eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
			);
			if (diff < 0)
				return { label: "Elapsed Event", color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" };
			if (diff === 0)
				return { label: "Happening Today", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" };
			if (diff === 1)
				return { label: "Tomorrow", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" };
			if (diff <= 7)
				return { label: `In ${diff} Days`, color: "bg-brand-orange/10 text-brand-orange" };
			return { label: "Upcoming Event", color: "bg-brand-blue/10 text-brand-blue" };
		} catch {
			return { label: "Event", color: "bg-slate-100 text-slate-600" };
		}
	};

	const fadeUp = {
		hidden: { opacity: 0, y: 24 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
		},
	};

	const stagger = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	return (
		<main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
			<Navbar />

			{/* ─── Hero ─── */}
			<section className="relative min-h-[48vh] w-full flex items-center justify-center overflow-hidden bg-slate-950">
				<div className="absolute inset-0 z-0">
					<Image
						src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200"
						alt="Events backdrop"
						fill
						className="object-cover opacity-30"
						priority
					/>
				</div>
				<div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
					<div className="absolute top-[-15%] left-[15%] w-[55%] h-[55%] bg-brand-orange/20 rounded-full blur-[160px]" />
					<div className="absolute bottom-[-15%] right-[5%] w-[40%] h-[40%] bg-brand-blue/25 rounded-full blur-[130px]" />
				</div>

				<div className="relative z-10 text-center px-6 py-32 md:py-40 max-w-4xl mx-auto">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={stagger}
						className="space-y-5"
					>
						<motion.div
							variants={fadeUp}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold text-sm shadow-lg"
						>
							<Sparkles size={15} className="text-brand-orange" />
							<span>Don&apos;t miss what&apos;s next</span>
						</motion.div>

						<motion.h1
							variants={fadeUp}
							className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[0.95]"
						>
							Upcoming{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-brand-orange">
								Events
							</span>
						</motion.h1>

						<motion.p
							variants={fadeUp}
							className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto font-medium"
						>
							There is always something happening at GBCC. Join us for worship,
							fellowship, and community.
						</motion.p>
					</motion.div>
				</div>

				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-[#020617] to-transparent pointer-events-none z-10" />
			</section>



			{/* ─── Weekly Programs ─── */}
			<section className="relative py-28 px-4 sm:px-6 bg-slate-50 dark:bg-[#060b22] border-t border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
				<div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
				<div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

				<div className="max-w-6xl mx-auto relative z-10">
					<div className="text-center mb-16">
						<motion.h2
							initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
							className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4"
						>
							Weekly <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Programs</span>
						</motion.h2>
						<motion.p
							initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
							className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
						>
							Join our consistent weekly gatherings as we commit ourselves to community, prayer, and studying the Word together.
						</motion.p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{weeklyPrograms.map((prog, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1, duration: 0.5 }}
								className={`group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 ${prog.border}`}
							>
								<div className="flex items-center justify-between mb-6">
									<div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${prog.color}`}>
										<prog.icon size={26} />
									</div>
									<div className="text-right">
										<span className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
											{prog.day}
										</span>
										<span className="block text-xs font-semibold text-brand-orange mt-1">
											{prog.time}
										</span>
									</div>
								</div>
								<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors">
									{prog.title}
								</h3>
								<p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
									{prog.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ─── ARU Section ─── */}
			<section className="relative py-28 px-4 sm:px-6 bg-[#020617] text-white overflow-hidden border-t border-slate-800">
				{/* Background styling */}
				<div className="absolute inset-0 z-0">
					<Image
						src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200"
						alt="ARU Background"
						fill
						className="object-cover opacity-10"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/95 to-[#020617]" />
				</div>
				<div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />

				<div className="max-w-6xl mx-auto relative z-10">
					<div className="text-center mb-16">
						<motion.div
							initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm shadow-lg mb-6"
						>
							<GraduationCap size={16} />
							<span>Admissions Open This February</span>
						</motion.div>
						<motion.h2
							initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
							className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight"
						>
							Africa Renewal University<br className="max-md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Gulu Centre</span>
						</motion.h2>
						<motion.p
							initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
							className="text-lg text-slate-400 max-w-2xl mx-auto"
						>
							Call for applications! Equip yourself for ministry and impact your community through our certified programs.
						</motion.p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
						{aruCourses.map((course, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1, duration: 0.5 }}
								className="bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-xl p-8 rounded-3xl transition-all duration-300 relative overflow-hidden group"
							>
								<div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-teal-400 opacity-50 group-hover:opacity-100 transition-opacity" />
								<h3 className="text-xl font-bold text-white mb-6">
									{course.title}
								</h3>

								<div className="space-y-4">
									<div>
										<span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
											<CheckCircle2 size={14} />
											Qualification
										</span>
										<p className="text-sm text-slate-300 leading-relaxed">
											{course.qualification}
										</p>
									</div>
									<div className="pt-4 border-t border-white/10">
										<span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
											<Clock size={14} />
											Schedule
										</span>
										<p className="text-sm text-slate-300 leading-relaxed">
											{course.schedule}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Contact Box */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900/40 to-teal-900/40 border border-blue-500/20 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden group"
					>
						<div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors" />
						<div className="relative z-10">
							<h4 className="text-2xl font-bold text-white mb-3">Ready to Apply?</h4>
							<p className="text-slate-300 mb-8 max-w-xl mx-auto">
								Pick up your application form directly from GBCC or reach out to the Centre Coordinator for assistance.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<a href="tel:0783583954" className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
									<Phone size={18} className="text-blue-400" />
									0783 583 954
								</a>
								<a href="mailto:morrishmonday@gmail.com" className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-1">
									<Mail size={18} />
									Email Coordinator
								</a>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* ─── Events List ─── */}
			<section className="relative z-10 pb-28 px-4 sm:px-6">
				<div className="max-w-6xl mx-auto">
					{/* Loading */}
					{isLoading && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex flex-col items-center justify-center py-28"
						>
							<div className="relative">
								<div className="absolute inset-0 rounded-full bg-brand-orange/20 animate-ping" />
								<Loader2 className="h-12 w-12 text-brand-orange animate-spin relative z-10" />
							</div>
							<p className="text-lg text-foreground/50 font-semibold mt-6">
								Loading events...
							</p>
						</motion.div>
					)}

					{/* Error */}
					{!isLoading && error && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 rounded-3xl p-10 text-center flex flex-col items-center shadow-xl"
						>
							<div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-5">
								<AlertCircle className="h-8 w-8 text-red-500" />
							</div>
							<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
								Something went wrong
							</h3>
							<p className="text-slate-500 dark:text-slate-400 mb-6">
								{error}
							</p>
							<button
								onClick={() => window.location.reload()}
								className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
							>
								Retry
							</button>
						</motion.div>
					)}

					{/* Empty */}
					{!isLoading && !error && events.length === 0 && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-16 text-center flex flex-col items-center shadow-xl"
						>
							<div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
								<Calendar className="h-10 w-10 text-slate-300 dark:text-slate-600" />
							</div>
							<h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
								No Events Scheduled
							</h3>
							<p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
								We don&apos;t have any upcoming events right now. Check back soon!
							</p>
						</motion.div>
					)}

					{/* Event Cards */}
					{!isLoading && !error && events.length > 0 && (
						<motion.div
							initial="hidden"
							animate="visible"
							variants={stagger}
						>
							{/* Timeline Line */}
							<div className="relative mt-10">
								{/* Vertical timeline connector (visible on md+) */}
								<div className="hidden md:block absolute left-[52px] top-0 bottom-0 w-px bg-gradient-to-b from-brand-orange/30 via-slate-200 dark:via-slate-800 to-transparent" />

								<div className="space-y-6">
									{events.map((event) => {
										const dateParts = getDateParts(event.date);
										const status = getEventStatus(event.date);

										return (
											<motion.article
												key={event.id}
												variants={fadeUp}
												className="group relative"
											>
												{/* Card */}
												<Link href={`/events/${event.id}`} className="block w-full">
													<div className="relative bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/80 dark:border-slate-800 hover:border-brand-orange/25 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-brand-orange/5 transition-all duration-500 overflow-hidden cursor-pointer">
														<div className="flex flex-col md:flex-row">
															{/* ── Date Column ── */}
															<div className="hidden md:flex flex-col items-center justify-start pt-8 pb-8 px-6 min-w-[104px] border-r border-slate-100 dark:border-slate-800 relative">
																{/* Timeline dot */}
																<div className="absolute -left-[1px] top-10 w-2.5 h-2.5 rounded-full bg-brand-orange ring-4 ring-white dark:ring-slate-900 z-10 -translate-x-1/2" />

																<span className="text-4xl lg:text-5xl font-black text-brand-orange leading-none">
																	{dateParts.day}
																</span>
																<span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
																	{dateParts.month}
																</span>
																<span className="text-xs text-slate-300 dark:text-slate-600 font-semibold mt-0.5">
																	{dateParts.year}
																</span>
															</div>

															{/* ── Content Column ── */}
															<div className="flex-1 min-w-0 p-5 sm:p-6 lg:p-8">
																{/* Mobile Date Row */}
																<div className="flex items-center gap-3 mb-3 md:hidden">
																	<span className="text-3xl font-black text-brand-orange leading-none">
																		{dateParts.day}
																	</span>
																	<div className="flex flex-col">
																		<span className="text-xs font-bold text-slate-400 uppercase tracking-wider leading-none">
																			{dateParts.month}
																		</span>
																		<span className="text-[10px] text-slate-300 dark:text-slate-600 font-semibold leading-none mt-0.5">
																			{dateParts.year}
																		</span>
																	</div>
																	<span className={`ml-auto text-[11px] font-bold px-3 py-1 rounded-full ${status.color}`}>
																		{status.label}
																	</span>
																</div>

																{/* Status Badge - Desktop */}
																<div className="hidden md:flex items-center gap-3 mb-3">
																	<span className={`text-[11px] font-bold px-3 py-1 rounded-full ${status.color}`}>
																		{status.label}
																	</span>
																</div>

																{/* Time | Location */}
																<div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 font-medium mb-2">
																	<Clock
																		size={14}
																		className="text-slate-400 dark:text-slate-500 flex-shrink-0"
																	/>
																	<span>{event.duration}</span>
																	<span className="text-slate-300 dark:text-slate-700 mx-1">|</span>
																	<MapPin
																		size={14}
																		className="text-slate-400 dark:text-slate-500 flex-shrink-0"
																	/>
																	<span>{event.location}</span>
																</div>

																{/* Title */}
																<h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-brand-orange transition-colors duration-300">
																	{event.title}
																</h2>

																{/* Description */}
																{event.description && (
																	<p className="text-slate-500 dark:text-slate-400 text-sm sm:text-[15px] leading-relaxed mb-5 max-w-xl">
																		{event.description}
																	</p>
																)}
															</div>

															{/* ── Image Column ── */}
															<div className="relative w-full md:w-[280px] lg:w-[340px] xl:w-[380px] h-[220px] sm:h-[240px] md:h-auto flex-shrink-0 order-first md:order-last rounded-lg">
																{event.image ? (
																	<>
																		<Image
																			src={event.image}
																			alt={event.title}
																			fill
																			className="object-contain p-3 rounded-lg"
																		/>
																		{/* Soft rounded inner mask on the left side for desktop */}
																		<div className="hidden md:block absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10" />
																	</>
																) : (
																	<div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 text-slate-300 dark:text-slate-700">
																		<Calendar className="h-12 w-12 mb-2 opacity-40" />
																		<span className="text-xs font-medium">No Image</span>
																	</div>
																)}
															</div>
														</div>
													</div>
												</Link>
											</motion.article>
										);
									})}
								</div>
							</div>
						</motion.div>
					)}
				</div>
			</section>

			<Footer />
		</main>
	);
}
