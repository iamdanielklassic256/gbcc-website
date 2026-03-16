"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, MessageCircle, ArrowRight, Facebook, Twitter, Instagram, Youtube, Music } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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
			<section className="relative pt-40 pb-36 px-6 overflow-hidden bg-slate-950">
				{/* Dark background base for white navbar to be visible */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] bg-brand-orange/20 rounded-full blur-[150px] opacity-70" />
					<div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-blue/30 rounded-full blur-[120px] opacity-60" />
					<div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
				</div>

				<div className="relative z-10 w-full max-w-7xl mx-auto text-center">
					<motion.div 
						initial="hidden"
						animate="visible"
						variants={staggerContainer}
						className="max-w-3xl mx-auto mb-10"
					>
						<motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white font-bold text-sm mb-8 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20">
							<MessageCircle size={16} className="text-brand-orange" />
							<span>We'd love to hear from you</span>
						</motion.div>
						<motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 text-white min-h-[1.2em]">
							Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">Touch</span>
						</motion.h1>
						<motion.p variants={fadeIn} className="text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed font-medium px-4 sm:px-0">
							Have questions? Want to learn more about our ministries? Our team is here to help and pray with you. Reach out through any of the channels below.
						</motion.p>
					</motion.div>
				</div>
                
				{/* Bottom decorative mask to blend into the next section smoothly */}
				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-[#020617] to-transparent pointer-events-none"></div>
			</section>

			<section className="pb-24 px-6 relative z-10 w-full max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start -mt-8 md:-mt-16 lg:-mt-24">
					{/* Contact Info */}
					<motion.div 
						initial="hidden"
						animate="visible"
						variants={staggerContainer}
						className="lg:col-span-5 space-y-6"
					>
						<motion.div variants={fadeIn} className="group relative overflow-hidden p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
							<div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
							<div className="w-16 h-16 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<MapPin size={32} />
							</div>
							<h3 className="text-xl sm:text-2xl font-bold mb-3">Visit Us</h3>
							<p className="text-foreground/70 text-base sm:text-lg leading-relaxed mb-6">Plot 1450 Airfield Road<br/>Gulu City, Uganda</p>
							<a href="#" className="inline-flex items-center gap-2 text-brand-orange font-bold text-sm sm:text-base hover:gap-3 transition-all relative">
								Get Directions <ArrowRight size={18} />
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full"></span>
							</a>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
							<motion.div variants={fadeIn} className="group relative overflow-hidden p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
								<div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-bl-[80px] -z-10 transition-transform group-hover:scale-110" />
								<div className="flex items-start justify-between">
									<div>
										<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
											<Phone size={20} className="sm:w-6 sm:h-6" />
										</div>
										<h3 className="text-lg sm:text-xl font-bold mb-2">Call Us</h3>
										<p className="text-foreground/70 text-base sm:text-lg">+256 772 44 9291</p>
									</div>
									<div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2 sm:p-3 rounded-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-sm">
										<MessageCircle size={20} className="sm:w-6 sm:h-6" />
										<span className="text-[9px] sm:text-[10px] font-bold mt-1 uppercase tracking-wider">WhatsApp</span>
									</div>
								</div>
							</motion.div>

							<motion.div variants={fadeIn} className="group relative overflow-hidden p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
								<div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-bl-[80px] -z-10 transition-transform group-hover:scale-110" />
								<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
									<Mail size={20} className="sm:w-6 sm:h-6" />
								</div>
								<h3 className="text-lg sm:text-xl font-bold mb-2">Email Us</h3>
								<div className="space-y-2">
									<a href="mailto:administrator@gulubcc.org" className="flex items-center gap-2 text-foreground/70 text-sm sm:text-base hover:text-brand-orange transition-colors">
										<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-brand-orange transition-colors" />
										administrator@gulubcc.org
									</a>
									<a href="mailto:media@gulubcc.org" className="flex items-center gap-2 text-foreground/70 text-sm sm:text-base hover:text-brand-orange transition-colors">
										<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-brand-orange transition-colors" />
										media@gulubcc.org
									</a>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
						className="lg:col-span-7 relative"
					>
						{/* Decorative background for the form */}
						<div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 rounded-[48px] transform rotate-2 scale-[1.02] -z-10" />
						
						<div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-8 md:p-12 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 relative overflow-hidden">
							{/* Form decorative blob */}
							<div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

							<div className="mb-8 sm:mb-10 relative z-10">
								<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3">Send a Message</h2>
								<p className="text-foreground/60 text-base sm:text-lg">We typically reply within 24 hours.</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
								{status.message && (
									<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl sm:rounded-2xl text-sm font-bold shadow-sm ${status.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
										{status.message}
									</motion.div>
								)}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
									<div className="space-y-1.5 sm:space-y-2">
										<label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1">First Name</label>
										<input 
											type="text" 
											name="firstName"
											value={formData.firstName}
											onChange={handleChange}
											className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all placeholder:text-slate-400 text-sm sm:text-base" 
											placeholder="John" 
										/>
									</div>
									<div className="space-y-1.5 sm:space-y-2">
										<label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1">Last Name</label>
										<input 
											type="text" 
											name="lastName"
											value={formData.lastName}
											onChange={handleChange}
											className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all placeholder:text-slate-400 text-sm sm:text-base" 
											placeholder="Doe" 
										/>
									</div>
								</div>
								<div className="space-y-1.5 sm:space-y-2">
									<label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1">Email Address</label>
									<input 
										type="email" 
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all placeholder:text-slate-400 text-sm sm:text-base" 
										placeholder="john@example.com" 
									/>
								</div>
								<div className="space-y-1.5 sm:space-y-2">
									<label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1">Subject</label>
									<input 
										type="text" 
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all placeholder:text-slate-400 text-sm sm:text-base"
										placeholder="e.g. Prayer Request, General Inquiry" 
									/>
								</div>
								<div className="space-y-1.5 sm:space-y-2">
									<label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1">Message</label>
									<textarea 
										rows={4} 
										name="message"
										value={formData.message}
										onChange={handleChange}
										className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all resize-none placeholder:text-slate-400 text-sm sm:text-base" 
										placeholder="How can we help you?"
									></textarea>
								</div>
								<button disabled={isSubmitting} type="submit" className="w-full group bg-brand-orange hover:bg-brand-orange/90 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-brand-orange/25 flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 mt-2 sm:mt-4 disabled:opacity-70 disabled:pointer-events-none">
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
											<Send size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
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
					className="mt-32 pt-16 border-t border-slate-200 dark:border-slate-800"
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<motion.div variants={fadeIn} className="space-y-6 sm:space-y-8 text-center lg:text-left">
							<h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">Connect With Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">Online</span></h3>
							<p className="text-base sm:text-lg lg:text-xl text-foreground/70 leading-relaxed font-medium">
								Connect with us online by following us on Facebook, X, Instagram, YouTube, TikTok and WhatsApp. Whatever you choose to do, know that we love you and want to welcome you to the family.
							</p>
							<div className="flex flex-wrap gap-4 pt-4">
								{[
									{ name: 'Facebook', url: 'https://www.facebook.com/Gulu.Bible.Community.Church', icon: <Facebook size={18} /> },
									{ name: 'X', url: 'https://x.com/gulubible', icon: <Twitter size={18} /> },
									{ name: 'Instagram', url: 'https://instagram.com/', icon: <Instagram size={18} /> },
									{ name: 'YouTube', url: 'https://www.youtube.com/@gulubiblecommunitychurch', icon: <Youtube size={18} /> },
									{ name: 'TikTok', url: 'https://www.tiktok.com/@gulubiblecommunitychurch', icon: <Music size={18} /> },
									{ name: 'WhatsApp', url: 'https://whatsapp.com/channel/0029VbAxEFIBlHplGKitLd0l', icon: <MessageCircle size={18} /> }
								].map((platform) => (
									<a 
										href={platform.url} 
										target="_blank" 
										rel="noopener noreferrer" 
										key={platform.name} 
										className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-orange transition-all font-bold text-foreground/80 hover:text-brand-orange cursor-pointer hover:-translate-y-1 flex items-center gap-2"
									>
										{platform.icon}
										{platform.name}
									</a>
								))}
							</div>
						</motion.div>
						<motion.div variants={fadeIn} className="relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group">
							<div className="absolute inset-0 bg-brand-orange/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10" />
							<iframe 
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
