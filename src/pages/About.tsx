import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, Target, Heart, Zap, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Performance First",
    description: "Every product is tested by athletes to ensure it meets the highest standards of performance and durability.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "We're more than a store — we're a community of fitness enthusiasts pushing each other to be better every day.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously seek out the latest in fitness technology and materials to bring you cutting-edge gear.",
  },
  {
    icon: Dumbbell,
    title: "Accessibility",
    description: "Premium fitness gear shouldn't break the bank. We offer top quality at prices that make sense.",
  },
];

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              OUR <span className="text-gradient">STORY</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              FITNEX was born from a simple belief: everyone deserves access to premium fitness gear 
              that performs as hard as they do. We started as fitness enthusiasts tired of choosing between 
              quality and affordability — so we created a brand that delivers both.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                FUELING YOUR <span className="text-gradient">PASSION</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                From our base in Hay El Farah, we source and curate the finest fitness equipment, 
                activewear, and accessories from around the world. Every product in our collection 
                has been hand-picked and tested to ensure it meets our rigorous standards.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're a seasoned athlete or just starting your fitness journey, 
                we're here to equip you with the gear you need to crush your goals. No excuses, 
                no compromises — just results.
              </p>
              <Button asChild className="gradient-primary text-primary-foreground font-bold">
                <Link to="/shop">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Dumbbell className="h-32 w-32 text-primary/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              WHAT WE <span className="text-gradient">STAND FOR</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item) => (
              <div key={item.title} className="text-center space-y-4 p-6 rounded-xl bg-card border border-border/50">
                <div className="mx-auto w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
