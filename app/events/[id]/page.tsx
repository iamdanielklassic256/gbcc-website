import { Metadata } from 'next';
import EventClientPage from './EventClientPage';

interface EventItem {
	id: string;
	title: string;
	description: string;
	date: string;
	duration: string;
	location: string;
	image: string;
}

async function getEvent(id: string): Promise<EventItem | null> {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
		// If there is no specific /events/:id endpoint, we can fetch all and find
		const res = await fetch(`${apiUrl}/events`, { cache: 'no-store' });
		if (!res.ok) return null;
		const events: EventItem[] = await res.json();
		return events.find((e) => String(e.id) === String(id)) || null;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	// Awaiting params is required in Next.js 15+ if you use dynamic APIs, but safe to just use params.id for now.
	const event = await getEvent(params.id);

	if (!event) {
		return {
			title: 'Event Not Found | GBCC',
			description: 'The event you are looking for does not exist.',
		};
	}

	const fallbackImage = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200';
	const ogImage = event.image || fallbackImage;

	return {
		title: `${event.title} | GBCC Events`,
		description: event.description || 'Join us for this upcoming event at Gulu Bible Community Church.',
		openGraph: {
			title: event.title,
			description: event.description || 'Join us for this upcoming event at Gulu Bible Community Church.',
			url: `https://www.gulubcc.org/events/${event.id}`,
			siteName: 'Gulu Bible Community Church',
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: event.title,
				},
			],
			locale: 'en_US',
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: event.title,
			description: event.description || 'Join us for this upcoming event at Gulu Bible Community Church.',
			images: [ogImage],
		},
	};
}

export default async function EventPage({ params }: { params: { id: string } }) {
	const initEvent = await getEvent(params.id);
	
	// Pass the data to a client component for interactive features, or render directly here.
	// We will render it directly since it's an event details page!
	return <EventClientPage initialEvent={initEvent} id={params.id} />;
}
