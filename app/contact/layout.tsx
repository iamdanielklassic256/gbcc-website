import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Gulu Bible Community Church. Reach out for prayers, inquiries, or joining a ministry.",
  openGraph: {
    title: "Contact Gulu Bible Community Church",
    description: "Reach out to us today. We would love to hear from you and welcome you into our family.",
    url: "https://www.gulubcc.org/contact",
    // When you share this specific page on WhatsApp/Facebook, it will look for this image!
    // Simply place a "contact-og.jpg" inside your public folder.
    images: [
      {
        url: "/contact-og.jpg", // Create this image in the /public folder
        width: 1200,
        height: 630,
        alt: "Gulu Bible Community Church Contact Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Gulu Bible Community Church",
    description: "Reach out to us today. We would love to hear from you.",
    // Same for Twitter shares
    images: ["/contact-og.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
