"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import BlogSection from "@/components/home/BlogSection";
import GettingStarted from "@/components/home/GettingStarted";
import CoreIdentity from "@/components/home/CoreIdentity";
import UpdateSection from "@/components/home/UpdateSection";
import SermonSection from "@/components/home/SermonSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
	return (
		<main className="min-h-screen bg-white dark:bg-[#020617]">
			<Navbar />
			<HeroSection />
			<GettingStarted />
			<CoreIdentity />
			<UpdateSection />
			<SermonSection />
			<FeatureSection />
			<BlogSection />
			<NewsletterSection />
			<Footer />
		</main>
	);
}
