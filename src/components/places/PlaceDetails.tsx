import { Text, View } from 'react-native';

import type { Place } from '../../data/places';
import { styles } from '../../styles/components/place-details.styles';

type PlaceDetailsProps = {
  place: Place;
};

const categoryLabels: Record<Place['category'], string> = {
  crous: 'CROUS',
  solidaire: 'SOLIDAIRE',
  'bon-plan': 'BON PLAN',
};

export function PlaceDetails({ place }: PlaceDetailsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>
  {categoryLabels[place.category]}
</Text>
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