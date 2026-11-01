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
import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../services/supabase/client";
import { styles } from "../../styles/screens/password-recovery.styles";

export default function ResetPasswordScreen() {
  const { isAuthLoading, user } = useAuth();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordUpdate = async () => {
    if (password.length < 6) {
      Alert.alert(
        "Mot de passe trop court",
        "Choisis un mot de passe d’au moins 6 caractères.",
      );
      return;
    }

    if (password !== passwordConfirmation) {
      Alert.alert("Les mots de passe diffèrent", "Vérifie la confirmation.");
      return;
    }

    if (supabase === null || user === null) {
      Alert.alert(
        "Lien invalide ou expiré",
        "Demande un nouvel e-mail de réinitialisation depuis la connexion.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error !== null) {
        throw error;
      }

      Alert.alert("Mot de passe mis à jour", "Tu es maintenant connecté à Studymeal.", [
        { onPress: () => router.replace("/(tabs)"), text: "Continuer" },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Réessaie dans un instant.";

      Alert.alert("Modification impossible", message);
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
          <Text style={styles.eyebrow}>SÉCURITÉ DU COMPTE</Text>
          <Text style={styles.title}>Choisis un nouveau mot de passe</Text>
          <Text style={styles.description}>
            {isAuthLoading
              ? "Vérification sécurisée du lien…"
              : user === null
                ? "Ouvre cette page depuis l’e-mail reçu pour continuer."
                : "Ce nouveau mot de passe protégera ton compte Studymeal."}
          </Text>

          <View style={styles.form}>
            <Text style={styles.fieldLabel}>NOUVEAU MOT DE PASSE</Text>
            <TextInput
              autoComplete="new-password"
              onChangeText={setPassword}
              placeholder="6 caractères minimum"
              secureTextEntry
              style={styles.input}
              value={password}
            />

            <Text style={styles.fieldLabel}>CONFIRMER LE MOT DE PASSE</Text>
            <TextInput
              autoComplete="new-password"
              onChangeText={setPasswordConfirmation}
              placeholder="Répète ton mot de passe"
              secureTextEntry
              style={styles.input}
              value={passwordConfirmation}
            />

            <Pressable
              accessibilityRole="button"
              disabled={isSubmitting || isAuthLoading || user === null}
              onPress={() => void handlePasswordUpdate()}
              style={[
                styles.submitButton,
                isSubmitting || isAuthLoading || user === null
                  ? styles.submitButtonDisabled
                  : null,
              ]}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? "Mise à jour…" : "Enregistrer mon mot de passe"}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
