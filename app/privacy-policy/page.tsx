import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Gulu Bible Community Church",
  description:
    "Privacy Policy for Gulu Bible Community Church (GBCC), Gulu, Uganda.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-slate-900 text-white">
          <div className="mx-auto max-w-5xl px-6 py-20">

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-orange-500 pt-6">
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              We value your trust and are committed to protecting your privacy
              when you interact with GBCC and our website.
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Last updated: October 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="prose prose-slate max-w-none">
            <h2>1. Introduction</h2>

            <p>
              Gulu Bible Community Church (GBCC) respects your privacy and is
              committed to protecting the personal information you choose to
              share with us.
            </p>

            <p>
              This Privacy Policy explains how information may be collected,
              used, stored, and protected when you visit our website,
              communicate with us, subscribe to our updates, participate in
              church activities, or use services provided through our website.
            </p>

            <h2>2. Information We May Collect</h2>

            <p>
              Depending on how you interact with GBCC, we may collect
              information such as:
            </p>

            <ul>
              <li>Your name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Information submitted through contact forms</li>
              <li>Newsletter subscription information</li>
              <li>Event registration information</li>
              <li>Giving or donation information processed through third-party services</li>
              <li>Information you voluntarily provide when contacting the church</li>
            </ul>

            <h2>3. How We Use Information</h2>

            <p>
              Information provided to GBCC may be used to:
            </p>

            <ul>
              <li>Respond to inquiries and requests</li>
              <li>Communicate church news and announcements</li>
              <li>Provide information about events and ministries</li>
              <li>Process registrations and requests</li>
              <li>Provide pastoral or ministry-related communication</li>
              <li>Improve our website and digital services</li>
              <li>Support church programs and activities</li>
            </ul>

            <h2>4. Newsletter and Communications</h2>

            <p>
              If you subscribe to our newsletter or other communications, we
              may use your email address to send you devotionals, church news,
              announcements, events, and other relevant information.
            </p>

            <p>
              You may unsubscribe from these communications at any time using
              the unsubscribe option provided in the communication.
            </p>

            <h2>5. Cookies and Website Analytics</h2>

            <p>
              Our website may use cookies or similar technologies to improve
              functionality, understand website usage, and provide a better
              experience.
            </p>

            <p>
              Where third-party services are used, those services may process
              information according to their own privacy policies.
            </p>

            <h2>6. Third-Party Services</h2>

            <p>
              GBCC may use trusted third-party services for functions such as
              online giving, email communication, video streaming, analytics,
              hosting, and other website functionality.
            </p>

            <p>
              When you interact with these services, your information may be
              processed according to the privacy policies of the respective
              service providers.
            </p>

            <h2>7. Data Security</h2>

            <p>
              We take reasonable measures to protect information submitted
              through our website. However, no internet-based system can be
              guaranteed to be completely secure.
            </p>

            <h2>8. Children's Privacy</h2>

            <p>
              We encourage parents and guardians to be involved in children's
              online activities. Where information concerning children is
              collected for church programs or ministry activities, we seek to
              handle that information responsibly and for legitimate ministry
              purposes.
            </p>

            <h2>9. Your Privacy Choices</h2>

            <p>
              You may contact GBCC if you would like to request information
              about personal data we may hold about you, request correction of
              inaccurate information, or ask us to stop certain communications.
            </p>

            <h2>10. Changes to This Policy</h2>

            <p>
              GBCC may update this Privacy Policy from time to time. Any
              significant changes will be reflected on this page with an
              updated date.
            </p>

            <h2>11. Contact Us</h2>

            <p>
              If you have questions about this Privacy Policy or how your
              information is handled, please contact us:
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