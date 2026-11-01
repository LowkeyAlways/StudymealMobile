import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppState, Platform } from "react-native";
import * as Linking from "expo-linking";
import type { Session, User } from "@supabase/supabase-js";

import { isSupabaseConfigured, supabase } from "../services/supabase/client";

type AuthContextValue = {
  isAuthConfigured: boolean;
  isAuthLoading: boolean;
  session: Session | null;
  signOut: () => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (supabase === null) {
      return;
    }

    const client = supabase;

    let isMounted = true;

    const completeSessionFromUrl = async (url: string) => {
      const parsedUrl = new URL(url);
      const authorizationCode = parsedUrl.searchParams.get("code");
      const hashParameters = new URLSearchParams(
        parsedUrl.hash.startsWith("#") ? parsedUrl.hash.slice(1) : parsedUrl.hash,
      );
      const accessToken = hashParameters.get("access_token");
      const refreshToken = hashParameters.get("refresh_token");

      if (authorizationCode !== null) {
        await client.auth.exchangeCodeForSession(authorizationCode);
        return;
      }

      if (accessToken !== null && refreshToken !== null) {
        await client.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }
    };

    const restoreSession = async () => {
      const { data } = await client.auth.getSession();

      if (isMounted) {
        setSession(data.session);
        setIsAuthLoading(false);
      }
    };

    void restoreSession();

    void Linking.getInitialURL().then((url) => {
      if (url !== null) {
        return completeSessionFromUrl(url);
      }
    });

    const linkingSubscription = Linking.addEventListener("url", ({ url }) => {
      void completeSessionFromUrl(url);
    });

    const { data: authListener } = client.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (isMounted) {
          setSession(nextSession);
          setIsAuthLoading(false);
        }
      },
    );

    const appStateSubscription =
      Platform.OS === "web"
        ? undefined
        : AppState.addEventListener("change", (nextAppState) => {
            if (nextAppState === "active") {
              client.auth.startAutoRefresh();
            } else {
              client.auth.stopAutoRefresh();
            }
          });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
      linkingSubscription.remove();
      appStateSubscription?.remove();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthConfigured: isSupabaseConfigured,
      isAuthLoading,
      session,
      signOut: async () => {
        if (supabase === null) {
          return;
        }

        const { error } = await supabase.auth.signOut();

        if (error !== null) {
          throw error;
        }
      },
      user: session?.user ?? null,
    }),
    [isAuthLoading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
