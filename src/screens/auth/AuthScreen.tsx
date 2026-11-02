import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../services/supabase/client";
import { styles } from "../../styles/screens/auth.styles";

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const { isAuthConfigured, isAuthLoading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (
      !normalizedEmail.includes("@") ||
      password.length < 6 ||
      (isRegistering && (!firstName.trim() || !lastName.trim()))
    ) {
      Alert.alert(
        "Informations incomplètes",
        "Renseigne ton prénom, ton nom, une adresse e-mail valide et un mot de passe d’au moins 6 caractères.",
      );
      return;
    }

    if (!isAuthConfigured || supabase === null) {
      Alert.alert(
        "Connexion indisponible",
        "Supabase n’est pas encore configuré dans cette version de Studymeal.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      if (isRegistering) {
        const { error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            // Expo Go produit une URL exp://… pendant le développement ; une
            // build native produit automatiquement studymeal://auth.
            emailRedirectTo: Linking.createURL("auth"),
            data: {
              first_name: firstName.trim(),
              full_name: `${firstName.trim()} ${lastName.trim()}`,
              last_name: lastName.trim(),
            },
          },
        });

        if (error !== null) {
          throw error;
        }

        Alert.alert(
          "Vérifie tes e-mails",
          "Nous t’avons envoyé un lien de confirmation pour activer ton compte.",
        );
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error !== null) {
        throw error;
      }

      router.replace("/(tabs)");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Réessaie dans un instant.";

      Alert.alert("Connexion impossible", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isAuthConfigured || supabase === null) {
      Alert.alert(
        "Connexion indisponible",
        "Supabase n’est pas encore configuré dans cette version de Studymeal.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const redirectTo = Linking.createURL("auth");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          skipBrowserRedirect: true,
          scopes: "openid email profile",
        },
      });

      if (error !== null) {
        throw error;
      }

      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

      if (result.type !== "success") {
        return;
      }

      const callbackUrl = new URL(result.url);
      const authorizationCode = callbackUrl.searchParams.get("code");
      const hashParameters = new URLSearchParams(callbackUrl.hash.slice(1));
      const accessToken = hashParameters.get("access_token");
      const refreshToken = hashParameters.get("refresh_token");

      const { error: sessionError } =
        authorizationCode !== null
          ? await supabase.auth.exchangeCodeForSession(authorizationCode)
          : accessToken !== null && refreshToken !== null
            ? await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              })
            : {
                error: new Error(
                  "La connexion Google n’a pas renvoyé de session valide.",
                ),
              };

      if (sessionError !== null) {
        throw sessionError;
      }

      router.replace("/(tabs)");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Réessaie dans un instant.";

      Alert.alert("Connexion Google impossible", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading) {
    return null;
  }

  if (user !== null) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <View accessible={false} pointerEvents="none" style={styles.brandHeader}>
          <View style={styles.brandMark}>
            <Image
              source={require("../../../assets/studymeal-mark.png")}
              style={styles.brandLogo}
            />
          </View>
          <Text style={styles.brandName}>Studymeal</Text>
        </View>

        <View style={[styles.content, isRegistering ? styles.registerContent : null]}>
          <Text style={styles.eyebrow}>TON COMPTE</Text>
          <Text style={styles.title}>
            {isRegistering ? "Créer ton compte" : "Bienvenue"}
          </Text>
          <Text style={styles.description}>
            Connecte-toi pour retrouver tes préférences, enregistrer tes lieux
            favoris et contribuer prochainement à l’affluence des restaurants.
          </Text>

          <View style={styles.form}>
            {isRegistering ? (
              <>
                <Text style={styles.fieldLabel}>PRÉNOM</Text>
                <TextInput
                  autoCapitalize="words"
                  autoComplete="given-name"
                  onChangeText={setFirstName}
                  placeholder="Ton prénom"
                  style={styles.input}
                  value={firstName}
                />

                <Text style={styles.fieldLabel}>NOM</Text>
                <TextInput
                  autoCapitalize="words"
                  autoComplete="family-name"
                  onChangeText={setLastName}
                  placeholder="Ton nom"
                  style={styles.input}
                  value={lastName}
                />
              </>
            ) : null}

            <Text style={styles.fieldLabel}>E-MAIL</Text>
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="ton@email.fr"
              style={styles.input}
              value={email}
            />

            <Text style={styles.fieldLabel}>MOT DE PASSE</Text>
            <TextInput
              autoComplete={isRegistering ? "new-password" : "password"}
              onChangeText={setPassword}
              placeholder="6 caractères minimum"
              secureTextEntry
              style={styles.input}
              value={password}
            />

            {!isRegistering ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push("../forgot-password")}
                style={styles.forgotPasswordButton}
              >
                <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
              </Pressable>
            ) : null}

            <Pressable
              accessibilityRole="button"
              disabled={isSubmitting}
              onPress={() => void handleSubmit()}
              style={[styles.submitButton, isSubmitting ? styles.submitButtonDisabled : null]}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting
                  ? "Connexion…"
                  : isRegistering
                    ? "Créer mon compte"
                    : "Se connecter"}
              </Text>
            </Pressable>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OU</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable
              accessibilityRole="button"
              disabled={isSubmitting}
              onPress={() => void handleGoogleSignIn()}
              style={[styles.googleButton, isSubmitting ? styles.submitButtonDisabled : null]}
            >
              <View style={styles.googleButtonContent}>
                <Text style={styles.googleButtonText}>Continuer avec Google</Text>
                <Image
                  accessibilityLabel="Logo Google"
                  source={require("../../../assets/google-logo.png")}
                  style={styles.googleLogo}
                />
              </View>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => setIsRegistering((currentValue) => !currentValue)}
            style={styles.switchModeButton}
          >
            <Text style={styles.switchModeText}>
              {isRegistering
                ? "J’ai déjà un compte"
                : "Créer un compte"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
