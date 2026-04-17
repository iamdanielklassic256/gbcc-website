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

			{/* ─── ARU Section ─── */}
			<section className="relative py-28 px-4 sm:px-6 bg-[#020617] text-white overflow-hidden border-t border-slate-800">
				<div className="absolute inset-0 z-0">
					<Image
						src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200"
						alt="ARU Background"
						fill
						className="object-cover opacity-10"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/95 to-[#020617]" />
				</div>
				<div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />

				<div className="max-w-6xl mx-auto relative z-10">
					<div className="text-center mb-16">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={fadeUp}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm shadow-lg mb-6"
						>
							<GraduationCap size={16} />
							<span>Admissions Open This February</span>
						</motion.div>
						<motion.h2
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={fadeUp}
							className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight"
						>
							Africa Renewal University
							<br className="max-md:hidden" />{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
								Gulu Centre
							</span>
						</motion.h2>
						<motion.p
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={fadeUp}
							className="text-lg text-slate-400 max-w-2xl mx-auto"
						>
							Call for applications! Equip yourself for ministry and impact your
							community through our certified programs.
						</motion.p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
						{aruCourses.map((course, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1, duration: 0.5 }}
								className="bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-xl p-8 rounded-3xl transition-all duration-300 relative overflow-hidden group"
							>
								<div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-teal-400 opacity-50 group-hover:opacity-100 transition-opacity" />
								<h3 className="text-xl font-bold text-white mb-6">
									{course.title}
								</h3>
								<div className="space-y-4">
									<div>
										<span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
											<CheckCircle2 size={14} />
											Qualification
										</span>
										<p className="text-sm text-slate-300 leading-relaxed">
											{course.qualification}
										</p>
									</div>
									<div className="pt-4 border-t border-white/10">
										<span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
											<Clock size={14} />
											Schedule
										</span>
										<p className="text-sm text-slate-300 leading-relaxed">
											{course.schedule}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Contact Box */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900/40 to-teal-900/40 border border-blue-500/20 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden group"
					>
						<div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors" />
						<div className="relative z-10">
							<h4 className="text-2xl font-bold text-white mb-3">
								Ready to Apply?
							</h4>
							<p className="text-slate-300 mb-8 max-w-xl mx-auto">
								Pick up your application form directly from GBCC or reach out to
								the Centre Coordinator for assistance.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<a
									href="tel:0783583954"
									className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
								>
									<Phone size={18} className="text-blue-400" />
									0783 583 954
								</a>
								<a
									href="mailto:morrishmonday@gmail.com"
									className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-1"
								>
									<Mail size={18} />
									Email Coordinator
								</a>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	)
}

export default Announcement