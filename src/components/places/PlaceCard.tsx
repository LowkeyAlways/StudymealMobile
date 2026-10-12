import { View, Text } from "react-native";

import type { Place } from "../../data/places";
import { styles } from "../../styles/components/place-card.styles";

type PlaceCardProps = {
    place: Place;
};

export function PlaceCard({ place }: PlaceCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.category}>{place.category.toUpperCase()}</Text>
            <Text style={styles.name}>{place.name}</Text>
            <Text style={styles.details}>
                {place.priceLabel} · {place.address}
            </Text>
        </View>
    );
}