import { Link } from "react-router-dom";
import { Bike, Dumbbell, Shirt, Watch } from "lucide-react";

const categories = [
  {
    title: "Cycling Gear",
    description: "Jackets, caps & riding essentials",
    icon: Bike,
    query: "cycling",
    gradient: "from-orange-600/20 to-red-600/20",
  },
  {
    title: "Fitness Equipment",
    description: "Resistance bands, mats & tools",
    icon: Dumbbell,
    query: "fitness",
    gradient: "from-blue-600/20 to-purple-600/20",
  },
  {
    title: "Activewear",
    description: "Compression wear, shirts & pants",
    icon: Shirt,
    query: "activewear",
    gradient: "from-green-600/20 to-teal-600/20",
  },
  {
    title: "Accessories",
    description: "Straps, grips & more",
    icon: Watch,
    query: "accessories",
    gradient: "from-pink-600/20 to-rose-600/20",
  },
];

export const CategoryGrid = () => {
  return (
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            SHOP BY <span className="text-gradient">CATEGORY</span>
          </h2>
          <p className="text-muted-foreground mt-2">Find exactly what you need</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={`/shop?category=${cat.query}`}
              className={`group relative p-6 md:p-8 rounded-xl border border-border/50 bg-gradient-to-br ${cat.gradient} hover:border-primary/30 transition-all duration-300 hover:shadow-card`}
            >
              <cat.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-foreground text-lg mb-1">{cat.title}</h3>
              <p className="text-sm text-muted-foreground">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
