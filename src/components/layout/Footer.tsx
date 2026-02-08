import { Link } from "react-router-dom";
import { Dumbbell, Instagram, Facebook, Twitter, Youtube, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing!", { description: "You'll hear from us soon." });
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="text-gradient">FITNEX</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium fitness gear and activewear to fuel your passion. Push boundaries, break limits.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shop All</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categories</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/shop?category=cycling" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cycling Gear</Link>
              <Link to="/shop?category=fitness" className="text-sm text-muted-foreground hover:text-primary transition-colors">Fitness Equipment</Link>
              <Link to="/shop?category=activewear" className="text-sm text-muted-foreground hover:text-primary transition-colors">Activewear</Link>
              <Link to="/shop?category=accessories" className="text-sm text-muted-foreground hover:text-primary transition-colors">Accessories</Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Get exclusive deals and fitness tips.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-border"
                required
              />
              <Button type="submit" size="icon" className="gradient-primary shrink-0">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FITNEX. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            📍 Hay El Farah • Free Shipping on All Orders
          </p>
        </div>
      </div>
    </footer>
  );
};
