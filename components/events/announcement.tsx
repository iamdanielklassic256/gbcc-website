import { aruCourses, weeklyPrograms } from "@/data/data";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, GraduationCap, Mail, Phone } from "lucide-react";
import Image from "next/image";

const Announcement = () => {
	const fadeUp = {
		hidden: { opacity: 0, y: 24 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
			},
		},
	};

	const stagger = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};
	return (
		<div className="">
			<section className="relative py-28 px-4 sm:px-6 bg-slate-50 dark:bg-[#060b22] border-t border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
				<div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
				<div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

				<div className="max-w-6xl mx-auto relative z-10">
					<div className="text-center mb-16">
						<motion.h2
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={fadeUp}
							className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4"
						>
							Weekly{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">
								Programs
							</span>
						</motion.h2>
						<motion.p
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={fadeUp}
							className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
						>
							Join our consistent weekly gatherings as we commit ourselves to
							community, prayer, and studying the Word together.
						</motion.p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{weeklyPrograms.map((prog, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1, duration: 0.5 }}
								className={`group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 ${prog.border}`}
							>
								<div className="flex items-center justify-between mb-6">
									<div
										className={`w-14 h-14 rounded-2xl flex items-center justify-center ${prog.color}`}
									>
										<prog.icon size={26} />
									</div>
									<div className="text-right">
										<span className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
											{prog.day}
										</span>
										<span className="block text-xs font-semibold text-brand-orange mt-1">
											{prog.time}
										</span>
									</div>
								</div>
								<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors">
									{prog.title}
								</h3>
								<p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
									{prog.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Announcement