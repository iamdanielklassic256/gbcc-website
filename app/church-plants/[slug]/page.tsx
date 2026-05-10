import { Metadata } from "next";
import type { ChurchPlant } from "@/app/church-plants/page";
import ChurchPlantClientPage from "./ChurchPlantClientPage";

const SITE_URL = "https://www.gulubcc.org";
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=1200";

async function getPlant(slug: string): Promise<ChurchPlant | null> {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
		const res = await fetch(`${apiUrl}/church_branches/${slug}`, { cache: "no-store" });
		if (!res.ok) return null;
		const data: ChurchPlant = await res.json();
		return data.isActive ? data : null;
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const plant = await getPlant(slug);

	if (!plant) {
		return {
			title: "Church Plant Not Found | GBCC",
			description: "This church plant does not exist or is no longer active.",
		};
	}

	const ogImage = plant.image || FALLBACK_IMAGE;
	const description =
		plant.description.replace(/<[^>]*>/g, "").slice(0, 160) ||
		`${plant.name} is an active church plant by Gulu Bible Community Church, located in ${plant.location}.`;

	return {
		title: `${plant.name} | Church Plants | GBCC`,
		description,
		openGraph: {
			title: `${plant.name} | GBCC Church Plants`,
			description,
			url: `${SITE_URL}/church-plants/${plant.slug}`,
			siteName: "Gulu Bible Community Church",
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: plant.name,
				},
			],
			locale: "en_UG",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: `${plant.name} | GBCC Church Plants`,
			description,
			images: [ogImage],
		},
		alternates: {
			canonical: `${SITE_URL}/church-plants/${plant.slug}`,
		},
	};
}

export default async function ChurchPlantPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const plant = await getPlant(slug);
	return <ChurchPlantClientPage plant={plant} />;
}
