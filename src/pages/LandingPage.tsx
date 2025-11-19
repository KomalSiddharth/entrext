import { useState, useEffect } from "react";
import { Heart, Users, Briefcase, UserPlus, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { addToWaitlist } from "@/db/api";
import { Card, CardContent } from "@/components/ui/card";

interface WaitlistForm {
  email: string;
}

export default function LandingPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<WaitlistForm>({
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll(".fade-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: WaitlistForm) => {
    setIsSubmitting(true);
    try {
      await addToWaitlist(data.email);
      toast({
        title: "Welcome to the waitlist! 🌿",
        description: "We'll notify you when Companion launches.",
      });
      setIsWaitlistOpen(false);
      form.reset();
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string };
      if (err.code === "23505") {
        toast({
          title: "Already on the list!",
          description: "This email is already registered for the waitlist.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const connectionModes = [
    {
      icon: Heart,
      title: "Date Mode",
      emoji: "❤️",
      description: "Meet someone special naturally",
      color: "mode-date",
    },
    {
      icon: UserPlus,
      title: "Friend Mode",
      emoji: "🤝",
      description: "Find good people to hang out with",
      color: "mode-friend",
    },
    {
      icon: Users,
      title: "Group Mode",
      emoji: "👥",
      description: "Join circles that feel like home",
      color: "mode-group",
    },
    {
      icon: Briefcase,
      title: "Business Mode",
      emoji: "💼",
      description: "Meet people who work like you — and get you",
      color: "mode-business",
    },
  ];

  const differentiators = [
    "No fake profiles",
    "No weird messages",
    "No pressure",
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Post 3 moments per week",
        "Join unlimited activities",
        "Basic matching",
        "Community access",
      ],
    },
    {
      name: "Companion Plus",
      price: "$9.99",
      period: "per month",
      features: [
        "Unlimited moments",
        "Priority matching",
        "Advanced filters",
        "See who viewed your profile",
        "Ad-free experience",
      ],
      popular: true,
    },
    {
      name: "Companion Pro",
      price: "$19.99",
      period: "per month",
      features: [
        "Everything in Plus",
        "Verified badge",
        "Host group events",
        "Business networking tools",
        "Analytics dashboard",
        "Early access to features",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 xl:px-8">
        <section className="min-h-screen flex flex-col justify-center items-center text-center py-12 xl:py-20">
          <div className="animate-slide-up max-w-4xl">
            <h1 className="text-4xl xl:text-7xl font-bold mb-4 xl:mb-6 text-foreground">
              Companion
            </h1>
            <p className="text-2xl xl:text-4xl mb-3 xl:mb-4 gradient-text font-semibold">
              Meet people who feel like you
            </p>
            <p className="text-lg xl:text-2xl mb-8 xl:mb-12 text-muted-foreground max-w-2xl mx-auto">
              Real connections. Real moments. No endless scrolling.
            </p>
            <Button
              size="lg"
              className="text-base xl:text-xl px-6 xl:px-10 py-4 xl:py-7 rounded-full shadow-glow hover:shadow-soft transition-all duration-300 hover:scale-105"
              onClick={() => setIsWaitlistOpen(true)}
            >
              Join the waitlist <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="mt-12 xl:mt-20 grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-8 w-full max-w-6xl">
            <div className="relative h-48 xl:h-80 rounded-2xl overflow-hidden shadow-soft">
              <img
                src="https://miaoda-site-img.s3cdn.medo.dev/images/919740dc-1b68-4753-a277-8349c2c19f2e.jpg"
                alt="Two people walking together outdoors"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-48 xl:h-80 rounded-2xl overflow-hidden shadow-soft">
              <img
                src="https://miaoda-site-img.s3cdn.medo.dev/images/a3baa8cd-3e03-432d-8deb-f78c6abcb9b5.jpg"
                alt="Person reading in cozy cafe"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-48 xl:h-80 rounded-2xl overflow-hidden shadow-soft">
              <img
                src="https://miaoda-site-img.s3cdn.medo.dev/images/6a82df67-b67a-409f-9a70-016c20c6a75d.jpg"
                alt="Friends sharing chai together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-16 xl:py-32 fade-on-scroll">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl xl:text-5xl font-bold mb-6 xl:mb-8 text-foreground">
              We all talk online. But sometimes, it still feels like no one's really there.
            </h2>
            <p className="text-lg xl:text-2xl text-muted-foreground leading-relaxed mb-8 xl:mb-12">
              Companion helps you find people nearby for simple shared activities. A walk. Reading together. Chai. Whatever feels right in the moment.
            </p>
            <div className="relative h-64 xl:h-96 rounded-2xl overflow-hidden shadow-soft">
              <img
                src="https://miaoda-site-img.s3cdn.medo.dev/images/2c324057-149d-4805-874f-ad5d35cfa23d.jpg"
                alt="People connecting authentically"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-16 xl:py-32 fade-on-scroll">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl xl:text-5xl font-bold text-center mb-12 xl:mb-20 text-foreground">
              How It Works
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">
              <Card className="bg-card border-border hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6 xl:p-8 text-center">
                  <div className="w-12 h-12 xl:w-16 xl:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 xl:mb-6">
                    <span className="text-2xl xl:text-4xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl xl:text-2xl font-semibold mb-3 xl:mb-4 text-foreground">
                    Post what you feel like doing
                  </h3>
                  <p className="text-base xl:text-lg text-muted-foreground">
                    A walk, reading, chai, anything
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6 xl:p-8 text-center">
                  <div className="w-12 h-12 xl:w-16 xl:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 xl:mb-6">
                    <span className="text-2xl xl:text-4xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl xl:text-2xl font-semibold mb-3 xl:mb-4 text-foreground">
                    Others can join if they vibe with it
                  </h3>
                  <p className="text-base xl:text-lg text-muted-foreground">
                    They swipe right if it feels right
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6 xl:p-8 text-center">
                  <div className="w-12 h-12 xl:w-16 xl:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 xl:mb-6">
                    <span className="text-2xl xl:text-4xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl xl:text-2xl font-semibold mb-3 xl:mb-4 text-foreground">
                    Meet for real
                  </h3>
                  <p className="text-base xl:text-lg text-muted-foreground">
                    Safe, natural, and real-world
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="text-lg xl:text-2xl text-center mt-12 xl:mt-16 text-muted-foreground italic">
              No pressure. No pretending. Just people being people.
            </p>
          </div>
        </section>

        <section className="py-16 xl:py-32 fade-on-scroll">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl xl:text-5xl font-bold text-center mb-6 xl:mb-8 text-foreground">
              Four Ways to Connect
            </h2>
            <p className="text-lg xl:text-xl text-center mb-12 xl:mb-16 text-muted-foreground max-w-3xl mx-auto">
              From dating to chai circles to co-working — Companion brings people together, your way
            </p>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
              {connectionModes.map((mode, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:shadow-soft transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6 xl:p-8">
                    <div className="flex items-start gap-4 xl:gap-6">
                      <div className={`w-12 h-12 xl:w-16 xl:h-16 rounded-2xl bg-${mode.color}/10 flex items-center justify-center flex-shrink-0`}>
                        <span className="text-2xl xl:text-4xl">{mode.emoji}</span>
                      </div>
                      <div>
                        <h3 className="text-xl xl:text-2xl font-semibold mb-2 xl:mb-3 text-foreground">
                          {mode.title}
                        </h3>
                        <p className="text-base xl:text-lg text-muted-foreground">
                          {mode.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 xl:py-32 fade-on-scroll">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl xl:text-5xl font-bold text-center mb-6 xl:mb-8 text-foreground">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 mb-12 xl:mb-16">
              {differentiators.map((item, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6 xl:p-8 text-center">
                    <Check className="w-10 h-10 xl:w-12 xl:h-12 text-primary mx-auto mb-3 xl:mb-4" />
                    <h3 className="text-lg xl:text-xl font-semibold text-foreground">{item}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-xl xl:text-3xl text-center mb-12 xl:mb-16 text-foreground font-medium">
              Just small moments that turn into real memories
            </p>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
              <div className="relative h-40 xl:h-64 rounded-2xl overflow-hidden shadow-soft">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/6a82df67-b67a-409f-9a70-016c20c6a75d.jpg"
                  alt="Sharing chai"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-40 xl:h-64 rounded-2xl overflow-hidden shadow-soft">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/919740dc-1b68-4753-a277-8349c2c19f2e.jpg"
                  alt="Walking together"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-40 xl:h-64 rounded-2xl overflow-hidden shadow-soft">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/40cdf771-331d-4027-b5b4-54ddb70e2ce9.jpg"
                  alt="Book club"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-40 xl:h-64 rounded-2xl overflow-hidden shadow-soft">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/c082c899-a22e-48b0-81a4-04819a9f2e3c.jpg"
                  alt="Group laughing"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 xl:py-32 fade-on-scroll">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl xl:text-5xl font-bold text-center mb-6 xl:mb-8 text-foreground">
              Choose Your Plan
            </h2>
            <p className="text-lg xl:text-xl text-center mb-12 xl:mb-16 text-muted-foreground max-w-3xl mx-auto">
              Start for free, upgrade when you're ready
            </p>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
              {pricingTiers.map((tier, index) => (
                <Card
                  key={index}
                  className={`bg-card border-border hover:shadow-soft transition-all duration-300 ${
                    tier.popular ? "ring-2 ring-primary shadow-glow" : ""
                  }`}
                >
                  <CardContent className="p-6 xl:p-8">
                    {tier.popular && (
                      <div className="bg-primary text-primary-foreground text-xs xl:text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-2xl xl:text-3xl font-bold mb-2 text-foreground">
                      {tier.name}
                    </h3>
                    <div className="mb-6">
                      <span className="text-3xl xl:text-5xl font-bold text-foreground">
                        {tier.price}
                      </span>
                      <span className="text-base xl:text-lg text-muted-foreground ml-2">
                        {tier.period}
                      </span>
                    </div>
                    <ul className="space-y-3 xl:space-y-4 mb-6 xl:mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm xl:text-base text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={tier.popular ? "default" : "outline"}
                      onClick={() => setIsWaitlistOpen(true)}
                    >
                      Get Started <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 xl:py-32 fade-on-scroll">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl xl:text-5xl font-bold mb-6 xl:mb-8 text-foreground">
              This isn't another app. It's a way to feel connected again.
            </h2>
            <p className="text-xl xl:text-3xl mb-8 xl:mb-12 text-muted-foreground font-medium">
              Because everyone deserves a real companion
            </p>
            <Button
              size="lg"
              className="text-base xl:text-xl px-6 xl:px-10 py-4 xl:py-7 rounded-full shadow-glow hover:shadow-soft transition-all duration-300 hover:scale-105"
              onClick={() => setIsWaitlistOpen(true)}
            >
              Join the waitlist 🌿
            </Button>
          </div>
        </section>

        <footer className="py-8 xl:py-12 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-8">
              <div className="text-center xl:text-left">
                <p className="text-base xl:text-lg font-semibold text-foreground mb-2">
                  Companion
                </p>
                <p className="text-sm xl:text-base text-muted-foreground">
                  © Companion 2025
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 xl:gap-8">
                <a href="#about" className="text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
                <a href="#community" className="text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors">
                  Community
                </a>
                <a href="#contact" className="text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
                <a href="#privacy" className="text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Join the Waitlist</DialogTitle>
            <DialogDescription>
              Be among the first to experience Companion when we launch.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
