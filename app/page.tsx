// Force dynamic rendering to avoid static prerender issues with Next.js 16 Turbopack
export const dynamic = "force-dynamic";

import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import OurStory from "@/components/sections/OurStory";
import WeddingDetails from "@/components/sections/WeddingDetails";
import Gallery from "@/components/sections/Gallery";
import Gifting from "@/components/sections/Gifting";
import Registry from "@/components/sections/Registry";
import RSVP from "@/components/sections/RSVP";
import WellWishes from "@/components/sections/WellWishes";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <OurStory />
        <Gallery />
        <WellWishes />
        <Gifting />
        <Registry />
        <RSVP />
        <WeddingDetails />
      </main>
      <Footer />
    </>
  );
}
