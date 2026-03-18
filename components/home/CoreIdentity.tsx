import youthimg from '@/assets/images/youth.jpg'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { stagger, fadeUp } from '@/utils/animation'
import { Cross } from 'lucide-react'


const CoreIdentity = () => {
	return (
		<section className="relative py-28 sm:py-36 px-4 sm:px-6 overflow-hidden">
			<div className="absolute inset-0 z-0">
				<Image src={youthimg} alt="GBCC Youth" fill className="object-cover opacity-100 dark:opacity-70" />
				<div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/70 to-white/60 dark:from-[#020617]/90 dark:via-[#020617]/70 dark:to-[#020617]/90" />
			</div>

			<div className="max-w-5xl mx-auto relative z-10 text-center">
				<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
					<motion.div variants={fadeUp} className="mb-4">
						<Cross size={40} className="mx-auto text-brand-orange mb-6" />
					</motion.div>
					<motion.h2
						variants={fadeUp}
						className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[0.95] mb-6"
					>
						Christ-like People.
						<br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orange/60">
							Transforming Society.
						</span>
					</motion.h2>
					<motion.p variants={fadeUp} className="text-lg md:text-xl text-black dark:text-slate-400 max-w-2xl mx-auto font-medium">
						Our vision is to raise a generation of believers who reflect the character of Christ and impact every sphere of
						society — from families to nations.
					</motion.p>
				</motion.div>
			</div>
		</section>
	)
}

export default CoreIdentity