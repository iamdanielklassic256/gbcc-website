"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Ministries", href: "/projects" },
		{ name: "Church Plants", href: "/church-plants" },
		{ name: "Sermons", href: "/sermons" },
		{ name: "Events", href: "/events" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<nav
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
				isScrolled || isMobileMenuOpen
					? "glass-nav py-3 border-b border-white/10"
					: "bg-transparent"
			)}
		>
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<Link href="/" className="flex items-center gap-3">
					<div className="relative w-10 h-10 overflow-hidden rounded-full ring-2 ring-brand-orange/20 bg-white p-1">
						<Image
							src="/logo.png"
							alt="GBCC Logo"
							width={40}
							height={40}
							className="object-contain"
						/>
					</div>
					<span className={cn(
						"font-bold text-lg tracking-tight hidden sm:block",
						isScrolled ? "text-foreground" : "text-white"
					)}>
						GULU BIBLE <span className="text-brand-orange">CHURCH</span>
					</span>
				</Link>

				{/* Desktop Nav */}
				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className={cn(
								"text-sm font-medium transition-colors hover:text-brand-orange",
								isScrolled ? "text-foreground/80" : "text-white/90"
							)}
						>
							{link.name}
						</Link>
					))}
					<Link
						href="/give"
						className="bg-brand-orange hover:bg-brand-orange/90 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-orange/20"
					>
						Give
					</Link>
				</div>

				{/* Mobile Toggle */}
				<button
					className="md:hidden p-2 text-foreground"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					{isMobileMenuOpen ? (
						<X size={24} className={isScrolled ? "text-foreground" : "text-white"} />
					) : (
						<Menu size={24} className={isScrolled ? "text-foreground" : "text-white"} />
					)}
				</button>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border p-6 md:hidden flex flex-col gap-4 shadow-2xl"
					>
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="text-lg font-medium p-2 hover:text-brand-orange border-b border-border/50"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{link.name}
							</Link>
						))}
						<Link
							href="/give"
							className="bg-brand-orange text-white p-4 rounded-xl text-center font-bold mt-2"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							Give Online
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
