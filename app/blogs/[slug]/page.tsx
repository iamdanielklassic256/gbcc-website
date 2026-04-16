import { Metadata } from 'next';
import BlogClientPage from './BlogClientPage';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowLeft, AlertCircle } from "lucide-react";
import Link from 'next/link';

interface BlogPost {
	id: string;
	title: string;
	slug: string;
	content: string;
	excerpt: string;
	coverImage: string;
	tags: string;
	category: string;
	author: string;
	status: string;
	isFeatured: boolean;
	publishedAt: string;
	viewCount: number;
	createdAt: string;
	updatedAt: string;
}

async function getBlogs(): Promise<BlogPost[]> {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005/api/v1";
		// cache: 'no-store' ensures dynamic updates, preventing stale NextJS cache bugs that cause fetch errors
		const res = await fetch(`${apiUrl}/blogs`, { cache: 'no-store' });
		if (!res.ok) return [];
		const blogs: BlogPost[] = await res.json();
		return blogs.filter((b) => b.status === "published");
	} catch (error) {
		console.error("Failed to fetch blogs on server:", error);
		return [];
	}
}

function toOgImageUrl(coverImage: string | null | undefined): string | null {
  if (!coverImage) return null;

  const isGoogleHosted =
    coverImage.includes('drive.google.com') ||
    coverImage.includes('googleusercontent.com');

  if (isGoogleHosted) {
    // Extract the file ID and use the thumbnail endpoint instead
    const idMatch = coverImage.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      const fileId = idMatch[1];
      const driveUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
      return `https://www.gulubcc.org/api/og-image?url=${encodeURIComponent(driveUrl)}`;
    }
  }

  if (coverImage.startsWith('/')) {
    return `https://www.gulubcc.org${coverImage}`;
  }

  return coverImage;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	// Await the params object in Next.js 15+ 
	const { slug } = await params;
	const decodedSlug = decodeURIComponent(slug);

	const allBlogs = await getBlogs();
	const post = allBlogs.find((b) => b.slug.toLowerCase() === decodedSlug.toLowerCase());

	if (!post) {
		return {
			title: 'Article Not Found | GBCC',
			description: 'The article you are looking for does not exist.',
		};
	}

	const ogImage = toOgImageUrl(post.coverImage);

	return {
		title: `${post.title} | GBCC Blogs`,
		description: post.excerpt || post.content?.substring(0, 160) || 'Read this article from Gulu Bible Community Church.',
		openGraph: {
			title: post.title,
			description: post.excerpt || post.content?.substring(0, 160),
			url: `https://www.gulubcc.org/blogs/${post.slug}`,
			siteName: 'Gulu Bible Community Church',
			...(ogImage && {
				images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
			}),
			locale: 'en_US',
			type: 'article',
			publishedTime: post.publishedAt || post.createdAt,
			authors: [post.author || 'GBCC Writer'],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.excerpt || post.content?.substring(0, 160),
			...(ogImage && { images: [ogImage] }),
		},
	};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const decodedSlug = decodeURIComponent(slug);
	const allBlogs = await getBlogs();
	
	
	// Better matching logic (case-insensitive)
	const post = allBlogs.find((b) => b.slug.toLowerCase() === decodedSlug.toLowerCase());
	const relatedPosts = allBlogs.filter((b) => b.slug.toLowerCase() !== decodedSlug.toLowerCase()).slice(0, 3);

	console.log('fetched blog, ', post)

	

	if (!post) {
		return (
			<main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
				<Navbar />
				<div className="flex flex-col items-center justify-center py-40 px-6">
					<div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
						<BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600" />
					</div>
					<h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
						Article Not Found
					</h1>
					<p className="text-slate-500 dark:text-slate-400 mb-8">
						The article you are looking for does not exist or has been removed.
					</p>
					<Link
						href="/blogs"
						className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-orange/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
					>
						<ArrowLeft size={16} />
						Back to Blog
					</Link>
				</div>
				<Footer />
			</main>
		);
	}

	return <BlogClientPage post={post} relatedPosts={relatedPosts} />;
}
