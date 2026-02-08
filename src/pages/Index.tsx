import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ValuePropositions } from "@/components/home/ValuePropositions";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <ValuePropositions />
      <NewsletterSignup />
    </main>
  );
};

export default Index;
