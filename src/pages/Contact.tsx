import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Clock, Send, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    toast.success("Message sent! 💪", {
      description: "We'll get back to you soon.",
      position: "top-center",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="py-8 md:py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            GET IN <span className="text-gradient">TOUCH</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Questions? Feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="p-6 md:p-8 rounded-xl bg-card border border-border/50">
            <h2 className="text-xl font-bold text-foreground mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  className="bg-secondary border-border"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  className="bg-secondary border-border"
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help?"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  className="bg-secondary border-border"
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground font-bold" size="lg">
                <Send className="h-4 w-4 mr-2" /> Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-sm text-muted-foreground">Hay El Farah</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-sm text-muted-foreground">support@fitnex.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Hours</h3>
                  <p className="text-sm text-muted-foreground">Mon - Fri: 9AM - 6PM</p>
                  <p className="text-sm text-muted-foreground">Sat - Sun: 10AM - 4PM</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="p-3 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
