"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, MessageCircle, ArrowRight, Facebook, Twitter, Instagram, Youtube, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
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
			{/* Background Decorations */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-orange/20 blur-[120px]" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue/20 blur-[120px]" />
			</div>

			<Navbar />

			<section className="pt-32 pb-24 px-6 relative z-10 w-full max-w-7xl mx-auto">
				<motion.div 
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
					className="text-center max-w-3xl mx-auto mb-20"
				>
					<motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange font-bold text-sm mb-6 border border-brand-orange/20 shadow-sm shadow-brand-orange/5">
						<MessageCircle size={16} />
						<span>We'd love to hear from you</span>
					</motion.div>
					<motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground">
						Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">Touch</span>
					</motion.h1>
					<motion.p variants={fadeIn} className="text-lg md:text-xl text-foreground/70 leading-relaxed font-medium">
						Have questions? Want to learn more about our ministries? Our team is here to help and pray with you. Reach out through any of the channels below.
					</motion.p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
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
							<h3 className="text-2xl font-bold mb-3">Visit Us</h3>
							<p className="text-foreground/70 text-lg leading-relaxed mb-6">Plot 1450 Airfield Road<br/>Gulu City, Uganda</p>
							<a href="#" className="inline-flex items-center gap-2 text-brand-orange font-bold hover:gap-3 transition-all relative">
								Get Directions <ArrowRight size={18} />
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full"></span>
							</a>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
							<motion.div variants={fadeIn} className="group relative overflow-hidden p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
								<div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-bl-[80px] -z-10 transition-transform group-hover:scale-110" />
								<div className="flex items-start justify-between">
									<div>
										<div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
											<Phone size={24} />
										</div>
										<h3 className="text-xl font-bold mb-2">Call Us</h3>
										<p className="text-foreground/70 text-lg">+256 772 44 9291</p>
									</div>
									<div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-sm">
										<MessageCircle size={24} />
										<span className="text-[10px] font-bold mt-1 uppercase tracking-wider">WhatsApp</span>
									</div>
								</div>
							</motion.div>

							<motion.div variants={fadeIn} className="group relative overflow-hidden p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
								<div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-bl-[80px] -z-10 transition-transform group-hover:scale-110" />
								<div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
									<Mail size={24} />
								</div>
								<h3 className="text-xl font-bold mb-2">Email Us</h3>
								<div className="space-y-2">
									<a href="mailto:administrator@gulubcc.org" className="flex items-center gap-2 text-foreground/70 text-base hover:text-brand-orange transition-colors">
										<div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-brand-orange transition-colors" />
										administrator@gulubcc.org
									</a>
									<a href="mailto:media@gulubcc.org" className="flex items-center gap-2 text-foreground/70 text-base hover:text-brand-orange transition-colors">
										<div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-brand-orange transition-colors" />
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

							<div className="mb-10 relative z-10">
								<h2 className="text-3xl font-extrabold mb-3">Send a Message</h2>
								<p className="text-foreground/60 text-lg">We typically reply within 24 hours.</p>
							</div>

							<form className="space-y-6 relative z-10">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<label className="text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1">First Name</label>
										<input 
											type="text" 
											className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all placeholder:text-slate-400" 
											placeholder="John" 
										/>
									</div>
									<div className="space-y-2">
										<label className="text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1">Last Name</label>
										<input 
											type="text" 
											className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all placeholder:text-slate-400" 
											placeholder="Doe" 
										/>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1">Email Address</label>
									<input 
										type="email" 
										className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all placeholder:text-slate-400" 
										placeholder="john@example.com" 
									/>
								</div>
								<div className="space-y-2 relative">
									<label className="text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1">Subject</label>
									<div className="relative">
										<select className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all appearance-none cursor-pointer">
											<option value="">General Inquiry</option>
											<option value="prayer">Prayer Request</option>
											<option value="ministry">Join a Ministry</option>
											<option value="giving">Giving & Tithes</option>
											<option value="other">Other</option>
										</select>
										<div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
										</div>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1">Message</label>
									<textarea 
										rows={5} 
										className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all resize-none placeholder:text-slate-400" 
										placeholder="How can we help you?"
									></textarea>
								</div>
								<button type="button" className="w-full group bg-gradient-to-r from-brand-orange to-brand-blue hover:opacity-95 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-orange/25 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 mt-4">
									<span>Send Message</span>
									<Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
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
						<motion.div variants={fadeIn} className="space-y-8">
							<h3 className="text-4xl font-extrabold">Connect With Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">Online</span></h3>
							<p className="text-xl text-foreground/70 leading-relaxed font-medium">
								Connect with us online by following us on Facebook, X, Instagram, YouTube, TikTok and WhatsApp. Whatever you choose to do, know that we love you and want to welcome you to the family.
							</p>
							<div className="flex flex-wrap gap-4 pt-4">
								{[
									{ name: 'Facebook', url: 'https://facebook.com/', icon: <Facebook size={18} /> },
									{ name: 'X', url: 'https://twitter.com/', icon: <Twitter size={18} /> },
									{ name: 'Instagram', url: 'https://instagram.com/', icon: <Instagram size={18} /> },
									{ name: 'YouTube', url: 'https://youtube.com/', icon: <Youtube size={18} /> },
									{ name: 'TikTok', url: 'https://tiktok.com/', icon: <Music size={18} /> },
									{ name: 'WhatsApp', url: 'https://wa.me/', icon: <MessageCircle size={18} /> }
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
