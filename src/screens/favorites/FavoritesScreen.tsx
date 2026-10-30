import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { places } from "../../data/places";
import { useFavorites } from "../../contexts/FavoritesContext";
import { styles } from "../../styles/screens/favorites.styles";

export default function FavoritesScreen() {
  const { favoritePlaceIds, isFavoritesLoading, toggleFavorite } =
    useFavorites();

  const favoritePlaces = places.filter((place) =>
    favoritePlaceIds.includes(place.id),
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>TES REPÈRES</Text>
        <Text style={styles.title}>Tes lieux favoris</Text>
        <Text style={styles.description}>
          Retrouve ici les adresses que tu as enregistrées.
        </Text>

        {isFavoritesLoading ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Chargement de tes favoris…</Text>
            <Text style={styles.emptyDescription}>
              Nous restaurons tes adresses enregistrées.
            </Text>
          </View>
        ) : favoritePlaces.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              Aucun lieu favori pour le moment
            </Text>
            <Text style={styles.emptyDescription}>
              Depuis la fiche d’un lieu, utilise « Ajouter aux favoris » pour le
              retrouver ici.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {favoritePlaces.map((place) => (
              <View key={place.id} style={styles.card}>
                <Text style={styles.category}>
                  {place.category.toUpperCase()}
                </Text>

                <Text style={styles.placeName}>{place.name}</Text>

                <Text style={styles.placeDetails}>
                  {place.priceLabel} · {place.address}
                </Text>

                <Pressable
                  accessibilityLabel={`Retirer ${place.name} des favoris`}
                  accessibilityRole="button"
                  onPress={() => toggleFavorite(place.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>
                    Retirer des favoris
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
