import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.gulubcc.org/#organization",
      "name": "Gulu Bible Community Church",
      "url": "https://www.gulubcc.org",
      "logo": "https://www.gulubcc.org/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+256-772-44-9291",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.facebook.com/Gulu.Bible.Community.Church",
        "https://x.com/gulubible",
        "https://www.youtube.com/@gulubiblecommunitychurch",
        "https://www.tiktok.com/@gulubiblecommunitychurch"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gulubcc.org/#website",
      "url": "https://www.gulubcc.org",
      "name": "Gulu Bible Community Church",
      "description": "Welcome to Gulu Bible Community Church. With God all things are possible. Join us for worship, community, and the word of God in Gulu, Uganda.",
      "publisher": {
        "@id": "https://www.gulubcc.org/#organization"
      }
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gulubcc.org'),
  title: {
    default: "Gulu Bible Community Church - GBCC | With God all things are possible",
    template: "%s | Gulu Bible Community Church",
    
  },
  description: "Welcome to Gulu Bible Community Church. With God all things are possible. Join us for worship, community, and the word of God in Gulu, Uganda.",
  keywords: ["Church in Gulu", "Gulu Bible Community Church", "GBCC", "Uganda Church", "Christianity in Gulu", "Bible Church Uganda"],
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Gulu Bible Community Church - GBCC",
    description: "Welcome to Gulu Bible Community Church. With God all things are possible. Join us for worship, community, and the word of God in Gulu, Uganda.",
    url: "https://www.gulubcc.org",
    siteName: "Gulu Bible Community Church",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Gulu Bible Community Church Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gulu Bible Community Church",
    description: "Welcome to Gulu Bible Community Church in Gulu, Uganda.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F47C35" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" }
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
