import { Metadata } from 'next'; // 1. Import the Metadata type
import Navbar from './components/Nav';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import AboutSection from './components/AboutSection';
import ServicePillars from './components/ServicePillars';
import PortfolioSpotlight from './components/PortfolioSpotlight';
import TrustSection from './components/TrustSection';
import TechStack from './components/TechStack';
import TrustSecurity from './components/Trust';
import FinalCTA from './components/FinalCTA';
import Footer from './components/footer';

// 2. Export the metadata object
export const metadata: Metadata = {
  title: 'Executive VA | Elite Support for High-Stakes Leadership',
  description: 'Executtive Virtual Assistant and operational excellence by Fortune Chamberlain. Elite support that buys back time.',
  openGraph: {
    title: 'Executive Aero | Elite Support',
    description: 'Strategic partnership and operational architecting.',
    images: ['https://pub-d601c571f0b54a8489f5bcee7f72415b.r2.dev/Hero1.png'],
  },
  other: {
    'script:ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Executive Aero",
      "image": "https://pub-d601c571f0b54a8489f5bcee7f72415b.r2.dev/Hero1.png",
      "description": "Elite strategic support for high-stakes leadership.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "url": "https://executiveaero.com"
    })
}
};

export default function Home() {
  return (
    <main className="relative flex flex-col bg-brand-black">
      <Navbar />
      <Hero />
      <section id='value'> <ValueProposition /> </section>
      <section id="about"><AboutSection /></section>
      <section id="pillars"><ServicePillars /></section>
      <section id="portfolio"><PortfolioSpotlight /></section>
      <section id='testimonials'> <TrustSection />   </section>
      <section id='tech'> <TechStack /> </section>
      <section id="trusts"><TrustSecurity /></section>
      <section id="contact"><FinalCTA /></section>
      <Footer />
    </main>
  );
}