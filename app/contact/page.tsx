"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, MessageCircle, ArrowRight, Facebook, Twitter, Instagram, Youtube, Music } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// shared input styles (colors unchanged: slate base, brand-orange / brand-blue focus)
const inputBase =
	"w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 outline-none transition-all placeholder:text-slate-400 text-sm sm:text-base";
const focusOrange = "focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange";
const focusBlue = "focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue";

// shared card styles for the info cards
const infoCard =
	"group relative overflow-hidden p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300";

const Label = ({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) => (
	<label htmlFor={htmlFor} className="block text-sm sm:text-base font-medium text-foreground/70 mb-1.5">
		{children}
		{required && <span className="text-brand-orange ml-0.5" aria-hidden>*</span>}
	</label>
);

export default function ContactPage() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		subject: "",
		message: ""
	});
	const [status, setStatus] = useState({ type: '', message: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus({ type: '', message: '' });

		if (!formData.firstName || !formData.email || !formData.subject || !formData.message) {
			setStatus({ type: 'error', message: 'Please fill in all required fields.' });
			return;
		}

		setIsSubmitting(true);

		try {
			// Change 'http://localhost:3000' to your actual NestJS backend url in production (e.g., process.env.NEXT_PUBLIC_API_URL)
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005/api/v1';
			
			const res = await fetch(`${apiUrl}/contact`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: `${formData.firstName} ${formData.lastName}`.trim(),
					email: formData.email,
					subject: formData.subject,
					message: formData.message,
				}),
			});

			if (!res.ok) {
				throw new Error('Failed to send message');
			}

			setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
			setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
		} catch (error) {
			setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
		} finally {
			setIsSubmitting(false);
		}
	};

	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	return (
		<main className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#020617]">
			<Navbar />

			{/* Hero Section */}
			<section className="relative pt-36 pb-28 px-6 overflow-hidden bg-slate-950">
				{/* Dark background base for white navbar to be visible */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] bg-brand-orange/20 rounded-full blur-[150px] opacity-70" />
					<div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-blue/30 rounded-full blur-[120px] opacity-60" />
				</div>

				<div className="relative z-10 w-full max-w-7xl mx-auto text-center">
					<motion.div 
						initial="hidden"
						animate="visible"
						variants={staggerContainer}
						className="max-w-2xl mx-auto"
					>
						<motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 text-white font-medium text-xs sm:text-sm mb-6 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20">
							<MessageCircle size={14} className="text-brand-orange" />
							<span>We&apos;d love to hear from you</span>
						</motion.div>
						<motion.h1 variants={fadeIn} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
							Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">Touch</span>
						</motion.h1>
						<motion.p variants={fadeIn} className="text-sm sm:text-base text-white/70 leading-relaxed">
							Have questions? Want to learn more about our ministries? Our team is here to help and pray with you. Reach out through any of the channels below.
						</motion.p>
					</motion.div>
				</div>
                
				{/* Bottom decorative mask to blend into the next section smoothly */}
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-[#020617] to-transparent pointer-events-none"></div>
			</section>

			<section className="pb-24 px-6 relative z-10 w-full max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start -mt-12 md:-mt-16 lg:-mt-20">
					{/* Contact Info */}
					<motion.div 
						initial="hidden"
						animate="visible"
						variants={staggerContainer}
						className="lg:col-span-5 space-y-5"
					>
						{/* Visit */}
						<motion.div variants={fadeIn} className={infoCard}>
							<div className="absolute top-0 right-0 w-28 h-28 bg-brand-orange/5 rounded-bl-[80px] -z-10 transition-transform group-hover:scale-110" />
							<div className="w-11 h-11 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
								<MapPin size={22} />
							</div>
							<h3 className="text-lg font-semibold mb-2">Visit Us</h3>
							<p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-4">Plot 1450 Airfield Road<br/>Gulu City, Uganda</p>
							<a
								href="https://maps.google.com/?q=GULU+BIBLE+COMMUNITY+CHURCH,+Airfield+Road,+Gulu"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-brand-orange font-semibold text-sm sm:text-base hover:gap-3 transition-all"
							>
								Get Directions <ArrowRight size={16} />
							</a>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
							{/* Call */}
							<motion.div variants={fadeIn} className={infoCard}>
								<div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-bl-[70px] -z-10 transition-transform group-hover:scale-110" />
								<div className="flex items-start justify-between gap-3">
									<div>
										<div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
											<Phone size={20} />
										</div>
										<h3 className="text-lg font-semibold mb-2">Call Us</h3>
										<a href="tel:+256772449291" className="text-foreground/70 text-sm sm:text-base hover:text-brand-orange transition-colors">
											+256 772 44 9291
										</a>
									</div>
									<div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-2 rounded-xl flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-sm">
										<MessageCircle size={18} />
										<span className="text-[10px] font-semibold mt-1">WhatsApp</span>
									</div>
								</div>
							</motion.div>

							{/* Email */}
							<motion.div variants={fadeIn} className={infoCard}>
								<div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-bl-[70px] -z-10 transition-transform group-hover:scale-110" />
								<div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
									<Mail size={20} />
								</div>
								<h3 className="text-lg font-semibold mb-2">Email Us</h3>
								<div className="space-y-2">
									
									<a href="mailto:media@gulubcc.org" className="flex items-center gap-2 text-foreground/70 text-sm sm:text-base hover:text-brand-orange transition-colors break-all">
										<div className="w-1.5 h-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-brand-orange transition-colors" />
										media@gulubcc.org
									</a>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.3 }}
						className="lg:col-span-7 relative"
					>
						{/* Decorative background for the form */}
						<div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 rounded-[2rem] transform rotate-1 scale-[1.02] -z-10" />
						
						<div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 relative overflow-hidden">
							{/* Form decorative blob */}
							<div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

							<div className="mb-7 relative z-10">
								<h2 className="text-2xl sm:text-3xl font-bold mb-1.5">Send a Message</h2>
								<p className="text-foreground/60 text-sm sm:text-base">We typically reply within 24 hours.</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-5 relative z-10">
								{status.message && (
									<motion.div
										role="status"
										aria-live="polite"
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className={`p-3.5 rounded-xl text-sm sm:text-base font-medium shadow-sm ${status.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}
									>
										{status.message}
									</motion.div>
								)}

								<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
									<div>
										<Label htmlFor="firstName" required>First name</Label>
										<input
											id="firstName"
											type="text"
											name="firstName"
											autoComplete="given-name"
											value={formData.firstName}
											onChange={handleChange}
											className={`${inputBase} ${focusOrange}`}
											placeholder="John"
										/>
									</div>
									<div>
										<Label htmlFor="lastName">Last name</Label>
										<input
											id="lastName"
											type="text"
											name="lastName"
											autoComplete="family-name"
											value={formData.lastName}
											onChange={handleChange}
											className={`${inputBase} ${focusOrange}`}
											placeholder="Doe"
										/>
									</div>
								</div>

								<div>
									<Label htmlFor="email" required>Email address</Label>
									<input
										id="email"
										type="email"
										name="email"
										autoComplete="email"
										value={formData.email}
										onChange={handleChange}
										className={`${inputBase} ${focusBlue}`}
										placeholder="john@example.com"
									/>
								</div>

								<div>
									<Label htmlFor="subject" required>Subject</Label>
									<input
										id="subject"
										type="text"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										className={`${inputBase} ${focusOrange}`}
										placeholder="e.g. Prayer Request, General Inquiry"
									/>
								</div>

								<div>
									<Label htmlFor="message" required>Message</Label>
									<textarea
										id="message"
										rows={5}
										name="message"
										value={formData.message}
										onChange={handleChange}
										className={`${inputBase} ${focusOrange} resize-none`}
										placeholder="How can we help you?"
									></textarea>
								</div>

								<button
									disabled={isSubmitting}
									type="submit"
									className="w-full group bg-brand-orange hover:bg-brand-orange/90 text-white py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-brand-orange/25 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
								>
									{isSubmitting ? (
										<span className="flex items-center gap-2">
											<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											Sending...
										</span>
									) : (
										<>
											<span>Send Message</span>
											<Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
										</>
									)}
								</button>
							</form>
						</div>
					</motion.div>
				</div>

				{/* Social Connect & Map Section */}
				<motion.div 
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={staggerContainer}
					className="mt-24 pt-14 border-t border-slate-200 dark:border-slate-800"
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div variants={fadeIn} className="space-y-5 text-center lg:text-left">
							<h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Connect With Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">Online</span></h3>
							<p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
								Connect with us online by following us on Facebook, X, Instagram, YouTube, TikTok and WhatsApp. Whatever you choose to do, know that we love you and want to welcome you to the family.
							</p>
							<div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
								{[
									{ name: 'Facebook', url: 'https://www.facebook.com/Gulu.Bible.Community.Church', icon: <Facebook size={16} /> },
									{ name: 'X', url: 'https://x.com/gulubible', icon: <Twitter size={16} /> },
									{ name: 'Instagram', url: 'https://instagram.com/', icon: <Instagram size={16} /> },
									{ name: 'YouTube', url: 'https://www.youtube.com/@gulubiblecommunitychurch', icon: <Youtube size={16} /> },
									{ name: 'TikTok', url: 'https://www.tiktok.com/@gulubiblecommunitychurch', icon: <Music size={16} /> },
									{ name: 'WhatsApp', url: 'https://whatsapp.com/channel/0029VbAxEFIBlHplGKitLd0l', icon: <MessageCircle size={16} /> }
								].map((platform) => (
									<a 
										href={platform.url} 
										target="_blank" 
										rel="noopener noreferrer" 
										key={platform.name} 
										className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-brand-orange transition-all text-sm font-semibold text-foreground/80 hover:text-brand-orange cursor-pointer hover:-translate-y-1 flex items-center gap-2"
									>
										{platform.icon}
										{platform.name}
									</a>
								))}
							</div>
						</motion.div>
						<motion.div variants={fadeIn} className="relative h-[380px] sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group">
							<div className="absolute inset-0 bg-brand-orange/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10" />
							<iframe 
								title="Gulu Bible Community Church on the map"
								src="https://maps.google.com/maps?q=GULU+BIBLE+COMMUNITY+CHURCH,+Airfield+Road,+Gulu&t=&z=15&ie=UTF8&iwloc=&output=embed" 
								className="absolute inset-0 w-full h-full border-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
								allowFullScreen={true} 
								loading="lazy" 
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>
						</motion.div>
					</div>
				</motion.div>
			</section>

			<Footer />
		</main>
	);
}