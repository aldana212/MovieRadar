import { supabase } from "@/lib/supabase";
import type { AuthResponse } from "@supabase/supabase-js";

export const authApi = {
  login: async (email: string, password: string) => {
    const { data, error }: AuthResponse =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) throw error;

    return {
      user: data.user,
      session: data.session,
    };
  },
  register: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return {
      user: data.user,
      session: data.session,
    };
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
