import { supabase } from "./supabase";
import type { Waitlist } from "@/types/types";

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
