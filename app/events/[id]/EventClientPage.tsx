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
	ArrowLeft,
	Share2,
	AlertCircle,
} from "lucide-react";

interface EventItem {
	id: string;
	title: string;
	description: string;
	date: string;
	duration: string;
	location: string;
	image: string;
}

export default function EventClientPage({
	initialEvent,
	id,
}: {
	initialEvent: EventItem | null;
	id: string;
}) {
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

	if (!initialEvent) {
		return (
			<main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
				<Navbar />
				<div className="flex flex-col items-center justify-center py-40 px-6">
					<div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
						<AlertCircle className="h-10 w-10 text-slate-300 dark:text-slate-600" />
					</div>
					<h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
						Event Not Found
					</h1>
					<p className="text-slate-500 dark:text-slate-400 mb-8">
						The event you are looking for does not exist.
					</p>
					<Link
						href="/events"
						className="flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-orange/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
					>
						<ArrowLeft size={16} />
						Back to Events
					</Link>
				</div>
				<Footer />
			</main>
		);
	}

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: initialEvent.title,
					text: initialEvent.description,
					url: window.location.href,
				});
			} catch (err) {
				console.log("Error sharing:", err);
			}
		} else {
			navigator.clipboard.writeText(window.location.href);
			alert("Link copied to clipboard!");
		}
	};

	const dateParts = getDateParts(initialEvent.date);
	const status = getEventStatus(initialEvent.date);
	const bgFallback = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200";

	return (
		<main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
			<Navbar />

			<section className="relative w-full h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[350px] overflow-hidden bg-slate-950">
				<Image
					src={initialEvent.image || bgFallback}
					alt="Event backdrop"
					fill
					className="object-cover opacity-30"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

				<div className="absolute top-24 left-4 sm:left-8 z-20">
					<Link
						href="/events"
						className="flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 border border-white/10"
					>
						<ArrowLeft size={16} />
						All Events
					</Link>
				</div>
			</section>

			<section className="relative z-10 px-4 sm:px-6 pb-24">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-xl -mt-20 sm:-mt-28 p-6 sm:p-8 md:p-12 lg:p-14"
					>
						<div className="flex flex-col md:flex-row gap-6 md:gap-10">
							{/* Left Column: Date & Details */}
							<div className="md:w-1/3 flex flex-col gap-6">
								<div className="flex items-start gap-4">
									<div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 w-[100px] h-[100px] flex-shrink-0 shadow-sm">
										<span className="text-4xl font-black text-brand-orange leading-none">
											{dateParts.day}
										</span>
										<span className="text-sm font-bold text-slate-400 uppercase tracking-wide mt-1">
											{dateParts.month}
										</span>
									</div>
									<div className="flex flex-col py-1">
										<span className={`text-[11px] w-fit font-bold px-3 py-1 rounded-full mb-2 ${status.color}`}>
											{status.label}
										</span>
										<span className="text-slate-600 dark:text-slate-300 font-medium">
											{dateParts.weekday}
										</span>
										<span className="text-slate-400 text-sm">
											{dateParts.year}
										</span>
									</div>
								</div>

								<div className="flex flex-col gap-4 mt-2">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
											<Clock size={18} />
										</div>
										<div className="flex flex-col">
											<span className="text-xs text-slate-400 font-semibold uppercase">Time</span>
											<span className="text-sm font-medium text-slate-700 dark:text-slate-200">{initialEvent.duration}</span>
										</div>
									</div>

									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
											<MapPin size={18} />
										</div>
										<div className="flex flex-col">
											<span className="text-xs text-slate-400 font-semibold uppercase">Location</span>
											<span className="text-sm font-medium text-slate-700 dark:text-slate-200">{initialEvent.location}</span>
										</div>
									</div>
								</div>

								<div className="pt-6 mt-2 border-t border-slate-100 dark:border-slate-800">
									<button
										onClick={handleShare}
										className="flex items-center justify-center gap-2 w-full py-3 bg-brand-orange text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-orange/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
									>
										<Share2 size={16} />
										Share Event
									</button>
								</div>
							</div>

							{/* Right Column: Title & Description & Image */}
							<div className="md:w-2/3 flex flex-col pt-2">
								<h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
									{initialEvent.title}
								</h1>

								{initialEvent.image && (
									<div className="relative w-full h-[220px] sm:h-[300px] rounded-2xl overflow-hidden mb-8 border border-slate-100 dark:border-slate-800 shadow-md">
										<Image
											src={initialEvent.image}
											alt={initialEvent.title}
											fill
											className="object-cover"
										/>
									</div>
								)}

								<div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-[16px] leading-relaxed">
									{initialEvent.description ? (
										<p>{initialEvent.description}</p>
									) : (
										<p className="italic text-slate-400">No additional details provided for this event.</p>
									)}
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
