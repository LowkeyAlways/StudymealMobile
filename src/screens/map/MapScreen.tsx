import { FeaturePlaceholder } from '../../components/feedback/FeaturePlaceholder';
import { PlaceCard } from '../../components/places/PlaceCard';
import { places } from '../../data/places';

export default function MapScreen() {
  return (
    <FeaturePlaceholder
      eyebrow="AUTOUR DE TOI"
      title="Trouve ton repas"
      description={`Découvre ${places.length} lieux autour de ton campus.`}
    >
      {places.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </FeaturePlaceholder>
  );
}