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
			e.title.toLowerCase().includes("young pastors")
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

	const title = "Young Pastors & Leaders Conference 2026 | GBCC";
	const description =
		"Join pastors and ministry leaders from across the region for three days of powerful teaching, worship, fellowship, and equipping. May 13–15, 2026 at Gulu Bible Community Church.";

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `${SITE_URL}/events/young-pastors-leaders-conference`,
			siteName: "Gulu Bible Community Church",
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: "Young Pastors & Leaders Conference 2026 — Gulu Bible Community Church",
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

export default function YoungPastorsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
