"use client";
import { ArrowLeft, Check, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PricingPage() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter Plan",
      price: "₹0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "Basic features",
        "Limited usage",
        "Community access",
        "Email support"
      ],
      cta: "Start Free",
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Pro Plan",
      price: "₹499",
      period: "/month",
      description: "Most popular choice",
      features: [
        "Unlimited access",
        "Analytics & insights",
        "Priority support",
        "Early access to features"
      ],
      cta: "Upgrade to Pro",
      popular: true,
      variant: "default" as const
    },
    {
      name: "Ultimate Plan",
      price: "₹999",
      period: "/month",
      description: "For power users",
      features: [
        "Everything in Pro",
        "VIP assistance",
        "Deep AI insights",
        "Special requests"
      ],
      cta: "Go Ultimate",
      popular: false,
      variant: "outline" as const
    }
  ];

  const faqs = [
    {
      question: "How do I cancel?",
      answer: "You can cancel your subscription anytime through the Paddle portal. Your access will remain active until the end of your current billing period."
    },
    {
      question: "How do refunds work?",
      answer: "We follow Paddle's 14-day refund policy. If you request a refund within 14 days of purchase, you'll receive a full refund. After 14 days, no prorated refunds are available."
    },
    {
      question: "Can I upgrade?",
      answer: "Yes! You can upgrade your plan at any time. The price difference will be prorated for the remainder of your billing cycle."
    },
    {
      question: "Is my data safe?",
      answer: "Absolutely. We use industry-standard encryption and security measures. All payment processing is handled securely by Paddle, and we never store your card details."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 xl:py-20">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8 text-white hover:text-white/80 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl xl:text-6xl font-bold text-white mb-4">
              Choose the perfect Companion plan.
            </h1>
            <p className="text-lg xl:text-xl text-white/80 mb-8">
              Simple, transparent pricing built for growth.
            </p>
            <div className="flex flex-col xl:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Compare Plans
              </Button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 max-w-7xl mx-auto mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-4 border-white shadow-2xl scale-105' : 'border-2 border-white/20'} bg-white/95 backdrop-blur-sm`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600 text-lg">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={plan.variant} 
                    className="w-full" 
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Money-Back Guarantee */}
          <div className="max-w-3xl mx-auto mb-16">
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardContent className="flex items-center gap-4 p-6">
                <Shield className="w-12 h-12 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    14-Day Money-Back Guarantee
                  </h3>
                  <p className="text-gray-700">
                    Try Companion risk-free. If you're not satisfied, request a full refund within 14 days through Paddle.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl xl:text-4xl font-bold text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-gray-900 font-semibold hover:text-blue-600">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[hsl(225,73%,25%)] py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center gap-4 xl:gap-8">
                <a href="/terms" className="text-sm xl:text-base text-white/80 hover:text-white transition-colors">
                  Terms
                </a>
                <a href="#privacy" className="text-sm xl:text-base text-white/80 hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="/refund" className="text-sm xl:text-base text-white/80 hover:text-white transition-colors">
                  Refund
                </a>
                <a href="/pricing" className="text-sm xl:text-base text-white/80 hover:text-white transition-colors">
                  Pricing
                </a>
                <a href="#contact" className="text-sm xl:text-base text-white/80 hover:text-white transition-colors">
                  Contact
                </a>
                <a href="#about" className="text-sm xl:text-base text-white/80 hover:text-white transition-colors">
                  About Entrext
                </a>
              </div>
              <div className="text-center">
                <p className="text-sm xl:text-base text-white/80">
                  © 2025 Entrext. All rights reserved. Mumbai, Maharashtra.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
