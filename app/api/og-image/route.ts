import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_HOSTNAMES = [
	'drive.google.com',
	'lh3.googleusercontent.com',
	'lh4.googleusercontent.com',
	'lh5.googleusercontent.com',
	'lh6.googleusercontent.com',
];

function isAllowedUrl(url: string): boolean {
	try {
		const { hostname } = new URL(url);
		return ALLOWED_HOSTNAMES.includes(hostname);
	} catch {
		return false;
	}
}

function toDirectDownloadUrl(url: string): string {
	// Convert https://drive.google.com/uc?id=FILE_ID  or
	//         https://drive.google.com/file/d/FILE_ID/view
	// to      https://drive.google.com/uc?export=download&id=FILE_ID
	const idParam = url.match(/[?&]id=([^&]+)/);
	if (idParam) {
		return `https://drive.google.com/uc?export=download&id=${idParam[1]}`;
	}
	const fileSlug = url.match(/\/file\/d\/([^/]+)/);
	if (fileSlug) {
		return `https://drive.google.com/uc?export=download&id=${fileSlug[1]}`;
	}
	return url;
}

export async function GET(request: NextRequest) {
	const imageUrl = request.nextUrl.searchParams.get('url');

	if (!imageUrl || !isAllowedUrl(imageUrl)) {
		return new NextResponse('Invalid or disallowed URL', { status: 400 });
	}

	try {
		const fetchUrl = toDirectDownloadUrl(imageUrl);

		const response = await fetch(fetchUrl, {
			headers: { 'User-Agent': 'Mozilla/5.0' },
			redirect: 'follow',
		});

		if (!response.ok) {
			return new NextResponse('Failed to fetch image', { status: 502 });
		}

		const contentType = response.headers.get('content-type') || 'image/jpeg';

		if (!contentType.startsWith('image/')) {
			return new NextResponse('Not an image', { status: 400 });
		}

		const buffer = await response.arrayBuffer();

		return new NextResponse(buffer, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=86400, s-maxage=86400',
			},
		});
	} catch {
		return new NextResponse('Failed to proxy image', { status: 500 });
	}
}
