import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFavorites } from "../../contexts/FavoritesContext";
import { usePreferences } from "../../contexts/PreferencesContext";
import {
  budgetOptions,
  campusOptions,
  categoryOptions,
} from "../../types/preferences";
import { styles } from "../../styles/screens/profile.styles";
import { colors } from "../../styles/theme/colors";

export default function ProfileScreen() {
  const { favoritePlaceIds, isFavoritesLoading } = useFavorites();
  const {
    isPreferencesLoading,
    selectedBudget,
    selectedCampus,
    selectedCategories,
    notificationsEnabled,
    setBudget,
    setCampus,
    setCategories,
    setNotificationsEnabled,
    resetPreferences,
  } = usePreferences();
  const [isCampusPickerVisible, setIsCampusPickerVisible] = useState(false);
  const [isBudgetPickerVisible, setIsBudgetPickerVisible] = useState(false);
  const [isCategoryPickerVisible, setIsCategoryPickerVisible] =
    useState(false);

  const selectedBudgetLabel = budgetOptions.find(
    (option) => option.value === selectedBudget,
  )?.label ?? "Tous budgets";

  const selectedCategoriesLabel =
    selectedCategories.length === categoryOptions.length
      ? "Toutes les options"
      : selectedCategories.length === 0
        ? "Aucune catégorie"
        : categoryOptions
            .filter((option) => selectedCategories.includes(option.value))
            .map((option) => option.label)
            .join(" · ");

  const toggleCategory = (
    category: (typeof categoryOptions)[number]["value"],
  ) => {
    const isSelected = selectedCategories.includes(category);

    if (isSelected && selectedCategories.length === 1) {
      return;
    }

    const updatedCategories = isSelected
      ? selectedCategories.filter(
          (selectedCategory) => selectedCategory !== category,
        )
      : [...selectedCategories, category];

    setCategories(updatedCategories);
  };

  const favoritesLabel = isFavoritesLoading
    ? "Chargement…"
    : favoritePlaceIds.length === 1
      ? "1 lieu enregistré"
      : `${favoritePlaceIds.length} lieux enregistrés`;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>TON ESPACE</Text>
        <Text style={styles.title}>Profil à configurer</Text>
        <Text style={styles.description}>
          Personnalise Studymeal pour trouver plus facilement les options qui
          correspondent à ton quotidien.
        </Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>S</Text>
          </View>

          <View style={styles.profileCopy}>
            <Text style={styles.profileEyebrow}>PROFIL LOCAL</Text>
            <Text style={styles.profileTitle}>Ton expérience Studymeal</Text>
            <Text style={styles.profileDescription}>
              Aucun compte n’est nécessaire pour commencer.
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryEyebrow}>TES REPÈRES</Text>
          <Text style={styles.summaryValue}>{favoritesLabel}</Text>
          <Text style={styles.summaryDescription}>
            Tes favoris restent enregistrés sur cet appareil.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>PRÉFÉRENCES</Text>
        <View style={styles.preferencesCard}>
          <Pressable
            accessibilityLabel="Choisir ton campus"
            accessibilityRole="button"
            onPress={() => setIsCampusPickerVisible(true)}
            style={[styles.preferenceRow, styles.preferenceRowBorder]}
          >
            <View style={styles.preferenceRowContent}>
              <View style={styles.preferenceCopy}>
                <Text style={styles.preferenceLabel}>Campus</Text>
                <Text style={styles.preferenceValue}>
                  {isPreferencesLoading
                    ? "Chargement…"
                    : (selectedCampus ?? "À renseigner")}
                </Text>
              </View>
              <Text style={styles.preferenceAction}>
                {selectedCampus ? "Modifier" : "Choisir"}
              </Text>
            </View>
          </Pressable>
          <View style={[styles.preferenceRow, styles.preferenceRowBorder]}>
            <View style={styles.preferenceRowContent}>
              <View style={styles.preferenceCopy}>
                <Text style={styles.preferenceLabel}>Notifications</Text>
                <Text style={styles.preferenceValue}>
                  Recevoir les alertes Studymeal
                </Text>
              </View>
              <Switch
                accessibilityLabel="Activer les notifications"
                onValueChange={setNotificationsEnabled}
                thumbColor={colors.white}
                trackColor={{ false: colors.switchInactive, true: colors.brand }}
                value={notificationsEnabled}
              />
            </View>
          </View>
          <Pressable
            accessibilityLabel="Choisir ton budget préféré"
            accessibilityRole="button"
            onPress={() => setIsBudgetPickerVisible(true)}
            style={[styles.preferenceRow, styles.preferenceRowBorder]}
          >
            <View style={styles.preferenceRowContent}>
              <View style={styles.preferenceCopy}>
                <Text style={styles.preferenceLabel}>Budget préféré</Text>
                <Text style={styles.preferenceValue}>
                  {isPreferencesLoading ? "Chargement…" : selectedBudgetLabel}
                </Text>
              </View>
              <Text style={styles.preferenceAction}>Modifier</Text>
            </View>
          </Pressable>
          <Pressable
            accessibilityLabel="Choisir les catégories préférées"
            accessibilityRole="button"
            onPress={() => setIsCategoryPickerVisible(true)}
            style={styles.preferenceRow}
          >
            <View style={styles.preferenceRowContent}>
              <View style={styles.preferenceCopy}>
                <Text style={styles.preferenceLabel}>Catégories</Text>
                <Text style={styles.preferenceValue}>
                  {isPreferencesLoading
                    ? "Chargement…"
                    : selectedCategoriesLabel}
                </Text>
              </View>
              <Text style={styles.preferenceAction}>Modifier</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>Préférences enregistrées</Text>
          <Text style={styles.noticeDescription}>
            Ces réglages sont conservés sur cet appareil et guident tes
            recherches dans Studymeal.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => {
            Alert.alert(
              "Réinitialiser les préférences ?",
              "Ton campus, ton budget, tes catégories et les notifications reviendront aux valeurs par défaut sur cet appareil.",
              [
                { style: "cancel", text: "Annuler" },
                {
                  onPress: resetPreferences,
                  style: "destructive",
                  text: "Réinitialiser",
                },
              ],
            );
          }}
          style={styles.resetButton}
        >
          <Text style={styles.resetButtonText}>Réinitialiser mes préférences</Text>
        </Pressable>
      </ScrollView>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsCampusPickerVisible(false)}
        transparent
        visible={isCampusPickerVisible}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>PRÉFÉRENCE LOCALE</Text>
            <Text style={styles.modalTitle}>Choisir ton campus</Text>
            <Text style={styles.modalDescription}>
              Ce choix affinera les lieux affichés dans Studymeal.
            </Text>

            <View style={styles.campusOptions}>
              {campusOptions.map((campus) => {
                const isSelected = selectedCampus === campus;

                return (
                  <Pressable
                    key={campus}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => {
                      setCampus(campus);
                      setIsCampusPickerVisible(false);
                    }}
                    style={[
                      styles.campusOption,
                      isSelected ? styles.campusOptionSelected : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.campusOptionText,
                        isSelected ? styles.campusOptionTextSelected : null,
                      ]}
                    >
                      {campus}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => setIsCampusPickerVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsBudgetPickerVisible(false)}
        transparent
        visible={isBudgetPickerVisible}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>PRÉFÉRENCE LOCALE</Text>
            <Text style={styles.modalTitle}>Choisir ton budget</Text>
            <Text style={styles.modalDescription}>
              Studymeal pourra privilégier les lieux qui correspondent à ton
              budget.
            </Text>

            <View style={styles.campusOptions}>
              {budgetOptions.map((option) => {
                const isSelected = selectedBudget === option.value;

                return (
                  <Pressable
                    key={option.label}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => {
                      setBudget(option.value);
                      setIsBudgetPickerVisible(false);
                    }}
                    style={[
                      styles.campusOption,
                      isSelected ? styles.campusOptionSelected : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.campusOptionText,
                        isSelected ? styles.campusOptionTextSelected : null,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => setIsBudgetPickerVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsCategoryPickerVisible(false)}
        transparent
        visible={isCategoryPickerVisible}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>PRÉFÉRENCE LOCALE</Text>
            <Text style={styles.modalTitle}>Choisir tes catégories</Text>
            <Text style={styles.modalDescription}>
              Sélectionne les types de lieux que tu veux privilégier. Garde au
              moins une catégorie active.
            </Text>

            <View style={styles.campusOptions}>
              {categoryOptions.map((option) => {
                const isSelected = selectedCategories.includes(option.value);

                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: isSelected }}
                    onPress={() => toggleCategory(option.value)}
                    style={[
                      styles.campusOption,
                      isSelected ? styles.campusOptionSelected : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.campusOptionText,
                        isSelected ? styles.campusOptionTextSelected : null,
                      ]}
                    >
                      {isSelected ? "✓ " : ""}
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => setIsCategoryPickerVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Terminer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
