"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/utils/animation";
import { ArrowRight, BookOpen, Calendar, Clock, MapPin, Loader2 } from "lucide-react";
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

const UpdateSection = () => {
	const [latestEvent, setLatestEvent] = useState<EventItem | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
				const res = await fetch(`${apiUrl}/events`);
				if (!res.ok) throw new Error("Failed to fetch events");
				const data: EventItem[] = await res.json();
				
				// Optional: sort by date to get the nearest upcoming event
				if (data && data.length > 0) {
					// For now we just pick the first one from the endpoint
					setLatestEvent(data[0]);
				}
			} catch (err) {
				console.error("Failed to load latest event:", err);
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
				month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
				year: d.getFullYear().toString(),
				weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
			};
		} catch {
			return { day: "--", month: "---", year: "----", weekday: "---" };
		}
	};

	return (
		<section className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
			<div className="max-w-6xl mx-auto">
				<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
					<motion.div
						variants={fadeUp}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-bold text-sm mb-6"
					>
						<BookOpen size={15} />
						<span>Latest Updates</span>
					</motion.div>
					<motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
						GBCC <span className="text-brand-blue">Latest Event</span>
					</motion.h2>
					<motion.p variants={fadeUp} className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
						Stay connected with the latest news, announcements, and happenings in our church community.
					</motion.p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-lg p-8 sm:p-10 lg:p-14"
				>
					{isLoading ? (
						<div className="flex flex-col items-center justify-center py-20">
							<Loader2 className="h-10 w-10 text-brand-blue animate-spin mb-4" />
							<p className="text-slate-500 font-medium">Checking latest updates...</p>
						</div>
					) : latestEvent ? (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
							<div>
								<div className="flex items-center gap-3 mb-4">
									<span className="px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-[11px] font-bold uppercase tracking-widest">
										Upcoming Event
									</span>
									<span className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
										<Calendar size={14} />
										{getDateParts(latestEvent.date).month} {getDateParts(latestEvent.date).day}, {getDateParts(latestEvent.date).year}
									</span>
								</div>
								
								<h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
									{latestEvent.title}
								</h3>
								
								<div className="flex flex-col gap-2 mb-5">
									<div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
										<Clock size={15} className="text-slate-400 flex-shrink-0" />
										<span>{latestEvent.duration}</span>
									</div>
									<div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
										<MapPin size={15} className="text-slate-400 flex-shrink-0" />
										<span>{latestEvent.location}</span>
									</div>
								</div>

								<p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-8 ">
									{latestEvent.description || "Join us for this exciting upcoming event at GBCC! Connect with the community, experience worship, and grow in faith."}
								</p>
								
								<Link
									href={`/events`}
									className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:-translate-y-0.5 transition-all"
								>
									View All Events
									<ArrowRight size={15} />
								</Link>
							</div>
							
							<div className="relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
								{latestEvent.image ? (
									<Image
										src={latestEvent.image}
										alt={latestEvent.title}
										fill
										className="object-cover"
									/>
								) : (
									<div className="w-full h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-600">
										<Calendar size={48} className="mb-2 opacity-50" />
										<span className="text-sm font-medium">No Image Provided</span>
									</div>
								)}
							</div>
						</div>
					) : (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
							<div>
								<span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange mb-3 block">This Week</span>
								<h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
									Gaba Church Weekly Update
								</h3>
								<p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-6">
									This week at GBCC, we continue our sermon series on the Book of Romans. We also have exciting community events
									planned including outreach, youth fellowship, and our monthly worship night. Don&apos;t miss our midweek prayer
									sessions as we seek God together for revival in Gulu.
								</p>
								<Link
									href="/events"
									className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:-translate-y-0.5 transition-all"
								>
									View All Events
									<ArrowRight size={15} />
								</Link>
							</div>
							<div className="relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden">
								<Image
									src="/community.png"
									alt="Church Update"
									fill
									className="object-cover"
								/>
							</div>
						</div>
					)}
				</motion.div>
			</div>
		</section>
	);
};

export default UpdateSection;