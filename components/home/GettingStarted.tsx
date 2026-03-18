import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/utils/animation'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { gettingStartedItems } from '@/utils/getting-started'


const GettingStarted = () => {
	return (
		<section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-[10%] right-[5%] w-[30%] h-[30%] bg-brand-orange/5 rounded-full blur-[120px]" />
			</div>

			<div className="max-w-6xl mx-auto relative z-10">
				<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
					<motion.div
						variants={fadeUp}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-bold text-sm mb-6"
					>
						<Sparkles size={15} />
						<span>New Here?</span>
					</motion.div>
					<motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
						Getting{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Started</span>
					</motion.h2>
					<motion.p variants={fadeUp} className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
						Whether you are visiting for the first time or looking to get plugged in, we have a place for you.
					</motion.p>
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={stagger}
					className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12"
				>
					{gettingStartedItems.map((item, idx) => (
						<motion.div
							key={idx}
							variants={fadeUp}
							className="group bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/80 dark:border-slate-800 p-8 lg:p-10 shadow-sm hover:shadow-xl hover:border-brand-orange/20 transition-all duration-500 hover:-translate-y-1"
						>
							<div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-6 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
								{item.icon}
							</div>
							<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors">
								{item.title}
							</h3>
							<p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-6">{item.description}</p>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={stagger}
					className="flex justify-center"
				>
					<motion.div variants={fadeUp}>
						<Link
							href="/contact"
							className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-xl shadow-brand-orange/25 active:scale-[0.98]"
						>
							Contact Us to Get Started
							<ArrowRight size={20} />
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
export default GettingStarted