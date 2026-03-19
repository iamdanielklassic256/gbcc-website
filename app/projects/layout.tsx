import type { Metadata } from "next";
import heroimg from '@/assets/images/about/ignite5.jpg'
import students from '@/assets/projects/empower.jpg'

export const metadata: Metadata = {
	title: "Our Projects",
	description: "Holistic sustainable transformation through Christ-centered initiatives. From schools to skills training, discover how we're making a difference.",
	openGraph: {
		title: "Transforming Communities | GBCC Projects",
		description: "Explore our initiatives like Hope of Glory Christian School and Empowering Ugandans Training.",
		url: "https://www.gulubcc.org/projects",
		images: [
			{
				url: students.src, 
				width: 1200,
				height: 630,
				alt: "Gulu Bible Community Church Projects",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Projects | Gulu Bible Community Church",
		description: "Empowering individuals with practical skills and spiritual guidance.",
		images: [students.src],
	},
};

export default function ProjectsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
