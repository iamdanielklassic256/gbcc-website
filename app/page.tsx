import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CommunitySection from "@/components/CommunitySection";
import SermonSection from "@/components/SermonSection";
import Footer from "@/components/Footer";
import { Clock, MapPin, Phone } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CommunitySection />

      {/* Service Times Section */}
      <section className="py-24 px-6 bg-brand-blue text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Visit Us This Weekend</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              We have multiple services designed to help you connect with God and our community. Every person is welcome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center group hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-brand-orange mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Service Times</h3>
              <p className="text-white/80 leading-relaxed">
                Sunday Morning: 9:00 AM<br />
                Main Service: 11:30 AM<br />
                Mid-week Prayer: Wednesday 6:00 PM
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center group hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-brand-orange mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <MapPin size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Location</h3>
              <p className="text-white/80 leading-relaxed">
                Plot 1450 Airfield Road<br />
                Gulu City<br />
                Uganda, East Africa
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center group hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-brand-orange mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Phone size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
              <p className="text-white/80 leading-relaxed">
                +256 772 44 9291<br />
                administrator@gulubcc.org<br />
                Available: Mon-Sat, 9AM-5PM
              </p>
            </div>
          </div>
        </div>
      </section>

      <SermonSection />

      {/* Give CTA */}
      <section id="give" className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto rounded-[40px] bg-slate-950 p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/20 blur-[100px]" />

          <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">Supporting the <span className="text-brand-orange italic">Mission</span></h2>
          <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto relative z-10">
            Your generosity helps us bring the Gospel to Gulu and support our community. Give securely online today.
          </p>
          <button className="bg-brand-orange hover:bg-brand-orange/90 text-white px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-orange/20 relative z-10">
            Give Now
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
