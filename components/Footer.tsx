import Link from "next/link";
import Image from "next/image";
import {
	Facebook,
	Instagram,
	Youtube,
	Mail,
	Phone,
	MapPin,
} from "lucide-react";

export default function Footer() {
	return (
		<footer id="contact" className="bg-slate-950 text-white pt-20 pb-10 px-6">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">

				{/* Church Information */}
				<div className="col-span-1">
					<Link href="/" className="flex items-center gap-3 mb-8">
						<div className="relative w-12 h-12 overflow-hidden rounded-full bg-white p-1">
							<Image
								src="/logo.png"
								alt="GBCC Logo"
								width={48}
								height={48}
								className="object-contain"
							/>
						</div>

						<span className="font-bold text-xl tracking-tight">
							GBCC <span className="text-brand-orange">CHURCH</span>
						</span>
					</Link>

					<p className="text-white/60 leading-relaxed mb-8">
						"With God all things are Possible"
						<br />
						Luke 1:37.
					</p>

					<div className="flex gap-4">
						<a
							href="#"
							aria-label="Facebook"
							className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
						>
							<Facebook size={18} />
						</a>

						<a
							href="#"
							aria-label="Instagram"
							className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
						>
							<Instagram size={18} />
						</a>

						<a
							href="#"
							aria-label="YouTube"
							className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
						>
							<Youtube size={18} />
						</a>
					</div>
				</div>

				{/* Quick Links - Two Columns */}
				<div>
					<h4 className="text-lg font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-12 after:h-1 after:bg-brand-orange">
						Quick Links
					</h4>

					<ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-white/60">
						<li>
							<Link href="/" className="hover:text-white transition-colors">
								Home
							</Link>
						</li>

						<li>
							<Link href="/about" className="hover:text-white transition-colors">
								About Us
							</Link>
						</li>

						<li>
							<Link href="/church-plants" className="hover:text-white transition-colors">
								Church Plants
							</Link>
						</li>

						<li>
							<Link href="/sermons" className="hover:text-white transition-colors">
								Sermons
							</Link>
						</li>

						<li>
							<Link href="/events" className="hover:text-white transition-colors">
								Upcoming Events
							</Link>
						</li>

						<li>
							<Link href="/blogs" className="hover:text-white transition-colors">
								Blogs
							</Link>
						</li>

						<li>
							<Link href="/contact" className="hover:text-white transition-colors">
								Contact Us
							</Link>
						</li>
					</ul>
				</div>

				{/* Contact Information */}
				<div>
					<h4 className="text-lg font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-12 after:h-1 after:bg-brand-orange">
						Contact Info
					</h4>

					<ul className="space-y-6">
						<li className="flex gap-4 items-start">
							<MapPin className="text-brand-orange flex-shrink-0" size={20} />
							<span className="text-white/60">
								Plot 1450 Airfield Road, Gulu City, Uganda
							</span>
						</li>

						<li className="flex gap-4 items-start">
							<Phone className="text-brand-orange flex-shrink-0" size={20} />
							<a
								href="tel:+256772449291"
								className="text-white/60 hover:text-white transition-colors"
							>
								+256 772 44 9291
							</a>
						</li>

						<li className="flex gap-4 items-start">
							<Mail className="text-brand-orange flex-shrink-0" size={20} />
							<a
								href="mailto:media@gulubcc.org"
								className="text-white/60 hover:text-white transition-colors"
							>
								media@gulubcc.org
							</a>
						</li>
					</ul>
				</div>
			</div>

			{/* Copyright and Legal Links */}
			<div className="max-w-7xl mx-auto border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
				<p>
					© {new Date().getFullYear()} Gulu Bible Community Church. All rights reserved.
				</p>

				<div className="flex gap-8">
					<Link
						href="/privacy-policy"
						className="hover:text-white transition-colors"
					>
						Privacy Policy
					</Link>

					<Link
						href="/terms-of-service"
						className="hover:text-white transition-colors"
					>
						Terms of Service
					</Link>
				</div>
			</div>
		</footer>
	);
}