"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		// Check initial run
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => { document.body.style.overflow = 'unset'; }
	}, [isMobileMenuOpen]);

	const navLinks = [
		{ name: "About", href: "/about" },
		{ name: "Ministries", href: "/church-ministries" },
		{ name: "Projects", href: "/projects" },
		{ name: "Church Plants", href: "/church-plants" },
		{ name: "Sermons", href: "/sermons" },
		{ 
			name: "News", 
			subLinks: [
				{ name: "Upcoming Events", href: "/events" },
				{ name: "Blogs", href: "/blogs" },
			]
		},
		{ name: "Contact", href: "/contact" },
	];

	return (
		<>
			<nav
				className={cn(
					"fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 py-4 md:px-8",
					isScrolled 
						? "py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm"
						: "bg-transparent py-5"
				)}
			>
				<div className="flex items-center justify-between">
					{/* Logo & Brand */}
					<Link href="/" className="flex items-center gap-3 z-50 relative group">
						<div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-brand-orange/20 p-1 group-hover:ring-brand-orange/50 transition-all duration-300 bg-white shadow-sm">
							<Image
								src="/logo.png"
								alt="GBCC Logo"
								width={48}
								height={48}
								className="object-contain group-hover:scale-105 transition-transform duration-300"
							/>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<ul className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-1 rounded-full px-2 py-1.5 transition-all duration-300 m-0 list-none whitespace-nowrap">
						{navLinks.map((link) => {
							const isActive = link.href 
								? pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/')
								: link.subLinks?.some(sub => pathname === sub.href || pathname.startsWith(sub.href));
							
							return (
								<li key={link.name} className="relative group/navitem">
									{link.href ? (
										<Link
											href={link.href}
											className="relative px-4 py-2 rounded-full text-sm font-semibold transition-all group block whitespace-nowrap"
										>
											{isActive && (
												<motion.div 
													layoutId="nav-pill"
													className="absolute inset-0 bg-brand-orange/10 dark:bg-brand-orange/20 rounded-full z-0"
													transition={{ type: "spring", stiffness: 300, damping: 30 }}
												/>
											)}
											<span className={cn(
												"relative z-10 transition-colors duration-200",
												isActive 
													? "text-brand-orange" 
													: isScrolled 
														? "text-slate-600 dark:text-slate-300 hover:text-brand-orange" 
														: "text-white/90 hover:text-white"
											)}>
												{link.name}
											</span>
										</Link>
									) : (
										<div className="relative cursor-pointer px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1 group whitespace-nowrap">
											{isActive && (
												<motion.div 
													layoutId="nav-pill"
													className="absolute inset-0 bg-brand-orange/10 dark:bg-brand-orange/20 rounded-full z-0"
													transition={{ type: "spring", stiffness: 300, damping: 30 }}
												/>
											)}
											<span className={cn(
												"relative z-10 transition-colors duration-200",
												isActive 
													? "text-brand-orange" 
													: isScrolled 
														? "text-slate-600 dark:text-slate-300 hover:text-brand-orange" 
														: "text-white/90 hover:text-white"
											)}>
												{link.name}
											</span>
											<ChevronDown size={14} className={cn(
												"relative z-10 transition-transform duration-200 group-hover/navitem:rotate-180",
												isActive ? "text-brand-orange" : isScrolled ? "text-slate-600 dark:text-slate-300" : "text-white/90"
											)} />

											{/* Dropdown Menu */}
											<div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/navitem:opacity-100 group-hover/navitem:translate-y-0 group-hover/navitem:pointer-events-auto transition-all duration-300 z-50 min-w-[200px]">
												<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-2 flex flex-col gap-1 overflow-hidden">
													{link.subLinks?.map((sub) => {
														const isSubActive = pathname === sub.href;
														return (
															<Link
																key={sub.name}
																href={sub.href}
																className={cn(
																	"px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-800",
																	isSubActive ? "text-brand-orange bg-brand-orange/5 dark:bg-brand-orange/10" : "text-slate-700 dark:text-slate-300"
																)}
															>
																{sub.name}
															</Link>
														);
													})}
												</div>
											</div>
										</div>
									)}
								</li>
							);
						})}
					</ul>

					{/* Mobile Hamburger Toggle */}
					<button
						className="lg:hidden p-2 rounded-xl z-50 relative transition-all active:scale-95"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label="Toggle menu"
					>
						{isMobileMenuOpen ? (
							<X size={28} className="text-slate-900 dark:text-white" />
						) : (
							<Menu size={28} className={cn("transition-colors duration-300", isScrolled ? "text-slate-900 dark:text-white" : "text-white")} />
						)}
					</button>
				</div>

				{/* Mobile Expanded Menu Overlay */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 top-0 left-0 w-full h-screen bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl z-40 lg:hidden overflow-hidden flex flex-col pt-24 pb-8 px-6"
						>
							<ul className="flex-1 overflow-y-auto flex flex-col gap-6 w-full max-w-sm mx-auto list-none m-0 p-0">
								{navLinks.map((link, i) => {
									const isActive = link.href 
										? pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/')
										: link.subLinks?.some(sub => pathname === sub.href || pathname.startsWith(sub.href));
									
									return (
										<motion.li 
											key={link.name}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
											className="flex flex-col gap-2"
										>
											{link.href ? (
												<Link
													href={link.href}
													className={cn(
														"flex items-center justify-between py-3 px-4 rounded-2xl text-xl font-bold transition-all active:scale-95",
														isActive 
															? "bg-brand-orange/10 text-brand-orange" 
															: "text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-brand-orange"
													)}
													onClick={() => setIsMobileMenuOpen(false)}
												>
													{link.name}
													<ChevronRight size={20} className={cn("transition-all", isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4")} />
												</Link>
											) : (
												<div className="flex flex-col gap-2">
													<div className="flex items-center justify-between py-3 px-4 rounded-2xl text-xl font-bold text-slate-800 dark:text-slate-200">
														{link.name}
													</div>
													<ul className="flex flex-col gap-2 pl-4">
														{link.subLinks?.map((sub) => {
															const isSubActive = pathname === sub.href;
															return (
																<li key={sub.name}>
																	<Link
																		href={sub.href}
																		className={cn(
																			"flex items-center justify-between py-3 px-4 rounded-xl text-lg font-semibold transition-all active:scale-95",
																			isSubActive 
																				? "bg-brand-orange/10 text-brand-orange" 
																				: "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-brand-orange"
																		)}
																		onClick={() => setIsMobileMenuOpen(false)}
																	>
																		<span className="flex items-center gap-3">
																			<div className={cn("w-1.5 h-1.5 rounded-full transition-colors", isSubActive ? "bg-brand-orange" : "bg-slate-300 dark:bg-slate-700")} />
																			{sub.name}
																		</span>
																		<ChevronRight size={18} className={cn("transition-all", isSubActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4")} />
																	</Link>
																</li>
															);
														})}
													</ul>
												</div>
											)}
										</motion.li>
									);
								})}
							</ul>
							
							<motion.div 
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
								className="mt-auto w-full max-w-sm mx-auto pt-6 text-center"
							>
								<p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Connect With Us</p>
								<div className="flex justify-center gap-4">
									<a href="https://www.facebook.com/Gulu.Bible.Community.Church" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all shadow-sm">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
									</a>
									<a href="https://x.com/gulubible" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all shadow-sm">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
									</a>
									<a href="https://www.youtube.com/@gulubiblecommunitychurch" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
									</a>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>
		</>
	);
}
