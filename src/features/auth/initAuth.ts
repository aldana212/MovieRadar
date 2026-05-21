import { supabase } from "@/lib/supabase";
import { useAuthStore } from "./store/authStore";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

let initialized = false;

export const initAuth = () => {
  if (initialized) return;
  initialized = true;

  const {
    setUser,
    setLoading,
  } = useAuthStore.getState();

  // 1. sesión inicial
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null);
    setLoading(false);
  });

  // 2. listener global
  supabase.auth.onAuthStateChange(
    (_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
      setLoading(false);
    }
  );
};