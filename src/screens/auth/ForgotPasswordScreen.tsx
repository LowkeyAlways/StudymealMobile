import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../services/supabase/client";
import { styles } from "../../styles/screens/password-recovery.styles";

export default function ForgotPasswordScreen() {
  const { isAuthConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordResetRequest = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail.includes("@")) {
      Alert.alert("Adresse e-mail invalide", "Renseigne une adresse e-mail valide.");
      return;
    }

    if (!isAuthConfigured || supabase === null) {
      Alert.alert(
        "Réinitialisation indisponible",
        "Supabase n’est pas encore configuré dans cette version de Studymeal.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        normalizedEmail,
        { redirectTo: Linking.createURL("reset-password") },
      );

      if (error !== null) {
        throw error;
      }

      Alert.alert(
        "E-mail envoyé",
        "Si un compte existe pour cette adresse, tu recevras un lien pour choisir un nouveau mot de passe.",
        [{ onPress: () => router.back(), text: "OK" }],
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Réessaie dans un instant.";

      Alert.alert("Envoi impossible", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Pressable
            accessibilityLabel="Retour à la connexion"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Retour</Text>
          </Pressable>

          <Text style={styles.eyebrow}>SÉCURITÉ DU COMPTE</Text>
          <Text style={styles.title}>Mot de passe oublié ?</Text>
          <Text style={styles.description}>
            Indique ton e-mail : nous t’enverrons un lien sécurisé pour choisir
            un nouveau mot de passe.
          </Text>

          <View style={styles.form}>
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

            <Pressable
              accessibilityRole="button"
              disabled={isSubmitting}
              onPress={() => void handlePasswordResetRequest()}
              style={[styles.submitButton, isSubmitting ? styles.submitButtonDisabled : null]}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? "Envoi…" : "Recevoir le lien"}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
