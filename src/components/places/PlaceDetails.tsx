import { Pressable, Text, View } from "react-native";
import type { Place } from "../../data/places";
import { styles } from "../../styles/components/place-details.styles";

type PlaceDetailsProps = {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  place: Place;
};

const categoryLabels: Record<Place["category"], string> = {
  crous: "CROUS",
  solidaire: "SOLIDAIRE",
  "bon-plan": "BON PLAN",
};

export function PlaceDetails({
  isFavorite,
  onToggleFavorite,
  place,
}: PlaceDetailsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>
  {categoryLabels[place.category]}
</Text>

<Pressable
  accessibilityLabel={
    isFavorite
      ? `Retirer ${place.name} des favoris`
      : `Ajouter ${place.name} aux favoris`
  }
  accessibilityRole="button"
  accessibilityState={{ selected: isFavorite }}
  onPress={onToggleFavorite}
  style={[
    styles.favoriteButton,
    isFavorite ? styles.favoriteButtonActive : null,
  ]}
>
  <Text
    style={[
      styles.favoriteButtonText,
      isFavorite ? styles.favoriteButtonTextActive : null,
    ]}
  >
    {isFavorite ? '♥ Dans les favoris' : '♡ Ajouter aux favoris'}
  </Text>
</Pressable>
      <Text style={styles.sectionLabel}>À PROPOS</Text>
      <Text style={styles.description}>{place.description}</Text>

      <Text style={styles.sectionLabel}>HORAIRES</Text>
      <Text style={styles.content}>{place.openingHours}</Text>

      <View style={styles.practicalCard}>
        <Text style={styles.sectionLabel}>INFOS PRATIQUES</Text>
        <Text style={styles.content}>{place.practicalInfo}</Text>
      </View>
    </View>
  );
}
