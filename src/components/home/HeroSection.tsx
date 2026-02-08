import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-fitness.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fitness athlete in action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Free Shipping on All Orders</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
            PUSH YOUR{" "}
            <span className="text-gradient">LIMITS</span>
            <br />
            EVERY DAY
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Premium fitness gear and activewear designed for athletes who never settle. 
            Gear up. Show up. Dominate.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground font-bold text-base px-8 shadow-glow">
              <Link to="/shop">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary font-bold text-base px-8">
              <Link to="/about">
                Our Story
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
