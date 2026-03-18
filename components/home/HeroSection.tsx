import bannerimg from '@/assets/images/congregation.jpg'
import Image from 'next/image'
import { motion } from "framer-motion";
import Link from 'next/link';
import { ChevronRight, Play, Calendar, MapPin, Send } from 'lucide-react';
import { fadeUp, stagger } from '@/utils/animation';


const HeroSection = () => {
	return (
		<section className="relative h-[100vh] min-h-[750px] w-full overflow-hidden">
			<div className="absolute inset-0 z-0">
				<Image src={bannerimg} alt="GBCC Congregation" fill className="object-cover" priority />
				<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
			</div>

			{/* Gradient orbs */}
			<div className="absolute inset-0 z-[1] pointer-events-none">
				<div className="absolute top-[10%] right-[5%] w-[40%] h-[40%] bg-brand-orange/15 rounded-full blur-[180px]" />
				<div className="absolute bottom-[5%] left-[10%] w-[35%] h-[35%] bg-brand-blue/15 rounded-full blur-[150px]" />
			</div>

			<div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
				<motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
					<motion.div
						variants={fadeUp}
						className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-8"
					>
						<span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
						<span className="text-white text-xs font-bold uppercase tracking-wider">Welcome to GBCC</span>
					</motion.div>

					<motion.h1
						variants={fadeUp}
						className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight mb-6"
					>
						Christ-like People{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-brand-orange">
							Transforming
						</span>{" "}
						Society
					</motion.h1>

					<motion.p variants={fadeUp} className="text-lg md:text-xl text-white/65 mb-10 max-w-2xl leading-relaxed font-medium">
						Welcome to Gulu Bible Community Church — a place where faith meets community, and every heart finds a home.
					</motion.p>

					<motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
						<Link
							href="/about"
							className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-xl shadow-brand-orange/25 active:scale-[0.98]"
						>
							Learn About Us
							<ChevronRight size={20} />
						</Link>
						<Link
							href="/contact"
							className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
						>
							Reach out to us
							<Send size={18} />
						</Link>
					</motion.div>
				</motion.div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#020617] to-transparent z-10" />
		</section>
	)
}

export default HeroSection