import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/utils/animation";
import { ArrowRight, BookOpen } from "lucide-react";


const UpdateSection = () => {
  return (
	<section className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
				<div className="max-w-6xl mx-auto">
					<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
						<motion.div
							variants={fadeUp}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-bold text-sm mb-6"
						>
							<BookOpen size={15} />
							<span>Latest Updates</span>
						</motion.div>
						<motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
							GBCC <span className="text-brand-blue">Weekly</span> Update
						</motion.h2>
						<motion.p variants={fadeUp} className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
							Stay connected with the latest news, announcements, and happenings in our church community.
						</motion.p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-lg p-8 sm:p-10 lg:p-14"
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
							<div>
								<span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange mb-3 block">This Week</span>
								<h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
									Gaba Church Weekly Update
								</h3>
								<p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-6">
									This week at GBCC, we continue our sermon series on the Book of Romans. We also have exciting community events
									planned including outreach, youth fellowship, and our monthly worship night. Don&apos;t miss our midweek prayer
									sessions as we seek God together for revival in Gulu.
								</p>
								<Link
									href="/blogs"
									className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:-translate-y-0.5 transition-all"
								>
									Read More
									<ArrowRight size={15} />
								</Link>
							</div>
							<div className="relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden">
								<Image
									src="/community.png"
									alt="Church Update"
									fill
									className="object-cover"
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
  )
}

export default UpdateSection