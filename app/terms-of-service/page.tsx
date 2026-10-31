import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Gulu Bible Community Church",
  description:
    "Terms of Service for Gulu Bible Community Church (GBCC), Gulu, Uganda.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-slate-900 text-white">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-orange-500 pt-6">
              Terms of Service
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Please read these terms before using the GBCC website and its
              services.
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Last updated: October 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="prose prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>

            <p>
              By accessing or using the Gulu Bible Community Church (GBCC)
              website, you agree to comply with these Terms of Service.
            </p>

            <p>
              If you do not agree with these terms, please do not use the
              website or its services.
            </p>

            <h2>2. About the Website</h2>

            <p>
              The GBCC website provides information about the church, its
              ministries, events, sermons, church plants, projects,
              announcements, and other activities.
            </p>

            <h2>3. Website Content</h2>

            <p>
              Unless otherwise indicated, content published on this website,
              including text, graphics, photographs, videos, logos, and other
              materials, is provided for informational, ministry, and
              educational purposes.
            </p>

            <p>
              You may not reproduce, modify, distribute, sell, or commercially
              exploit website content without appropriate permission.
            </p>

            <h2>4. Sermons and Media</h2>

            <p>
              Sermons, teachings, photographs, videos, and other media may be
              published on the website to encourage spiritual growth and
              communicate the ministry of GBCC.
            </p>

            <p>
              Content should not be reproduced or commercially distributed
              without permission from the appropriate copyright holder.
            </p>

            <h2>5. User Submissions</h2>

            <p>
              If you submit information through a contact form, registration
              form, inquiry, testimony, or other communication channel, you
              agree that the information provided is accurate and that you have
              the right to submit it.
            </p>

            <h2>6. Online Giving</h2>

            <p>
              GBCC may provide links or integrations to third-party platforms
              for online giving and donations.
            </p>

            <p>
              Payments processed through third-party services may be subject to
              the terms, conditions, and privacy policies of those providers.
            </p>

            <h2>7. External Links</h2>

            <p>
              The GBCC website may contain links to websites or services
              operated by third parties.
            </p>

            <p>
              GBCC is not responsible for the content, availability, security,
              or privacy practices of external websites.
            </p>

            <h2>8. Website Availability</h2>

            <p>
              We aim to keep the website available and accurate, but we do not
              guarantee that the website will always be available, error-free,
              or free from interruptions.
            </p>

            <h2>9. Prohibited Use</h2>

            <p>
              Users must not use the website to:
            </p>

            <ul>
              <li>Engage in unlawful activities</li>
              <li>Attempt to gain unauthorized access to systems</li>
              <li>Interfere with the operation or security of the website</li>
              <li>Upload malicious software or harmful content</li>
              <li>Impersonate another person or organization</li>
              <li>Abuse contact forms or other communication services</li>
            </ul>

            <h2>10. Intellectual Property</h2>

            <p>
              Unless otherwise stated, the GBCC name, branding, website
              content, graphics, media, and other materials are protected by
              applicable intellectual property laws.
            </p>

            <p>
              Permission may be required before reproducing or distributing
              protected materials.
            </p>

            <h2>11. Disclaimer</h2>

            <p>
              Information on this website is provided in good faith for
              ministry, informational, and educational purposes. While we aim
              to keep information accurate and current, errors or changes may
              occasionally occur.
            </p>

            <h2>12. Changes to These Terms</h2>

            <p>
              GBCC may update these Terms of Service from time to time. Changes
              will become effective when the updated terms are published on this
              page.
            </p>

            <h2>13. Contact Us</h2>

            <p>
              If you have questions about these Terms of Service, please
              contact Gulu Bible Community Church.
            </p>

            <div className="not-prose mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">
                Gulu Bible Community Church
              </p>

              <p className="mt-2 text-slate-600">
                Plot 1450 Airfield Road
                <br />
                Gulu City, Uganda
              </p>

              <p className="mt-3 text-slate-600">
                Phone: +256 772 44 9291
              </p>

              <p className="text-slate-600">
                Email: media@gulubcc.org
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}