import { supabase } from "./supabase";
import type { Waitlist, OrderItem } from "@/types/types";

export async function addToWaitlist(email: string): Promise<Waitlist | null> {
  const { data, error } = await supabase
    .from("waitlist")
    .insert({ email })
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const { data } = await supabase
    .from("waitlist")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  return !!data;
}

export async function createStripeCheckout(items: OrderItem[]) {
  const { data, error } = await supabase.functions.invoke("create_stripe_checkout", {
    body: JSON.stringify({
      items,
      currency: "usd",
      payment_method_types: ["card"],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (error) {
    const errorMsg = await error?.context?.text();
    throw new Error(errorMsg || "Failed to create checkout session");
  }

  return data;
}

export async function verifyStripePayment(sessionId: string) {
  const { data, error } = await supabase.functions.invoke("verify_stripe_payment", {
    body: JSON.stringify({ sessionId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (error) {
    const errorMsg = await error?.context?.text();
    throw new Error(errorMsg || "Failed to verify payment");
  }

  return data;
}
