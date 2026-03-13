"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Smartphone, CreditCard, Banknote, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function GivePage() {
	return (
		<main className="min-h-screen">
			<Navbar />

			<section className="pt-32 pb-24 px-6 text-center">
				<div className="max-w-3xl mx-auto">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-orange/10 text-brand-orange mb-8"
					>
						<Heart size={40} fill="currentColor" />
					</motion.div>
					<h1 className="text-5xl md:text-6xl font-bold mb-6">Supporting the <span className="text-brand-orange text-blue-600">Work</span></h1>
					<p className="text-lg text-foreground/60 leading-relaxed mb-12">
						Your generosity enables us to reach the community, support our ministries, and share the love of Christ. Every gift, no matter the size, makes an eternal difference.
					</p>
				</div>

				<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
						<div className="w-16 h-16 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-8">
							<Smartphone size={32} />
						</div>
						<h3 className="text-2xl font-bold mb-4">Mobile Money</h3>
						<p className="text-foreground/60 mb-8">Give instantly via MTN or Airtel Mobile Money.</p>
						<div className="w-full p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-8 font-mono font-bold text-lg text-brand-blue">
							*165*...# GBCC
						</div>
						<button className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold hover:bg-brand-blue/90 transition-all">
							Give via Mobile
						</button>
					</div>

					<div className="bg-slate-950 p-10 rounded-[40px] shadow-2xl text-white transform lg:scale-105 relative z-10 overflow-hidden">
						<div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 blur-3xl" />
						<div className="w-16 h-16 rounded-2xl bg-brand-orange text-white flex items-center justify-center mb-8 mx-auto">
							<CreditCard size={32} />
						</div>
						<h3 className="text-2xl font-bold mb-4">Online Payment</h3>
						<p className="text-white/60 mb-8">Securely give via Visa, Mastercard, or PayPal.</p>
						<ul className="text-left space-y-4 mb-10 text-sm">
							<li className="flex items-center gap-3">
								<ShieldCheck className="text-brand-orange" size={18} /> Secure Encrypted Transaction
							</li>
							<li className="flex items-center gap-3">
								<ShieldCheck className="text-brand-orange" size={18} /> Set up Recurring Giving
							</li>
							<li className="flex items-center gap-3">
								<ShieldCheck className="text-brand-orange" size={18} /> Receive Digital Receipt
							</li>
						</ul>
						<button className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-brand-orange/90 transition-all shadow-xl shadow-brand-orange/20">
							Give Securely
						</button>
					</div>

					<div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
						<div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center mb-8">
							<Banknote size={32} />
						</div>
						<h3 className="text-2xl font-bold mb-4">Bank Transfer</h3>
						<p className="text-foreground/60 mb-8">Direct transfer to the Church official bank account.</p>
						<div className="text-left w-full space-y-2 text-sm bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl mb-8">
							<p><span className="font-bold">Bank:</span> Stanbic Bank</p>
							<p><span className="font-bold">Name:</span> Gulu Bible Church</p>
							<p><span className="font-bold">Account:</span> 903000...</p>
						</div>
						<button className="w-full border-2 border-slate-200 dark:border-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all">
							Copy Bank Details
						</button>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
