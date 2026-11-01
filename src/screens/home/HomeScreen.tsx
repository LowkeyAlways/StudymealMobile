import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/screens/home.styles";
import { places } from "../../data/places";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useRouter } from "expo-router";

/** Écran affiché par la route d'accueil (`src/app/index.tsx`). */
export default function HomeScreen() {
  const router = useRouter();
  const { favoritePlaceIds } = useFavorites();

  const placesCount = places.length;
  const featuredPlace = places[0];
  const favoritesCount = favoritePlaceIds.length;

  const favoritesSummary =
    favoritesCount === 0
      ? "Commence à enregistrer les adresses que tu veux garder."
      : `${favoritesCount} ${
          favoritesCount === 1 ? "lieu enregistré" : "lieux enregistrés"
        } pour plus tard.`;
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.header}>
        <View style={styles.brandMark}>
          <Text style={styles.brandMarkText}>S</Text>
        </View>
        <Text style={styles.brandName}>Studymeal</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.eyebrow}>PRÈS DE TOI</Text>
        <Text style={styles.title}>Trouve ton{"\n"}prochain repas.</Text>
        <Text style={styles.mission}>
          Studymeal t’aide à trouver des options de repas abordables, solidaires
          et CROUS près de ton campus.
        </Text>
        <Pressable
          accessibilityLabel="Explorer les lieux autour de moi"
          accessibilityRole="button"
          onPress={() => router.navigate("/map")}
          style={styles.primaryAction}
        >
          <Text style={styles.primaryActionText}>
            Explorer les lieux autour de moi
          </Text>
        </Pressable>
        <View style={styles.contextCard}>
          <Text style={styles.contextLabel}>AUJOURD’HUI</Text>

          <View style={styles.contextMetrics}>
            <View style={styles.contextMetric}>
              <Text style={styles.contextValue}>{placesCount}</Text>
              <Text style={styles.contextText}>
                {placesCount === 1 ? "lieu disponible" : "lieux disponibles"}
              </Text>
            </View>

            <View style={styles.contextDivider} />

            <View style={styles.contextMetric}>
              <Text style={styles.contextValue}>{favoritesCount}</Text>
              <Text style={styles.contextText}>
                {favoritesCount === 1
                  ? "favori enregistré"
                  : "favoris enregistrés"}
              </Text>
            </View>
          </View>
        </View>
        {featuredPlace ? (
          <View style={styles.featuredCard}>
            <Text style={styles.featuredLabel}>À DÉCOUVRIR</Text>
            <Text style={styles.featuredName}>{featuredPlace.name}</Text>
            <Text style={styles.featuredDetails}>
              {featuredPlace.priceLabel} · {featuredPlace.address}
            </Text>

            <Pressable
              accessibilityLabel={`Voir ${featuredPlace.name} sur la carte`}
              accessibilityRole="button"
              onPress={() =>
                router.navigate({
                  pathname: "/map",
                  params: {
                    placeId: featuredPlace.id,
                  },
                })
              }
              style={styles.featuredAction}
            >
              <Text style={styles.featuredActionText}>Voir sur la carte</Text>
            </Pressable>
          </View>
        ) : null}

      </View>

      <View style={styles.stepCard}>
        <Text style={styles.stepLabel}>TES REPÈRES</Text>
        <Text style={styles.stepTitle}>Tes lieux favoris</Text>
        <Text style={styles.stepDescription}>{favoritesSummary}</Text>
        <Pressable
          accessibilityLabel="Voir mes favoris"
          accessibilityRole="button"
          onPress={() => router.navigate('/profile')}
          style={styles.secondaryAction}
        >
          <Text style={styles.secondaryActionText}>Voir mes favoris</Text>
        </Pressable>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
