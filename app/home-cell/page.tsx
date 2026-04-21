"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Send, CheckCircle2, Heart, BookOpen, HandHeart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HomeCellPage() {
	const [formData, setFormData] = useState({
		fullName: "",
		phoneNumber: "",
		email: "",
		preferredCell: "",
		additionalNotes: "",
	});
	const [status, setStatus] = useState({ type: "", message: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus({ type: "", message: "" });

		if (!formData.fullName || !formData.phoneNumber || !formData.email) {
			setStatus({ type: "error", message: "Please fill in all required fields." });
			return;
		}

		setIsSubmitting(true);

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";

			const res = await fetch(`${apiUrl}/home-cells`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fullName: formData.fullName,
					phoneNumber: formData.phoneNumber,
					email: formData.email,
					...(formData.preferredCell && { preferredCell: formData.preferredCell }),
					...(formData.additionalNotes && { additionalNotes: formData.additionalNotes }),
				}),
			});

			if (!res.ok) throw new Error("Registration failed");

			setStatus({
				type: "success",
				message: "Registration successful! We will be in touch with you soon.",
			});
			setFormData({ fullName: "", phoneNumber: "", email: "", preferredCell: "", additionalNotes: "" });
		} catch {
			setStatus({
				type: "error",
				message: "Something went wrong. Please try again later.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	return (
		<main className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#020617]">
			<Navbar />

			{/* Hero Section */}
			<section className="relative pt-40 pb-36 px-6 overflow-hidden bg-slate-950">
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] bg-brand-orange/20 rounded-full blur-[150px] opacity-70" />
					<div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-blue/30 rounded-full blur-[120px] opacity-60" />
				</div>

				<div className="relative z-10 w-full max-w-7xl mx-auto text-center">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={staggerContainer}
						className="max-w-3xl mx-auto mb-10"
					>
						<motion.div
							variants={fadeIn}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white font-bold text-xs mb-8 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20"
						>
							<Users size={16} className="text-brand-orange" />
							<span>Join a Home Cell near you</span>
						</motion.div>

						<motion.h1
							variants={fadeIn}
							className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] mb-4"
						>
							Home Cell{" "}
							<span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-brand-blue">
								Registration
							</span>
						</motion.h1>

						<motion.p
							variants={fadeIn}
							className="text-lg text-white/60 font-medium mb-6 leading-relaxed"
						>
							Home Cells are small, intimate groups where we grow together in
							faith, fellowship, and the Word of God. Register below to join or
							start a Home Cell near you.
						</motion.p>
					</motion.div>
				</div>

				<div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-50 dark:from-[#020617] to-transparent pointer-events-none" />
			</section>

			{/* What is a Home Cell Section */}
			<section className="py-20 px-6 w-full max-w-7xl mx-auto">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					variants={staggerContainer}
					className="text-center mb-14"
				>
					<motion.div
						variants={fadeIn}
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-widest mb-4"
					>
						<Users size={15} />
						<span>Community &amp; Connection</span>
					</motion.div>
					<motion.h2
						variants={fadeIn}
						className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5"
					>
						What is a{" "}
						<span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-brand-blue">
							Home Cell?
						</span>
					</motion.h2>
					<motion.p
						variants={fadeIn}
						className="text-sm text-foreground/60 max-w-2xl mx-auto leading-relaxed"
					>
						A Home Cell is a small group of believers who intentionally choose to
						do life together — growing in faith, love, and community.
					</motion.p>
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.15 }}
					variants={staggerContainer}
					className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
				>
					{/* Pillar 1 */}
					<motion.div
						variants={fadeIn}
						className="group relative overflow-hidden p-8 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
						<div className="w-14 h-14 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
							<Heart size={28} />
						</div>
						<h3 className="text-lg font-extrabold text-slate-800 dark:text-white mb-3">Doing Life Together</h3>
						<p className="text-sm text-foreground/65 leading-relaxed">
							Home Cells are built on genuine relationships. We connect with one
							another in everyday life — sharing joys, burdens, and the journey
							of faith side by side.
						</p>
					</motion.div>

					{/* Pillar 2 */}
					<motion.div
						variants={fadeIn}
						className="group relative overflow-hidden p-8 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
						<div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
							<BookOpen size={28} />
						</div>
						<h3 className="text-lg font-extrabold text-slate-800 dark:text-white mb-3">Fellowship &amp; The Word</h3>
						<p className="text-sm text-foreground/65 leading-relaxed">
							We gather regularly for fellowship, prayer, and digging deep into
							the Word of God — growing in our understanding and love for
							Scripture together.
						</p>
					</motion.div>

					{/* Pillar 3 */}
					<motion.div
						variants={fadeIn}
						className="group relative overflow-hidden p-8 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
						<div className="w-14 h-14 rounded-2xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
							<HandHeart size={28} />
						</div>
						<h3 className="text-lg font-extrabold text-slate-800 dark:text-white mb-3">Supporting One Another</h3>
						<p className="text-sm text-foreground/65 leading-relaxed">
							As members of the same cell, we carry each other's burdens,
							celebrate wins together, and ensure no one walks alone through
							the challenges of life.
						</p>
					</motion.div>
				</motion.div>
			</section>

			{/* Registration Form Section */}
			<section className="pb-24 px-6 relative z-10 w-full max-w-3xl mx-auto mt-10">
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.3 }}
					className="relative -mt-12 md:-mt-20"
				>
					{/* Decorative background */}
					<div className="absolute inset-0 bg-linear-to-br from-brand-orange/10 to-brand-blue/10 rounded-[48px] transform rotate-1 scale-[1.02] -z-10" />

					<div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-8 md:p-12 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 relative overflow-hidden">
						<div className="absolute -top-12.5 -right-12.5 w-37.5 h-37.5 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

						<div className="mb-8 sm:mb-10 relative z-10">
							<h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
								New Member Registration
							</h2>
							<p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-sm">
								Fill in the form below and our team will reach out to you.
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5 relative z-10">
							{/* Status Message */}
							{status.message && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className={`flex items-start gap-3 p-4 rounded-2xl text-sm font-bold shadow-sm ${status.type === "success"
										? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
										: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
										}`}
								>
									{status.type === "success" && (
										<CheckCircle2 size={18} className="shrink-0 mt-0.5" />
									)}
									{status.message}
								</motion.div>
							)}

							{/* Full Name */}
							<div className="space-y-2">
								<label
									htmlFor="fullName"
									className="block text-sm font-bold text-foreground/80 tracking-wide"
								>
									Full Name <span className="text-brand-orange">*</span>
								</label>
								<input
									type="text"
									id="fullName"
									name="fullName"
									value={formData.fullName}
									onChange={handleChange}
									placeholder="e.g. John Okello"
									required
									className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition text-sm"
								/>
							</div>

							{/* Phone Number */}
							<div className="space-y-2">
								<label
									htmlFor="phoneNumber"
									className="block text-sm font-bold text-foreground/80 tracking-wide"
								>
									Phone Number <span className="text-brand-orange">*</span>
								</label>
								<input
									type="tel"
									id="phoneNumber"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									placeholder="e.g. +256 772 000 000"
									required
									className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition text-sm"
								/>
							</div>

							{/* Email */}
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="block text-sm font-bold text-foreground/80 tracking-wide"
								>
									Email Address <span className="text-brand-orange">*</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="e.g. john@example.com"
									required
									className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition text-sm"
								/>
							</div>
							{/* Preferred Cell */}
							<div className="space-y-2">
								<label
									htmlFor="preferredCell"
									className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1"
								>
									Preferred Cell Group <span className="text-foreground/30">(optional)</span>
								</label>
								<input
									type="text"
									id="preferredCell"
									name="preferredCell"
									value={formData.preferredCell}
									onChange={handleChange}
									placeholder="e.g. Downtown group"
									className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition text-sm"
								/>
							</div>

							{/* Additional Notes */}
							<div className="space-y-2">
								<label
									htmlFor="additionalNotes"
									className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1"
								>
									Additional Notes <span className="text-foreground/30">(optional)</span>
								</label>
								<textarea
									id="additionalNotes"
									name="additionalNotes"
									value={formData.additionalNotes}
									onChange={handleChange}
									rows={3}
									placeholder="e.g. I would like to join a group near Kampala"
									className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition text-sm resize-none"
								/>
							</div>
							{/* Submit Button */}
							<button
								type="submit"
								disabled={isSubmitting}
								className="shrink-0 inline-flex items-center justify-center gap-2 w-full px-8 py-3.5 bg-brand-orange hover:bg-brand-orange/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold rounded-2xl transition-all shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 hover:scale-[1.02] active:scale-[0.98] text-sm"
							>
								{isSubmitting ? (
									<>
										<svg
											className="animate-spin h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											/>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
											/>
										</svg>
										Submitting...
									</>
								) : (
									<>
										<Send size={18} />
										Register Now
									</>
								)}
							</button>
						</form>
					</div>
				</motion.div>
			</section>

			<Footer />
		</main>
	);
}
