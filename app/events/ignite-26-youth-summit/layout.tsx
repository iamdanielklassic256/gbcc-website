import type { Metadata } from "next";

const SITE_URL = "https://www.gulubcc.org";
const FALLBACK_IMAGE = `${SITE_URL}/hero.png`;

async function fetchEventImage(): Promise<string> {
	try {
		const apiBase =
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
		const res = await fetch(`${apiBase}/events`, {
			next: { revalidate: 3600 }, // cache for 1 hour
		});
		if (!res.ok) return FALLBACK_IMAGE;

		const data = await res.json();
		const list: Array<{ title: string; image?: string }> = Array.isArray(data)
			? data
			: (data?.data ?? data?.events ?? []);

		const match = list.find((e) =>
			e.title.toLowerCase().includes("ignite 26")
		);

		if (!match?.image) return FALLBACK_IMAGE;

		// If the image is a Google Drive URL, proxy it through our OG-image route
		// so social crawlers (which can't auth) get a clean image
		if (
			match.image.includes("drive.google.com") ||
			match.image.includes("googleusercontent.com")
		) {
			return `${SITE_URL}/api/og-image?url=${encodeURIComponent(match.image)}`;
		}

		// For S3 / direct URLs, use as-is
		return match.image;
	} catch {
		return FALLBACK_IMAGE;
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const imageUrl = await fetchEventImage();

	const title = "IGNITE 26 Youth Summit — Season 2 | GBCC";
	const description =
		"Five days of worship, biblical teaching, fellowship, and revival encounters. Knowing Your God as a Young Person. 24–28 August, Gulu Bible Community Church.";

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `${SITE_URL}/events/ignite-26-youth-summit`,
			siteName: "Gulu Bible Community Church",
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: "IGNITE 26 Youth Summit Season 2 — Gulu Bible Community Church",
				},
			],
			locale: "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [imageUrl],
		},
	};
}

export default function IgniteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}