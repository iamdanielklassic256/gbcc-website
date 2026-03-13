"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
	return (
		<main className="min-h-screen">
			<Navbar />

			<section className="pt-32 pb-24 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
						{/* Contact Info */}
						<div>
							<h1 className="text-5xl md:text-6xl font-bold mb-8">Get in <span className="text-brand-orange">Touch</span></h1>
							<p className="text-lg text-foreground/60 mb-12 leading-relaxed">
								Have questions? Want to learn more about our ministries? Our team is here to help and pray with you. Reach out through any of the channels below.
							</p>

							<div className="space-y-8">
								<div className="flex gap-6 items-start">
									<div className="w-14 h-14 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
										<MapPin size={28} />
									</div>
									<div>
										<h3 className="text-xl font-bold mb-1">Our Location</h3>
										<p className="text-foreground/60">Plot 1450 Airfield Road, Gulu City, Uganda</p>
									</div>
								</div>

								<div className="flex gap-6 items-start">
									<div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
										<Phone size={28} />
									</div>
									<div>
										<h3 className="text-xl font-bold mb-1">Phone Number</h3>
										<p className="text-foreground/60">+256 772 44 9291</p>
										<p className="text-brand-orange text-sm font-bold mt-1 flex items-center gap-1">
											<MessageCircle size={14} /> Available on WhatsApp
										</p>
									</div>
								</div>

								<div className="flex gap-6 items-start">
									<div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center flex-shrink-0">
										<Mail size={28} />
									</div>
									<div>
										<h3 className="text-xl font-bold mb-1">Email Address</h3>
										<p className="text-foreground/60">administrator@gulubcc.org</p>
										<p className="text-foreground/60 text-sm">media@gulubcc.org</p>
									</div>
								</div>
							</div>
						</div>

						{/* Contact Form */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800"
						>
							<h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
							<form className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<label className="text-sm font-bold uppercase tracking-wider text-foreground/40 px-2">First Name</label>
										<input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-brand-orange transition-all" placeholder="John" />
									</div>
									<div className="space-y-2">
										<label className="text-sm font-bold uppercase tracking-wider text-foreground/40 px-2">Last Name</label>
										<input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-brand-orange transition-all" placeholder="Doe" />
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-bold uppercase tracking-wider text-foreground/40 px-2">Email Address</label>
									<input type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-brand-orange transition-all" placeholder="john@example.com" />
								</div>
								<div className="space-y-2">
									<label className="text-sm font-bold uppercase tracking-wider text-foreground/40 px-2">Message</label>
									<textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-brand-orange transition-all resize-none" placeholder="How can we help you?"></textarea>
								</div>
								<button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95">
									Send Message <Send size={20} />
								</button>
							</form>
						</motion.div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
