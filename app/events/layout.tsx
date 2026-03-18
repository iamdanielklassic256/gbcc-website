import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Upcoming Events | GBCC',
	description: 'There is always something happening at GBCC. Join us for worship, fellowship, and community events.',
	openGraph: {
		title: 'Upcoming Events | GBCC',
		description: 'There is always something happening at GBCC. Join us for worship, fellowship, and community events.',
		url: 'https://www.gulubcc.org/events',
		siteName: 'Gulu Bible Community Church',
		images: [
			{
				url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200',
				width: 1200,
				height: 630,
				alt: 'Events at GBCC',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Upcoming Events | GBCC',
		description: 'There is always something happening at GBCC. Join us for worship, fellowship, and community events.',
		images: ['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200'],
	},
};

export default function EventsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
