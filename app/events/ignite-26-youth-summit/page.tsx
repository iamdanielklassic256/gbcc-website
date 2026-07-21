"use client";
// page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	ArrowLeft,
	Calendar,
	MapPin,
	Clock,
	Flame,
	BookOpen,
	Users,
	Sparkles,
	Mail,
	QrCode,
	ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.07 },
	}),
};

function SectionHeader({ icon: Icon, title, index }: { icon: React.ElementType; title: string; index: number }) {
	return (
		<motion.div
			custom={index}
			initial="hidden"
			animate="visible"
			variants={fadeUp}
			className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200 dark:border-slate-800"
		>
			<span className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-orange/10">
				<Icon size={18} className="text-brand-orange" />
			</span>
			<h2 className="text-lg font-extrabold text-slate-800 dark:text-white tracking-tight uppercase">
				{title}
			</h2>
		</motion.div>
	);
}

const expectItems = [
	{
		icon: Flame,
		title: "Powerful Worship",
		desc: "Worship that ushers you into God's presence.",
	},
	{
		icon: BookOpen,
		title: "Biblical Teaching",
		desc: "Teaching that grounds you in God's Word.",
	},
	{
		icon: Users,
		title: "Fellowship",
		desc: "Connection with other young believers on the same journey.",
	},
	{
		icon: Sparkles,
		title: "Revival Encounters",
		desc: "Moments that stir your faith and ignite your calling.",
	},
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function IgniteYouthSummitPage() {
	const [eventImage, setEventImage] = useState<string | null>(null);

	useEffect(() => {
		const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
		fetch(`${apiBase}/events`)
			.then((r) => r.json())
			.then((data) => {
				const list: Array<{ title: string; image?: string }> =
					Array.isArray(data) ? data : data?.data ?? data?.events ?? [];
				const match = list.find((e) =>
					e.title.toLowerCase().includes("ignite 26")
				);
				if (match?.image) setEventImage(match.image);
			})
			.catch(() => { }); // silently ignore — image is decorative
	}, []);

	return (
		<main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
			<Navbar />

			{/* ─── Hero ─── */}
			<section className="relative bg-slate-950 overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-[-20%] left-[10%] w-[60%] h-[60%] bg-brand-orange/15 rounded-full blur-[160px]" />
					<div className="absolute bottom-[-20%] right-[5%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blur-[130px]" />
				</div>
				<div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					>
						<Link
							href="/events"
							className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors mb-6"
						>
							<ArrowLeft size={14} />
							Back to Events
						</Link>

						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-widest mb-4">
							<Flame size={13} />
							Season 2
						</div>

						<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] mb-4">
							IGNITE{" "}
							<span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange via-amber-400 to-brand-orange">
								26
							</span>
						</h1>

						<p className="text-white/60 text-lg font-medium mb-2">
							Youth Summit — Season 2
						</p>
						<p className="text-white/40 text-sm font-medium mb-6 max-w-xl mx-auto">
							Knowing Your God as a Young Person
						</p>

						<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
							<span className="flex items-center gap-1.5">
								<Calendar size={14} className="text-brand-orange" />
								24 – 28 August 2026
							</span>
							<span className="text-white/20">|</span>
							<span className="flex items-center gap-1.5">
								<MapPin size={14} className="text-brand-orange" />
								Venue to be communicated
							</span>
						</div>
					</motion.div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-b from-transparent to-slate-50 dark:to-[#020617] pointer-events-none" />
			</section>

			{/* ─── Intro / Image ─── */}
			<section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
				<motion.div
					initial={{ opacity: 0, y: 28 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
					className="flex flex-col md:flex-row gap-8 md:gap-10 items-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
				>
					<div className="relative w-full md:w-85 lg:w-95 shrink-0 h-60 md:h-auto md:self-stretch">
						{eventImage ? (
							<Image
								src={eventImage}
								alt="IGNITE 26 Youth Summit"
								fill
								className="object-cover"
							/>
						) : (
							<div className="w-full h-full min-h-60 flex flex-col items-center justify-center bg-linear-to-br from-brand-orange/10 via-amber-50 to-brand-blue/10 dark:from-slate-800 dark:to-slate-900">
								<Flame className="w-14 h-14 text-brand-orange/40 mb-2" />
								<span className="text-xs font-semibold text-slate-400">Event Image</span>
							</div>
						)}
					</div>

					<div className="flex-1 px-6 py-8 md:py-10 md:pr-10">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-widest mb-4">
							Something Powerful Is Coming to Gulu
						</div>
						<h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-3">
							This Is Your Moment
						</h2>
						<p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px] mb-4">
							The second season of GBCC&rsquo;s youth conference is here. Five
							days of worship, biblical teaching, fellowship, and
							life-changing encounters with the living God. If you&rsquo;re a
							young person searching for more purpose, more faith, more of
							God — this is for you.
						</p>
						<div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
							<span className="flex items-center gap-1.5">
								<Calendar size={14} className="text-brand-orange shrink-0" />
								24 – 28 August 2026
							</span>
							<span className="flex items-center gap-1.5">
								<MapPin size={14} className="text-brand-orange shrink-0" />
								Venue TBC
							</span>
						</div>
					</div>
				</motion.div>
			</section>

			{/* ─── Theme ─── */}
			<section className="max-w-4xl mx-auto px-4 sm:px-6 pb-4">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
					className="relative overflow-hidden rounded-3xl border border-brand-orange/30 bg-linear-to-br from-brand-orange/8 via-amber-50/60 to-brand-orange/5 dark:from-brand-orange/10 dark:via-slate-900 dark:to-slate-900 dark:border-brand-orange/20 p-6 sm:p-8"
				>
					<div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
					<div className="relative">
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-widest mb-3">
							The Theme
						</div>
						<h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
							Knowing Your God as a Young Person
						</h3>
						<blockquote className="border-l-4 border-brand-orange pl-4 italic text-slate-600 dark:text-slate-300 mb-4">
							&ldquo;The people who know their God shall be strong.&rdquo; — Daniel 11:32
						</blockquote>
						<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
							Not strong because of talent, or connections — strong because
							they know their God. IGNITE 26 exists to raise a generation of
							young people who don&rsquo;t just know about God, but who
							truly know Him — deeply, personally, powerfully. That&rsquo;s
							the generation God is raising, and we believe you&rsquo;re
							part of it.
						</p>
					</div>
				</motion.div>
			</section>

			{/* ─── What to Expect ─── */}
			<section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
				<div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
					<SectionHeader icon={Sparkles} title="What to Expect" index={0} />
					<p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
						Five full days, each designed to draw you closer to Christ and
						send you out stronger than you came.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{expectItems.map((item, i) => (
							<motion.div
								key={item.title}
								custom={i + 1}
								initial="hidden"
								animate="visible"
								variants={fadeUp}
								className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40"
							>
								<span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-orange/10 shrink-0">
									<item.icon size={18} className="text-brand-orange" />
								</span>
								<div>
									<h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">
										{item.title}
									</h4>
									<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
										{item.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ─── Event Details ─── */}
			<section className="max-w-4xl mx-auto px-4 sm:px-6 pb-10">
				<div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
					<SectionHeader icon={Calendar} title="Event Details" index={0} />
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
							<Calendar size={18} className="text-brand-orange shrink-0 mt-0.5" />
							<div>
								<p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Dates</p>
								<p className="text-sm font-semibold text-slate-800 dark:text-white">24 – 28 August</p>
							</div>
						</div>
						<div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
							<Clock size={18} className="text-brand-orange shrink-0 mt-0.5" />
							<div>
								<p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Day Sessions</p>
								<p className="text-sm font-semibold text-slate-800 dark:text-white">8:00 AM – 5:00 PM</p>
							</div>
						</div>
						<div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
							<Flame size={18} className="text-brand-orange shrink-0 mt-0.5" />
							<div>
								<p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Evening Revival</p>
								<p className="text-sm font-semibold text-slate-800 dark:text-white">7:00 PM – 8:30 PM</p>
							</div>
						</div>
					</div>
					<div className="flex items-start gap-3 p-4 mt-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
						<MapPin size={18} className="text-brand-orange shrink-0 mt-0.5" />
						<div>
							<p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Venue</p>
							<p className="text-sm font-semibold text-slate-800 dark:text-white">To be communicated</p>
						</div>
					</div>
				</div>
			</section>


			{/* ─── How to Register ─── */}
			<section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					className="relative overflow-hidden rounded-3xl border border-brand-orange/30 bg-linear-to-br from-brand-orange/8 via-amber-50/60 to-brand-orange/5 dark:from-brand-orange/10 dark:via-slate-900 dark:to-slate-900 dark:border-brand-orange/20 p-6 sm:p-8"
				>
					<div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
					<div className="relative">
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-widest mb-3">
							How to Register
						</div>
						<h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-5">
							Registration is Simple — and Free
						</h3>

						<div className="flex flex-col sm:flex-row gap-4">
							{/* QR */}
							<div className="flex items-center gap-4 flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 shadow-sm">
								<span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-orange/10 shrink-0">
									<QrCode size={22} className="text-brand-orange" />
								</span>
								<div>
									<p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">
										Scan to Register
									</p>
									<p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
										Scan the QR code on the IGNITE 26 event poster
									</p>
								</div>
							</div>
							<a href="mailto:media@gulubcc.org"
								className="flex items-center gap-4 flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 shadow-sm hover:border-brand-orange/40 transition-colors group"
							>
								<span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-orange/10 shrink-0">
									<Mail size={22} className="text-brand-orange" />
								</span>
								<div>
									<p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">
										Email Us
									</p>
									<p className="text-sm font-semibold text-brand-orange group-hover:underline">
										media@gulubcc.org
									</p>
								</div>
							</a>
						</div>
					</div>
				</motion.div>
			</section >

			<section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				>
					<h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
						You Were Not Born for an Ordinary Life
					</h3>
					<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mb-6">
						IGNITE 26 is not just a conference — it&rsquo;s an invitation to
						go deeper, grow stronger, and step into the calling God has
						placed on your life. We&rsquo;re believing God for something
						remarkable these five days. Come and be part of it.
					</p>
					<Link
						href="/events"
						className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-700 hover:border-brand-orange/40 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition-colors text-sm"
					>
						<ArrowLeft size={15} />
						Back to Events
					</Link>
				</motion.div>
			</section>

			<Footer />
		</main >
	)
}