import type { Metadata } from "next";
import heroimg from '@/assets/images/about/ignite5.jpg'

export const metadata: Metadata = {
	title: "Our Ministries",
	description: "Discover our diverse ministries at Gulu Bible Community Church. From Spark Youth to Outreach, find a community where you can grow and serve.",
	openGraph: {
		title: "Experience Life Together | GBCC Ministries",
		description: "Find your place in our church family. Explore our youth, women, men, and outreach programs.",
		url: "https://www.gulubcc.org/church-ministries",
		images: [
			{
				url: heroimg.src, 
				width: 1200,
				height: 630,
				alt: "Gulu Bible Community Church Ministries",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Ministries | Gulu Bible Community Church",
		description: "Finding your place in God's story. Join a ministry today.",
		images: [heroimg.src],
	},
};

export default function MinistriesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
