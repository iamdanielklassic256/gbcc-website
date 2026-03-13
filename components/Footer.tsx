import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
	return (
		<footer id="contact" className="bg-slate-950 text-white pt-20 pb-10 px-6">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
				<div className="col-span-1 lg:col-span-1">
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
						"With God all things are Possible" - Luke 1:37. Rooted in faith, growing in love, and reaching Gulu with the Gospel.
					</p>
					<div className="flex gap-4">
						<a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
							<Facebook size={18} />
						</a>
						<a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
							<Instagram size={18} />
						</a>
						<a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
							<Youtube size={18} />
						</a>
					</div>
				</div>

				<div>
					<h4 className="text-lg font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-12 after:h-1 after:bg-brand-orange">
						Quick Links
					</h4>
					<ul className="space-y-4 text-white/60">
						<li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
						<li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
						<li><Link href="/sermons" className="hover:text-white transition-colors">Sermons</Link></li>
						<li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
						<li><Link href="/give" className="hover:text-white transition-colors">Give Online</Link></li>
					</ul>
				</div>

				<div>
					<h4 className="text-lg font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-12 after:h-1 after:bg-brand-orange">
						Ministries
					</h4>
					<ul className="space-y-4 text-white/60">
						<li><a href="#" className="hover:text-white transition-colors">Youth Ministry</a></li>
						<li><a href="#" className="hover:text-white transition-colors">Women's Ministry</a></li>
						<li><a href="#" className="hover:text-white transition-colors">Men's Connection</a></li>
						<li><a href="#" className="hover:text-white transition-colors">Kids Bible Club</a></li>
						<li><a href="#" className="hover:text-white transition-colors">Outreach Program</a></li>
					</ul>
				</div>

				<div>
					<h4 className="text-lg font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-12 after:h-1 after:bg-brand-orange">
						Contact Info
					</h4>
					<ul className="space-y-6">
						<li className="flex gap-4 items-start">
							<MapPin className="text-brand-orange flex-shrink-0" size={20} />
							<span className="text-white/60">Plot 1450 Airfield Road, Gulu City, Uganda</span>
						</li>
						<li className="flex gap-4 items-start">
							<Phone className="text-brand-orange flex-shrink-0" size={20} />
							<span className="text-white/60">+256 772 44 9291</span>
						</li>
						<li className="flex gap-4 items-start">
							<Mail className="text-brand-orange flex-shrink-0" size={20} />
							<span className="text-white/60">administrator@gulubcc.org</span>
						</li>
					</ul>
				</div>
			</div>

			<div className="max-w-7xl mx-auto border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
				<p>© {new Date().getFullYear()} Gulu Bible Community Church. All rights reserved.</p>
				<div className="flex gap-8">
					<a href="#" className="hover:text-white">Privacy Policy</a>
					<a href="#" className="hover:text-white">Terms of Service</a>
				</div>
			</div>
		</footer>
	);
}
