"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	ArrowLeft,
	Calendar,
	MapPin,
	User,
	Church,
	BedDouble,
	Utensils,
	PhoneCall,
	MessageSquare,
	CheckCircle2,
	Send,
} from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
	// Personal
	fullName: string;
	gender: string;
	dateOfBirth: string;
	phone: string;
	email: string;
	physicalAddress: string;
	city: string;
	district: string;
	// Ministry
	ministryRole: string;
	ministryRoleOther: string;
	churchName: string;
	churchLocation: string;
	denomination: string;
	yearsInMinistry: string;
	// Conference
	registrationType: string;
	dayPassDay: string;
	hearAbout: string;
	hearAboutOther: string;
	// Accommodation
	requireAccommodation: string;
	numberOfNights: string;
	roommatePreference: string;
	// Emergency
	emergencyName: string;
	emergencyRelationship: string;
	emergencyPhone: string;
	// Additional
	hopingToGain: string;
	specialNeeds: string;
}

const initialForm: FormData = {
	fullName: "", gender: "", dateOfBirth: "", phone: "", email: "",
	physicalAddress: "", city: "", district: "",
	ministryRole: "", ministryRoleOther: "", churchName: "", churchLocation: "",
	denomination: "", yearsInMinistry: "",
	registrationType: "", dayPassDay: "", hearAbout: "", hearAboutOther: "",
	requireAccommodation: "", numberOfNights: "", roommatePreference: "",
	emergencyName: "", emergencyRelationship: "", emergencyPhone: "",
	hopingToGain: "", specialNeeds: "",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.07 },
	}),
};

// ─── Sub-components ───────────────────────────────────────────────────────────
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

function Field({ label, children, index }: { label: string; children: React.ReactNode; index: number }) {
	return (
		<motion.div custom={index} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col gap-1.5">
			<label className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</label>
			{children}
		</motion.div>
	);
}

const inputCls =
	"w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition text-sm";

const textareaCls =
	"w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition text-sm resize-none";

function RadioGroup({
	name,
	options,
	value,
	onChange,
}: {
	name: string;
	options: string[];
	value: string;
	onChange: (v: string) => void;
}) {
	return (
		<div className="flex flex-wrap gap-3">
			{options.map((opt) => (
				<label
					key={opt}
					className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition-all text-sm font-medium select-none ${value === opt
						? "border-brand-orange bg-brand-orange/10 text-brand-orange"
						: "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:border-brand-orange/40"
						}`}
				>
					<input
						type="radio"
						name={name}
						value={opt}
						checked={value === opt}
						onChange={() => onChange(opt)}
						className="sr-only"
					/>
					<span
						className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${value === opt ? "border-brand-orange" : "border-slate-300 dark:border-slate-600"
							}`}
					>
						{value === opt && <span className="w-2 h-2 rounded-full bg-brand-orange" />}
					</span>
					{opt}
				</label>
			))}
		</div>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function YoungPastorsConferencePage() {
	const [form, setForm] = useState<FormData>(initialForm);
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [eventImage, setEventImage] = useState<string | null>(null);
	const [eventDescription, setEventDescription] = useState<string | null>(null);

	useEffect(() => {
		const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
		fetch(`${apiBase}/events`)
			.then((r) => r.json())
			.then((data) => {
				const list: Array<{ title: string; image: string; description: string }> =
					Array.isArray(data) ? data : data?.data ?? data?.events ?? [];
				const match = list.find((e) =>
					e.title.toLowerCase().includes("young pastors")
				);
				if (match) {
					if (match.image) setEventImage(match.image);
					if (match.description) setEventDescription(match.description);
				}
			})
			.catch(() => { }); // silently ignore — image/desc are decorative
	}, []);

	const set = (key: keyof FormData) => (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => setForm((f) => ({ ...f, [key]: e.target.value }));

	const setRadio = (key: keyof FormData) => (v: string) =>
		setForm((f) => ({ ...f, [key]: v }));

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitError(null);

		const payload = {
			// Personal
			fullName: form.fullName,
			gender: form.gender.toLowerCase(), // API expects lowercase enum: "male" | "female"
			dateOfBirth: form.dateOfBirth,
			phone: form.phone,
			email: form.email,
			physicalAddress: form.physicalAddress,
			city: form.city,
			district: form.district,
			// Ministry
			ministryRole: form.ministryRole === "Other" ? form.ministryRoleOther : form.ministryRole,
			churchName: form.churchName,
			churchLocation: form.churchLocation,
			denomination: form.denomination,
			yearsInMinistry: form.yearsInMinistry,
			// Conference
			registrationType: form.registrationType,
			dayPassDay: form.registrationType === "Day Pass" ? form.dayPassDay : undefined,
			hearAbout: form.hearAbout === "Other" ? form.hearAboutOther : form.hearAbout,
			// Accommodation — send the enum string the API expects ("Yes" | "No")
			requireAccommodation: form.requireAccommodation,
			numberOfNights: form.requireAccommodation === "Yes" ? form.numberOfNights : undefined,
			roommatePreference: form.requireAccommodation === "Yes" ? form.roommatePreference : undefined,
			// Emergency — field names must match API exactly
			emergencyName: form.emergencyName,
			emergencyRelationship: form.emergencyRelationship,
			emergencyPhone: form.emergencyPhone,
			// Additional
			hopingToGain: form.hopingToGain,
			specialNeeds: form.specialNeeds,
			// Meta
			conferenceName: "Young Pastors & Leaders Conference 2026",
		};

		try {
			const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
			const res = await fetch(`${apiBase}/conference-records`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err?.message || `Server error (${res.status}). Please try again.`);
			}

			setSubmitted(true);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch (err) {
			setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	// ── Success Screen ──
	if (submitted) {
		return (
			<main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
				<Navbar />
				<div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.85 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
						className="max-w-md"
					>
						<div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
							<CheckCircle2 className="w-12 h-12 text-green-500" />
						</div>
						<h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
							Registration Received!
						</h1>
						<p className="text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
							Thank you, <span className="font-bold text-brand-orange">{form.fullName || "registrant"}</span>. Your registration for the{" "}
							<span className="font-semibold text-slate-700 dark:text-slate-200">Young Pastors &amp; Leaders Conference 2026</span> has been submitted.
						</p>
						<p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-sm">
							We will be in touch with further details. See you May 13–15, 2026 at Gulu Bible Community Church!
						</p>
						<Link
							href="/events"
							className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-xl transition-colors shadow-lg shadow-brand-orange/20"
						>
							<ArrowLeft size={16} />
							Back to Events
						</Link>
					</motion.div>
				</div>
				<Footer />
			</main>
		);
	}

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
							Conference Registration
						</div>

						<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] mb-4">
							Young Pastors &amp;{" "}
							<span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange via-amber-400 to-brand-orange">
								Leaders Conference
							</span>
						</h1>

						<p className="text-white/60 text-lg font-medium mb-6">
							2026 Edition
						</p>

						<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
							<span className="flex items-center gap-1.5">
								<Calendar size={14} className="text-brand-orange" />
								May 13–15, 2026
							</span>
							<span className="text-white/20">|</span>
							<span className="flex items-center gap-1.5">
								<MapPin size={14} className="text-brand-orange" />
								Gulu Bible Community Church
							</span>
						</div>
					</motion.div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-b from-transparent to-slate-50 dark:to-[#020617] pointer-events-none" />
			</section>
			{/* ─── Event Info ─── */}
			<section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
				<motion.div
					initial={{ opacity: 0, y: 28 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
					className="flex flex-col md:flex-row gap-8 md:gap-10 items-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
				>
					{/* Image */}
					<div className="relative w-full md:w-85 lg:w-95 shrink-0 h-60 md:h-auto md:self-stretch">
						{eventImage ? (
							<Image
								src={eventImage}
								alt="Young Pastors & Leaders Conference"
								fill
								className="object-cover"
							/>
						) : (
							<div className="w-full h-full min-h-60 flex flex-col items-center justify-center bg-linear-to-br from-brand-orange/10 via-amber-50 to-brand-blue/10 dark:from-slate-800 dark:to-slate-900">
								<Calendar className="w-14 h-14 text-brand-orange/40 mb-2" />
								<span className="text-xs font-semibold text-slate-400">Conference Image</span>
							</div>
						)}
					</div>

					{/* Message */}
					<div className="flex-1 px-6 py-8 md:py-10 md:pr-10">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-widest mb-4">
							May 13–15, 2026
						</div>
						<h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-3">
							You&rsquo;re Invited to Be Part of Something Transformational
						</h2>
						{eventDescription ? (
							<p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px] mb-5">
								{eventDescription}
							</p>
						) : (
							<p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px] mb-5">
								Join pastors and ministry leaders from across the region for three days of powerful teaching, worship, fellowship, and equipping. This conference is designed to strengthen your faith, sharpen your leadership, and connect you with a community of kingdom-minded leaders.
							</p>
						)}
						<div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
							<span className="flex items-center gap-1.5">
								<Calendar size={14} className="text-brand-orange shrink-0" />
								May 13–15, 2026
							</span>
							<span className="flex items-center gap-1.5">
								<MapPin size={14} className="text-brand-orange shrink-0" />
								Gulu Bible Community Church
							</span>
						</div>
					</div>
				</motion.div>
			</section>
			{/* ─── Form ─── */}
			<section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
				<form onSubmit={handleSubmit} noValidate className="space-y-10">

					{/* ── 1. Personal Information ── */}
					<div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
						<SectionHeader icon={User} title="Personal Information" index={0} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
							<Field label="Full Name *" index={1}>
								<input required className={inputCls} placeholder="Enter your full name" value={form.fullName} onChange={set("fullName")} />
							</Field>

							<Field label="Date of Birth *" index={2}>
								<input required type="date" className={inputCls} value={form.dateOfBirth} onChange={set("dateOfBirth")} />
							</Field>

							<Field label="Gender *" index={3}>
								<div className="pt-1">
									<RadioGroup name="gender" options={["Male", "Female"]} value={form.gender} onChange={setRadio("gender")} />
								</div>
							</Field>

							<Field label="Phone Number *" index={4}>
								<input required type="tel" className={inputCls} placeholder="+256 700 000 000" value={form.phone} onChange={set("phone")} />
							</Field>

							<Field label="Email Address" index={5}>
								<input type="email" className={inputCls} placeholder="you@example.com" value={form.email} onChange={set("email")} />
							</Field>

							<Field label="Physical Address" index={6}>
								<input className={inputCls} placeholder="Street / Village / P.O. Box" value={form.physicalAddress} onChange={set("physicalAddress")} />
							</Field>

							<Field label="City / Town" index={7}>
								<input className={inputCls} placeholder="e.g. Gulu" value={form.city} onChange={set("city")} />
							</Field>

							<Field label="District" index={8}>
								<input className={inputCls} placeholder="e.g. Gulu District" value={form.district} onChange={set("district")} />
							</Field>
						</div>
					</div>

					{/* ── 2. Ministry Information ── */}
					<div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
						<SectionHeader icon={Church} title="Ministry Information" index={9} />
						<div className="space-y-5">
							<Field label="Current Ministry Role *" index={10}>
								<RadioGroup
									name="ministryRole"
									options={["Pastor", "Assistant Pastor", "Youth Leader", "Church Leader", "Ministry Worker", "Other"]}
									value={form.ministryRole}
									onChange={setRadio("ministryRole")}
								/>
								{form.ministryRole === "Other" && (
									<input className={`${inputCls} mt-3`} placeholder="Please specify your role" value={form.ministryRoleOther} onChange={set("ministryRoleOther")} />
								)}
							</Field>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<Field label="Church / Ministry Name *" index={11}>
									<input required className={inputCls} placeholder="Name of your church or ministry" value={form.churchName} onChange={set("churchName")} />
								</Field>

								<Field label="Church Location" index={12}>
									<input className={inputCls} placeholder="Town / City where your church is located" value={form.churchLocation} onChange={set("churchLocation")} />
								</Field>

								<Field label="Denomination / Affiliation" index={13}>
									<input className={inputCls} placeholder="e.g. Pentecostal, Baptist, Non-denominational" value={form.denomination} onChange={set("denomination")} />
								</Field>

								<Field label="Years in Ministry" index={14}>
									<input type="number" min="0" className={inputCls} placeholder="e.g. 5" value={form.yearsInMinistry} onChange={set("yearsInMinistry")} />
								</Field>
							</div>
						</div>
					</div>

					{/* ── 3. Conference Details ── */}
					<div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
						<SectionHeader icon={Calendar} title="Conference Details" index={15} />
						<div className="space-y-5">
							<Field label="Registration Type *" index={16}>
								<RadioGroup
									name="registrationType"
									options={["Full Conference (3 Days)", "Day Pass"]}
									value={form.registrationType}
									onChange={setRadio("registrationType")}
								/>
								{form.registrationType === "Day Pass" && (
									<input
										className={`${inputCls} mt-3`}
										placeholder="Specify which day (e.g. May 13, May 14, or May 15)"
										value={form.dayPassDay}
										onChange={set("dayPassDay")}
									/>
								)}
							</Field>

							<Field label="How did you hear about this conference?" index={17}>
								<RadioGroup
									name="hearAbout"
									options={["Church Announcement", "Social Media", "Friend / Colleague", "Website", "Other"]}
									value={form.hearAbout}
									onChange={setRadio("hearAbout")}
								/>
								{form.hearAbout === "Other" && (
									<input className={`${inputCls} mt-3`} placeholder="Please specify" value={form.hearAboutOther} onChange={set("hearAboutOther")} />
								)}
							</Field>
						</div>
					</div>

					{/* ── 4. Accommodation ── */}
					<div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
						<SectionHeader icon={BedDouble} title="Accommodation (if needed)" index={18} />
						<div className="space-y-5">
							<Field label="Do you require accommodation?" index={19}>
								<RadioGroup name="requireAccommodation" options={["Yes", "No"]} value={form.requireAccommodation} onChange={setRadio("requireAccommodation")} />
							</Field>

							{form.requireAccommodation === "Yes" && (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									<Field label="Number of Nights" index={20}>
										<input type="number" min="1" max="5" className={inputCls} placeholder="e.g. 2" value={form.numberOfNights} onChange={set("numberOfNights")} />
									</Field>

									<Field label="Roommate Preference (optional)" index={21}>
										<input className={inputCls} placeholder="Name of preferred roommate, if any" value={form.roommatePreference} onChange={set("roommatePreference")} />
									</Field>
								</div>
							)}
						</div>
					</div>

					{/* ── 6. Emergency Contact ── */}
					<div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
						<SectionHeader icon={PhoneCall} title="Emergency Contact" index={25} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
							<Field label="Emergency Contact Name *" index={26}>
								<input required className={inputCls} placeholder="Full name" value={form.emergencyName} onChange={set("emergencyName")} />
							</Field>

							<Field label="Relationship *" index={27}>
								<input required className={inputCls} placeholder="e.g. Spouse, Parent, Sibling" value={form.emergencyRelationship} onChange={set("emergencyRelationship")} />
							</Field>

							<Field label="Phone Number *" index={28}>
								<input required type="tel" className={inputCls} placeholder="+256 700 000 000" value={form.emergencyPhone} onChange={set("emergencyPhone")} />
							</Field>
						</div>
					</div>

					{/* ── 7. Additional Information ── */}
					<div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
						<SectionHeader icon={MessageSquare} title="Additional Information" index={29} />
						<div className="space-y-5">
							<Field label="What are you hoping to gain from this conference?" index={30}>
								<textarea
									rows={4}
									className={textareaCls}
									placeholder="Share your expectations and goals for attending…"
									value={form.hopingToGain}
									onChange={set("hopingToGain")}
								/>
							</Field>

							<Field label="Any special needs or requests?" index={31}>
								<textarea
									rows={3}
									className={textareaCls}
									placeholder="Let us know if there is anything we can do to better serve you…"
									value={form.specialNeeds}
									onChange={set("specialNeeds")}
								/>
							</Field>
						</div>
					</div>

					{/* ── Submit ── */}
					<motion.div
						custom={32}
						initial="hidden"
						animate="visible"
						variants={fadeUp}
						className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"
					>
						<div className="flex flex-col gap-2">
							<p className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
								Fields marked <span className="text-brand-orange font-bold">*</span> are required. By submitting, you agree to be contacted by GBCC regarding the conference.
							</p>
							{submitError && (
								<p className="text-sm text-red-500 font-medium text-center sm:text-left">
									{submitError}
								</p>
							)}
						</div>
						<button
							type="submit"
							disabled={isSubmitting}
							className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-brand-orange hover:bg-brand-orange/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold rounded-2xl transition-all shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 hover:scale-[1.02] active:scale-[0.98] text-sm"
						>
							{isSubmitting ? (
								<>
									<svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
									</svg>
									Submitting…
								</>
							) : (
								<>
									<Send size={15} />
									Submit Registration
								</>
							)}
						</button>
					</motion.div>
				</form>
			</section>

			<Footer />
		</main>
	);
}
