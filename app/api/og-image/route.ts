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

function extractFileId(url: string): string | null {
  // ?id=FILE_ID
  const idParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParam) return idParam[1];
  // /file/d/FILE_ID/
  const fileSlug = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileSlug) return fileSlug[1];
  return null;
}

function getCandidateUrls(url: string): string[] {
  const fileId = extractFileId(url);
  if (!fileId) return [url];

  return [
    // 1. Thumbnail API — most reliable for OG images, no auth wall
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`,
    // 2. Direct view via googleusercontent (works when file is public)
    `https://lh3.googleusercontent.com/d/${fileId}`,
    // 3. Standard uc export
    `https://drive.google.com/uc?export=download&id=${fileId}`,
    // 4. Original URL as last resort
    url,
  ];
}

async function tryFetchImage(url: string): Promise<Response | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
      },
      redirect: 'follow',
    });

    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) return null;

    return res;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get('url');

  if (!imageUrl || !isAllowedUrl(imageUrl)) {
    return new NextResponse('Invalid or disallowed URL', { status: 400 });
  }

  const candidates = getCandidateUrls(imageUrl);

  for (const candidate of candidates) {
    const res = await tryFetchImage(candidate);
    if (res) {
      const contentType = res.headers.get('content-type') || 'image/jpeg';
      const buffer = await res.arrayBuffer();

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
      });
    }
  }

  return new NextResponse('Could not fetch image from Google Drive', { status: 502 });
}