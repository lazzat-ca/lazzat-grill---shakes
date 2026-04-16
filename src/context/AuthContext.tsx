// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase, type DbProfile } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: DbProfile | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isSeoEditor: boolean;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    profile: null,
    loading: true,
  });
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchProfile = async (userId: string): Promise<DbProfile | null> => {
    setProfileLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfileLoading(false);
    return data ?? null;
  };

  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        session,
        user: session?.user ?? null,
        profile: null,
        loading: false,
      });
      if (session?.user) {
        fetchProfile(session.user.id).then((profile) => {
          setState((prev) => ({ ...prev, profile }));
        });
      }
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState({
          session,
          user: session?.user ?? null,
          profile: null,
          loading: false,
        });
        if (session?.user) {
          fetchProfile(session.user.id).then((profile) => {
            setState((prev) => ({ ...prev, profile }));
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    // Always redirect to /admin after login
    if (!error && typeof window !== "undefined") {
      window.location.href = "/admin";
    }
    return { error: error?.message ?? null };
  };

  const signUp = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error?.message ?? null };
    // Insert profile with role 'pending' if user created
    const userId = data?.user?.id;
    if (userId) {
      await supabase.from("profiles").insert({ id: userId, email, role: "pending" });
    }
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const accessToken = state.session?.access_token ?? null;
  const isAdmin = state.profile?.role === "admin";
  const isSeoEditor =
    state.profile?.role === "seo_editor" || state.profile?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ ...state, signIn, signUp, signOut, isAdmin, isSeoEditor, accessToken, profileLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
