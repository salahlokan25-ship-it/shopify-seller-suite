import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const values = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On every order, worldwide. No minimums, no tricks.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Premium materials built to withstand your toughest sessions.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Not the right fit? Return hassle-free within 30 days.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Questions? Our team is always here to help you out.",
  },
];

export const ValuePropositions = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            WHY <span className="text-gradient">FITNEX</span>?
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item) => (
            <div key={item.title} className="text-center space-y-3">
              <div className="mx-auto w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                <item.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
