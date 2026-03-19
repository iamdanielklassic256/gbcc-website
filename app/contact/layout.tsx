import type { Metadata } from "next";
import contactbanner from '@/assets/images/about/contactbanner.jpg'

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
        url: contactbanner.src, 
        width: 1200,
        height: 630,
        alt: "Gulu Bible Community Church Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Gulu Bible Community Church",
    description: "Reach out to us today. We would love to hear from you.",
    images: ["/community.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
