"use client";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { createStripeCheckout } from "@/db/api";
import { Shield, Lock, CreditCard, ArrowLeft, Check, Sparkles } from "lucide-react";
import type { PricingPlan } from "@/types/types";

interface BillingForm {
  email: string;
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  address: string;
  city: string;
  postalCode: string;
}

const PRICING_PLANS: Record<string, PricingPlan> = {
  free: {
    name: "Free",
    price: 0,
    period: "forever",
    features: [
      "Basic connection features",
      "Up to 5 connections per month",
      "Standard support",
    ],
  },
  plus: {
    name: "Plus",
    price: 9.99,
    period: "month",
    features: [
      "Unlimited connections",
      "Priority matching",
      "Advanced filters",
      "Email support",
      "Profile boost",
    ],
  },
  pro: {
    name: "Pro",
    price: 19.99,
    period: "month",
    features: [
      "Everything in Plus",
      "VIP badge",
      "Exclusive events access",
      "24/7 priority support",
      "Advanced analytics",
      "Custom profile themes",
    ],
  },
};

export default function BillingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const form = useForm<BillingForm>({
    defaultValues: {
      email: "",
      name: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan && PRICING_PLANS[plan]) {
      setSelectedPlan(PRICING_PLANS[plan]);
    } else {
      toast({
        title: "Invalid Plan",
        description: "Please select a valid pricing plan.",
        variant: "destructive",
      });
      navigate("/#pricing");
    }
  }, [searchParams, navigate, toast]);

  const onSubmit = async (values: BillingForm) => {
    if (!selectedPlan || selectedPlan.price === 0) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await createStripeCheckout([
        {
          name: `Companion ${selectedPlan.name} Plan`,
          price: selectedPlan.price,
          quantity: 1,
        },
      ]);

      if (response.data?.url) {
        window.open(response.data.url, "_blank");
        toast({
          title: "Redirecting to Payment",
          description: "Opening secure payment page...",
        });
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to process payment. Please check if STRIPE_SECRET_KEY is configured.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedPlan) {
    return null;
  }

  if (selectedPlan.price === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 xl:py-20">
        <div className="max-w-4xl mx-auto px-4 xl:px-8">
          <Button
            variant="outline"
            onClick={() => navigate("/#pricing")}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </Button>

          <Card className="glass-light shadow-card border-border">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shadow-elevated">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl xl:text-4xl text-foreground mb-4">
                Welcome to Companion Free Plan! 🎉
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                Start connecting with people nearby at no cost
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  What's Included in Your Free Plan:
                </h3>
                <ul className="space-y-3">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-base text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Next Steps:
                </h3>
                <ol className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-primary">1.</span>
                    <span>Join our waitlist to get early access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-primary">2.</span>
                    <span>Download the app when it launches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-primary">3.</span>
                    <span>Start making real connections in your area</span>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col xl:flex-row gap-4">
                <Button
                  onClick={() => navigate("/")}
                  className="flex-1"
                  size="lg"
                >
                  Join Waitlist
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  onClick={() => navigate("/#pricing")}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  View Other Plans
                </Button>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Want more features? Check out our Plus and Pro plans for unlimited connections and exclusive benefits.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 xl:py-20">
      <div className="max-w-6xl mx-auto px-4 xl:px-8">
        <Button
          variant="outline"
          onClick={() => navigate("/#pricing")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pricing
        </Button>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <Card className="glass-light shadow-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl xl:text-3xl text-foreground flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" />
                  Secure Billing Information
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Your payment information is encrypted and secure
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          rules={{ required: "Name is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Details
                      </h3>
                      <div className="bg-muted/30 rounded-lg p-4 border border-border">
                        <p className="text-sm text-muted-foreground mb-4">
                          Note: This is a demo form. Actual payment will be processed securely through Stripe.
                        </p>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            rules={{
                              required: "Card number is required",
                              pattern: {
                                value: /^\d{16}$/,
                                message: "Card number must be 16 digits",
                              },
                            }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={16}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="expiry"
                              rules={{
                                required: "Expiry date is required",
                                pattern: {
                                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                  message: "Format: MM/YY",
                                },
                              }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" maxLength={5} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="cvv"
                              rules={{
                                required: "CVV is required",
                                pattern: {
                                  value: /^\d{3,4}$/,
                                  message: "CVV must be 3-4 digits",
                                },
                              }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="password"
                                      placeholder="123"
                                      maxLength={4}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Billing Address</h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="address"
                          rules={{ required: "Address is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            rules={{ required: "City is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="New York" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="postalCode"
                            rules={{ required: "Postal code is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="10001" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        Your payment is secured with 256-bit SSL encryption. We never store your card details.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full shadow-primary"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Pay $${selectedPlan.price}/${selectedPlan.period}`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-1">
            <Card className="glass-light shadow-elevated border-border sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-foreground">{selectedPlan.name} Plan</span>
                    <span className="text-2xl font-bold text-primary">
                      ${selectedPlan.price}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Billed {selectedPlan.period === "forever" ? "once" : `per ${selectedPlan.period}`}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold text-foreground mb-3">Included Features:</h4>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">${selectedPlan.price}</span>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    ✓ Cancel anytime
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ✓ 30-day money-back guarantee
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ✓ Secure payment processing
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
