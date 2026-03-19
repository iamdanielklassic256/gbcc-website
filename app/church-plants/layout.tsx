import type { Metadata } from "next";
import heroimg from '@/assets/images/about/ignite5.jpg'

export const metadata: Metadata = {
	title: "Church Plants",
	description: "Expanding God's kingdom across Northern Uganda through over 50 regional church plants. Our goal is 1000 gospel-centered churches and 1000 leaders.",
	openGraph: {
		title: "Planting 1000 Churches | GBCC Church Plants",
		description: "Follow our journey as we plant 1000 churches and equip 1000 leaders in Northern Uganda and beyond.",
		url: "https://www.gulubcc.org/church-plants",
		images: [
			{
				url: "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=1200", 
				width: 1200,
				height: 630,
				alt: "GBCC 1000 Churches & 1000 Leaders Goal",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Church Plants | Gulu Bible Community Church",
		description: "Our mission to plant 1000 churches and thousand lives transformed by the Gospel.",
		images: ["https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=1200"],
	},
};

export default function ChurchPlantsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
