import LoadingScreen from "@/components/LoadingScreen";
import NavMultilevel from "@/components/NavMultilevel";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import ComoFunciona from "@/components/ComoFunciona";
import HighlightSection from "@/components/HighlightSection";
import Rutas from "@/components/Rutas";
import Testimonios from "@/components/Testimonios";
import StickySteps from "@/components/StickySteps";
import GrupoVIP from "@/components/GrupoVIP";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <NavMultilevel transparent />
      <div data-main="" className="relative z-[2] bg-page">
        <main>
          <Hero />
          <SocialProof />
          <ComoFunciona />
          <HighlightSection
            headline="Booking te da un precio. Nosotros te damos tranquilidad."
            subtitle="Más de 20 años en biliettería aérea. Comparamos +20 aerolíneas, incluimos tu equipaje y te acompañamos hasta que aterrizas."
          />
          <Rutas />
          <Testimonios />
          <StickySteps />
          <GrupoVIP />
          <FAQ />
          <Footer />
        </main>
      </div>
    </>
  );
}
