import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Briefcase, UserPlus, ArrowRight, Check, Sparkles, Zap, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { addToWaitlist } from "@/db/api";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/common/Navigation";
import FloatingParticles from "@/components/animations/FloatingParticles";
import FlipCard from "@/components/animations/FlipCard";
import AnimatedText from "@/components/animations/AnimatedText";

interface WaitlistForm {
  email: string;
}

export default function LandingPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      description: "Meet someone special naturally through shared moments and genuine connections",
      color: "mode-date",
    },
    {
      icon: UserPlus,
      title: "Friend Mode",
      emoji: "🤝",
      description: "Find good people to hang out with and build lasting friendships",
      color: "mode-friend",
    },
    {
      icon: Users,
      title: "Group Mode",
      emoji: "👥",
      description: "Join circles that feel like home and connect with communities",
      color: "mode-group",
    },
    {
      icon: Briefcase,
      title: "Business Mode",
      emoji: "💼",
      description: "Meet people who work like you — and get you professionally",
      color: "mode-business",
    },
  ];

  const differentiators = [
    { title: "No fake profiles", description: "Every user is verified and authentic" },
    { title: "No weird messages", description: "Connect through shared activities, not DMs" },
    { title: "No pressure", description: "Meet at your own pace, on your own terms" },
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
    <div className="min-h-screen bg-gradient-hero overflow-hidden">
      <Navigation onWaitlistClick={() => setIsWaitlistOpen(true)} />

      <section className="relative min-h-screen flex flex-col justify-center items-center text-center py-20 xl:py-32">
        <FloatingParticles />
        
        <div className="container mx-auto px-4 xl:px-8 relative z-10">
          <div className="animate-slide-up max-w-5xl mx-auto">
            <div className="mb-6 xl:mb-8 inline-block">
              <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 xl:px-6 py-2 xl:py-3 animate-bounce-subtle">
                <Sparkles className="w-4 h-4 xl:w-5 xl:h-5 text-primary" />
                <span className="text-sm xl:text-base text-primary font-medium">
                  Join 10,000+ people on the waitlist
                </span>
              </div>
            </div>

            <h1 className="text-5xl xl:text-8xl font-bold mb-4 xl:mb-8 text-foreground leading-tight">
              Meet People Who
              <br />
              <span className="text-shimmer">Feel Like You</span>
            </h1>

            <p className="text-xl xl:text-3xl mb-6 xl:mb-8 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real connections. Real moments.
              <br />
              <span className="gradient-text font-semibold">No endless scrolling.</span>
            </p>

            <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 justify-center items-center mb-12 xl:mb-20">
              <Button
                size="lg"
                className="text-base xl:text-xl px-8 xl:px-12 py-6 xl:py-8 rounded-full shadow-glow hover:shadow-soft transition-all duration-300 hover:scale-105 group"
                onClick={() => setIsWaitlistOpen(true)}
              >
                Join the waitlist
                <Sparkles className="ml-2 w-5 h-5 xl:w-6 xl:h-6 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base xl:text-xl px-8 xl:px-12 py-6 xl:py-8 rounded-full hover:bg-primary/5 transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById("how-it-works");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5 xl:w-6 xl:h-6" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 xl:gap-12 max-w-2xl mx-auto stagger-animation">
              <div className="text-center">
                <div className="text-3xl xl:text-5xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm xl:text-base text-muted-foreground">Waitlist Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl xl:text-5xl font-bold text-primary mb-2">4</div>
                <div className="text-sm xl:text-base text-muted-foreground">Connection Modes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl xl:text-5xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm xl:text-base text-muted-foreground">Authentic</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-float" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 xl:px-8">
        <section id="why-companion" className="py-20 xl:py-40 fade-on-scroll">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 xl:mb-20">
              <div className="inline-block mb-4">
                <span className="text-sm xl:text-base text-primary font-semibold bg-primary/10 px-4 py-2 rounded-full">
                  Why Companion
                </span>
              </div>
              <h2 className="text-4xl xl:text-6xl font-bold mb-6 xl:mb-8 text-foreground leading-tight">
                We all talk online.
                <br />
                But sometimes, it still feels like
                <br />
                <span className="gradient-text">no one's really there.</span>
              </h2>
              <p className="text-lg xl:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Companion helps you find people nearby for simple shared activities. A walk. Reading together. Chai. Whatever feels right in the moment.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 stagger-animation">
              <Card className="bg-card border-border hover-lift">
                <CardContent className="p-6 xl:p-8 text-center">
                  <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 xl:mb-6">
                    <Shield className="w-7 h-7 xl:w-8 xl:h-8 text-primary" />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-semibold mb-3 text-foreground">
                    Safe & Secure
                  </h3>
                  <p className="text-base xl:text-lg text-muted-foreground">
                    No public location sharing. Mutual matching required. Your safety is our priority.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover-lift">
                <CardContent className="p-6 xl:p-8 text-center">
                  <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 xl:mb-6">
                    <Star className="w-7 h-7 xl:w-8 xl:h-8 text-primary" />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-semibold mb-3 text-foreground">
                    Authentic Moments
                  </h3>
                  <p className="text-base xl:text-lg text-muted-foreground">
                    Real experiences over endless scrolling. Connect through shared activities, not profiles.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover-lift">
                <CardContent className="p-6 xl:p-8 text-center">
                  <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 xl:mb-6">
                    <Zap className="w-7 h-7 xl:w-8 xl:h-8 text-primary" />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-semibold mb-3 text-foreground">
                    Instant Connection
                  </h3>
                  <p className="text-base xl:text-lg text-muted-foreground">
                    Post what you feel like doing. Others join if they vibe with it. Simple as that.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 xl:mt-24 relative">
              <div className="relative h-64 xl:h-[500px] rounded-3xl overflow-hidden shadow-glow">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/2c324057-149d-4805-874f-ad5d35cfa23d.jpg"
                  alt="People connecting authentically"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent flex items-end justify-center p-8">
                  <AnimatedText
                    text="Because real connections happen in real life"
                    className="text-xl xl:text-4xl font-bold text-foreground text-center text-glow"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 xl:py-40 fade-on-scroll">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 xl:mb-20">
              <div className="inline-block mb-4">
                <span className="text-sm xl:text-base text-primary font-semibold bg-primary/10 px-4 py-2 rounded-full">
                  How It Works
                </span>
              </div>
              <h2 className="text-4xl xl:text-6xl font-bold mb-6 text-foreground">
                Three Simple Steps to
                <br />
                <span className="gradient-text">Real Connections</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12 stagger-animation">
              <FlipCard
                stepNumber={1}
                title="Post Your Moment"
                description="Share what you feel like doing right now. A walk in the park, grabbing chai, reading at a cafe, or anything else."
                exampleText="Looking for someone to grab coffee and chat about books ☕📚"
                imageSrc="https://miaoda-site-img.s3cdn.medo.dev/images/a0fd8f52-043c-459c-a50d-767bb7520b72.jpg"
                imageAlt="Two people having coffee and chatting at a cozy cafe"
                autoFlipDelay={4000}
              />

              <FlipCard
                stepNumber={2}
                title="Others Join In"
                description="People nearby see your moment. If they vibe with it, they swipe right. Mutual interest? You're matched!"
                exampleText="3 people nearby are interested in joining you! 🎉"
                imageSrc="https://miaoda-site-img.s3cdn.medo.dev/images/6d1b36c7-80d5-4c76-90c8-4f46cf1e958c.jpg"
                imageAlt="People meeting and greeting each other outdoors"
                autoFlipDelay={4500}
              />

              <FlipCard
                stepNumber={3}
                title="Meet For Real"
                description="Connect in the real world. Safe, natural, and authentic. No pressure, no pretending."
                exampleText="Just people being people. 🌿"
                imageSrc="https://miaoda-site-img.s3cdn.medo.dev/images/b3c66504-deca-4bd0-a93b-6db80c67f38f.jpg"
                imageAlt="Friends meeting in real life for the first time"
                autoFlipDelay={5000}
              />
            </div>

            <div className="mt-16 xl:mt-20 text-center">
              <p className="text-xl xl:text-3xl text-foreground font-medium italic">
                No pressure. No pretending. Just people being people.
              </p>
            </div>
          </div>
        </section>

        <section id="connection-modes" className="py-20 xl:py-40 fade-on-scroll">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 xl:mb-20">
              <div className="inline-block mb-4">
                <span className="text-sm xl:text-base text-primary font-semibold bg-primary/10 px-4 py-2 rounded-full">
                  Connection Modes
                </span>
              </div>
              <h2 className="text-4xl xl:text-6xl font-bold mb-6 text-foreground">
                Four Ways to Connect
              </h2>
              <p className="text-lg xl:text-2xl text-muted-foreground max-w-3xl mx-auto">
                From dating to chai circles to co-working — Companion brings people together, your way
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 stagger-animation">
              {connectionModes.map((mode, index) => (
                <Card
                  key={index}
                  className="glass-hover border-border group"
                >
                  <CardContent className="p-8 xl:p-10">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-3xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-soft group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                        <span className="text-3xl xl:text-4xl">{mode.emoji}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl xl:text-3xl font-semibold mb-3 text-foreground">
                          {mode.title}
                        </h3>
                        <p className="text-base xl:text-lg text-muted-foreground leading-relaxed">
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

        <section className="py-20 xl:py-40 fade-on-scroll">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 xl:mb-16">
              <h2 className="text-4xl xl:text-6xl font-bold mb-6 text-foreground">
                What Makes Us Different
              </h2>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 mb-12 xl:mb-16 stagger-animation">
              {differentiators.map((item, index) => (
                <Card key={index} className="glass-hover border-border">
                  <CardContent className="p-6 xl:p-8 text-center">
                    <Check className="w-10 h-10 xl:w-12 xl:h-12 text-primary mx-auto mb-3 xl:mb-4" />
                    <h3 className="text-lg xl:text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm xl:text-base text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-xl xl:text-3xl text-center mb-12 xl:mb-16 text-foreground font-medium">
              Just small moments that turn into real memories
            </p>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 stagger-animation">
              <div className="relative h-40 xl:h-64 rounded-2xl overflow-hidden shadow-soft hover-lift">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/6a82df67-b67a-409f-9a70-016c20c6a75d.jpg"
                  alt="Sharing chai"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-40 xl:h-64 rounded-2xl overflow-hidden shadow-soft hover-lift">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/919740dc-1b68-4753-a277-8349c2c19f2e.jpg"
                  alt="Walking together"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-40 xl:h-64 rounded-2xl overflow-hidden shadow-soft hover-lift">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/40cdf771-331d-4027-b5b4-54ddb70e2ce9.jpg"
                  alt="Book club"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-40 xl:h-64 rounded-2xl overflow-hidden shadow-soft hover-lift">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/c082c899-a22e-48b0-81a4-04819a9f2e3c.jpg"
                  alt="Group laughing"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 xl:py-40 fade-on-scroll">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 xl:mb-20">
              <div className="inline-block mb-4">
                <span className="text-sm xl:text-base text-primary font-semibold bg-primary/10 px-4 py-2 rounded-full">
                  Pricing
                </span>
              </div>
              <h2 className="text-4xl xl:text-6xl font-bold mb-6 text-foreground">
                Choose Your Plan
              </h2>
              <p className="text-lg xl:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Start for free, upgrade when you're ready
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 stagger-animation">
              {pricingTiers.map((tier, index) => (
                <Card
                  key={index}
                  className={`glass-hover border-border ${
                    tier.popular ? "ring-2 ring-primary shadow-glow scale-105" : ""
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
                      onClick={() => {
                        const planKey = tier.name.toLowerCase();
                        navigate(`/billing?plan=${planKey}`);
                      }}
                    >
                      Get Started <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 xl:py-40 fade-on-scroll">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl xl:text-6xl font-bold mb-6 xl:mb-8 text-foreground leading-tight">
              This isn't another app.
              <br />
              It's a way to <span className="gradient-text">feel connected</span> again.
            </h2>
            <p className="text-xl xl:text-3xl mb-8 xl:mb-12 text-muted-foreground font-medium">
              Because everyone deserves a real companion
            </p>
            <Button
              size="lg"
              className="text-base xl:text-xl px-8 xl:px-12 py-6 xl:py-8 rounded-full shadow-glow hover:shadow-soft transition-all duration-300 hover:scale-105 group"
              onClick={() => setIsWaitlistOpen(true)}
            >
              Join the waitlist 🌿
              <ArrowRight className="ml-2 w-5 h-5 xl:w-6 xl:h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        <footer className="py-8 xl:py-12 bg-footer border-t border-footer">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-8">
              <div className="text-center xl:text-left">
                <p className="text-base xl:text-lg font-semibold text-footer-foreground mb-2">
                  Companion
                </p>
                <p className="text-sm xl:text-base text-footer-foreground/70">
                  © Companion 2025
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 xl:gap-8">
                <a href="#about" className="text-sm xl:text-base text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  About
                </a>
                <a href="#community" className="text-sm xl:text-base text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  Community
                </a>
                <a href="#contact" className="text-sm xl:text-base text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  Contact
                </a>
                <a href="#privacy" className="text-sm xl:text-base text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
        <DialogContent className="max-w-md glass-light">
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
