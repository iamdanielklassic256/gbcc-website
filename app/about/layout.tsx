import type { Metadata } from "next";
import heroimg from '@/assets/images/about/ignite5.jpg'

export const metadata: Metadata = {
	title: "About Us",
	description: "Discover the history, leadership, and vision of Gulu Bible Community Church. From our humble beginnings in 2006 to over 50 churches planted today.",
	openGraph: {
		title: "Our Story | Gulu Bible Community Church",
		description: "Rooted in Gulu, growing in faith, and reaching the world with the unchanging Gospel of Jesus Christ.",
		url: "https://www.gulubcc.org/about",
		images: [
			{
				url: heroimg.src, 
				width: 1200,
				height: 630,
				alt: "Gulu Bible Community Church Family",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "About | Gulu Bible Community Church",
		description: "Tracing our footsteps from the first spark of vision to the 50+ churches planted today.",
		images: [heroimg.src],
	},
};

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
