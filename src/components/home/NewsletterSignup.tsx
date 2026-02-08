import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're in! 🔥", {
        description: "Welcome to the FITNEX community.",
        position: "top-center",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="mx-auto w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-glow">
            <Mail className="h-6 w-6 text-primary-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            JOIN THE <span className="text-gradient">MOVEMENT</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Get exclusive drops, workout tips, and special discounts delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary border-border flex-1"
              required
            />
            <Button type="submit" className="gradient-primary text-primary-foreground font-bold">
              Subscribe <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
