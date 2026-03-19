"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function NewsletterSection() {
	const [email, setEmail] = useState("");
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;
		
		setIsLoading(true);
		setError(null);

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
			const res = await fetch(`${apiUrl}/subscribers`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"accept": "*/*"
				},
				body: JSON.stringify({ email })
			});

			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				throw new Error(errorData.message || "This email is already subscribed!");
			}

			setIsSubscribed(true);
			setTimeout(() => {
				setEmail("");
				setIsSubscribed(false);
			}, 5000);
		} catch (err: any) {
			setError(err.message || "Network error. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-slate-50 dark:bg-[#020617] flex justify-center items-center">
			
			{/* Dramatic lighting effects */}
			<div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
				<div className="w-[800px] h-[400px] bg-brand-orange/10 dark:bg-brand-orange/20 rounded-[100%] blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
				<div className="w-[600px] h-[300px] bg-brand-blue/10 dark:bg-brand-blue/20 rounded-[100%] blur-[80px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-overlay" />
			</div>

			<div className="max-w-4xl mx-auto relative z-10 w-full text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="flex flex-col items-center"
				>
					<span className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 text-brand-orange text-xs font-bold uppercase tracking-[0.2em] shadow-sm mb-8 inline-block backdrop-blur-md">
						Don&apos;t miss out
					</span>
					
					<h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight max-w-2xl mx-auto">
						Get the latest updates directly <br className="hidden md:block" />
						to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">inbox.</span>
					</h2>
					
					<p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto mb-10 font-medium">
						Join our weekly newsletter for devotionals, church news, and upcoming events delivered beautifully and compactly.
					</p>

					{isSubscribed ? (
						<motion.div 
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-md w-full flex flex-col items-center backdrop-blur-xl"
						>
							<div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/10 text-green-500 flex items-center justify-center mb-5 border border-green-200 dark:border-green-500/20">
								<CheckCircle2 size={32} />
							</div>
							<h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">You&apos;re subscribed!</h3>
							<p className="text-slate-500 dark:text-slate-400 text-center">Welcome to the GBCC online community family.</p>
						</motion.div>
					) : (
						<form 
							onSubmit={handleSubmit} 
							className="w-full max-w-lg relative group"
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							{/* Form input glow effect */}
							<div className={`absolute -inset-1 bg-gradient-to-r from-brand-orange via-amber-400 to-brand-blue rounded-3xl blur-lg transition-all duration-700 opacity-20 group-hover:opacity-40 ${isHovered ? 'scale-105' : 'scale-100'}`} />
							
							<div className="relative flex items-center bg-white dark:bg-slate-900 rounded-[24px] p-2 shadow-xl border border-slate-200 dark:border-slate-700/50 backdrop-blur-2xl transition-transform duration-300 transform group-hover:-translate-y-1">
								<input
									type="email"
									placeholder="Enter your email address..."
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="flex-grow bg-transparent text-slate-900 dark:text-white px-5 sm:px-6 py-4 outline-none placeholder:text-slate-400 font-medium text-base sm:text-base w-full"
								/>
								<button
									type="submit"
									disabled={isLoading}
									className="bg-brand-orange hover:bg-brand-orange/90 disabled:opacity-70 disabled:hover:scale-100 text-white rounded-[20px] px-6 sm:px-8 py-4 sm:py-4 font-bold text-sm sm:text-base shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 transition-all flex items-center gap-2 sm:gap-3 whitespace-nowrap active:scale-95"
								>
									<span className="hidden sm:inline">
										{isLoading ? "Subscribing..." : "Subscribe"}
									</span>
									{isLoading ? (
										<Loader2 size={18} className="animate-spin" />
									) : (
										<Send size={18} className="transform -rotate-12" />
									)}
								</button>
							</div>
							
							{/* Error message specifically placed right under the bar */}
							{error && (
								<motion.p
									initial={{ opacity: 0, y: -5 }}
									animate={{ opacity: 1, y: 0 }}
									className="absolute -bottom-8 left-0 right-0 text-red-500 font-bold text-sm tracking-wide"
								>
									*{error}
								</motion.p>
							)}
						</form>
					)}
					
					<div className="mt-8 flex items-center gap-6 text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500">
						<span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange/50" /> No spam</span>
						<span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange/50" /> Unsubscribe instantly</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
