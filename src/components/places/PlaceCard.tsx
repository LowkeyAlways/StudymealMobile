import { Pressable, Text } from 'react-native';
import type { Place } from "../../data/places";
import { styles } from "../../styles/components/place-card.styles";

type PlaceCardProps = {
    place: Place;
    onPress: () => void;
};

export function PlaceCard({ place, onPress }: PlaceCardProps) {
    return (
        <Pressable
  accessibilityLabel={`Voir les détails de ${place.name}`}
  accessibilityRole="button"
  onPress={onPress}
  style={styles.card}
>
            <Text style={styles.category}>{place.category.toUpperCase()}</Text>
            <Text style={styles.name}>{place.name}</Text>
            <Text style={styles.details}>
                {place.priceLabel} · {place.address}
            </Text>
        </Pressable>
    );
}