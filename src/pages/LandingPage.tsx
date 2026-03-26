import { HeroSection } from "@/components/ui/hero-section-9";
import { DELTAHEDGE_PLANS, PricingSection } from "@/components/ui/pricing";

export default function LandingPage() {
  return (
    <div className="bg-[#05070b] text-white">
      <HeroSection />
      <PricingSection
        plans={DELTAHEDGE_PLANS}
        heading="Scegli quanti slot vuoi far lavorare"
        description="Parti gratis con 1 trade di prova. Quando vuoi andare live, scegli quanti slot attivare ogni mese oppure passa al piano annuale."
      />
    </div>
  );
}
