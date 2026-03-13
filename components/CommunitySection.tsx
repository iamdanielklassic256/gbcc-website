"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Users, Target } from "lucide-react";

export default function CommunitySection() {
	const pillars = [
		{
			icon: <Heart className="text-brand-orange" size={28} />,
			title: "Loving God",
			description: "We express our love for God through expressive worship and sincere devotion in everything we do.",
		},
		{
			icon: <Users className="text-brand-orange" size={28} />,
			title: "Loving People",
			description: "Community is at our core. We believe in building strong, supportive relationships that reflect Christ's love.",
		},
		{
			icon: <Target className="text-brand-orange" size={28} />,
			title: "Serving Others",
			description: "We are committed to being the hands and feet of Jesus within Gulu and reaching out to the world.",
		},
	];

	return (
		<section id="about" className="py-24 px-6 relative overflow-hidden">
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="relative"
				>
					<div className="relative rounded-3xl overflow-hidden shadow-2xl z-20">
						<Image
							src="/community.png"
							alt="Our Community"
							width={600}
							height={800}
							className="object-cover w-full h-[600px]"
						/>
					</div>
					{/* Decorative shapes */}
					<div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl z-10" />
					<div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl z-10" />
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Our DNA</span>
					<h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
						A Growing Family Rooted in <span className="text-brand-blue">Scripture</span>
					</h2>
					<p className="text-lg text-foreground/70 mb-12 leading-relaxed">
						Gulu Bible Community Church is more than just a place to attend on Sundays. We are a community of believers dedicated to growth, service, and the transformative power of God's word.
					</p>

					<div className="space-y-8">
						{pillars.map((pillar, idx) => (
							<div key={idx} className="flex gap-6 group">
								<div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-brand-orange/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
									{pillar.icon}
								</div>
								<div>
									<h3 className="text-xl font-bold mb-2 group-hover:text-brand-orange transition-colors">{pillar.title}</h3>
									<p className="text-foreground/60 leading-relaxed">{pillar.description}</p>
								</div>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
