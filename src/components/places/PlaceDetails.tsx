import { Linking, Pressable, Text, View } from "react-native";
import type { Place } from "../../data/places";
import { styles } from "../../styles/components/place-details.styles";
import { RouteModeSelector } from "../directions/RouteModeSelector";
import { routeModeActionLabels, type RouteMode } from "../../types/directions";

type PlaceDetailsProps = {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  place: Place;
  isRouteLoading: boolean;
  onRequestDirections: () => void;
  routeSummary: string | null;
  onClearDirections: () => void;
  onSelectRouteMode: (mode: RouteMode) => void;
  selectedRouteMode: RouteMode;
};

const categoryLabels: Record<Place["category"], string> = {
  crous: "CROUS",
  solidaire: "SOLIDAIRE",
  "bon-plan": "BON PLAN",
};

function formatVerifiedAt(verifiedAt: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${verifiedAt}T12:00:00`));
}

function getSourceStatus(place: Place) {
  if (place.verificationStatus === "to-verify") {
    return `Source indiquée : ${place.sourceName} · informations à vérifier`;
  }

  if (place.verifiedAt) {
    return `Source officielle : ${place.sourceName} · vérifié le ${formatVerifiedAt(place.verifiedAt)}`;
  }

  return `Source indiquée : ${place.sourceName} · signalée comme vérifiée`;
}

export function PlaceDetails({
  isFavorite,
  onToggleFavorite,
  place,
  isRouteLoading,
  onRequestDirections,
  routeSummary,
  onClearDirections,
  onSelectRouteMode,
  selectedRouteMode,
}: PlaceDetailsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>{categoryLabels[place.category]}</Text>

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
          {isFavorite ? "♥ Dans les favoris" : "♡ Ajouter aux favoris"}
        </Text>
      </Pressable>
      <RouteModeSelector
        onSelectMode={onSelectRouteMode}
        selectedMode={selectedRouteMode}
      />
      {routeSummary ? (
        <Pressable
          accessibilityLabel={`Retirer l'itinéraire vers ${place.name}`}
          accessibilityRole="button"
          onPress={onClearDirections}
          style={styles.clearDirectionsButton}
        >
          <Text style={styles.clearDirectionsButtonText}>
            Retirer l’itinéraire
          </Text>
        </Pressable>
      ) : (
        <Pressable
          accessibilityLabel={`${routeModeActionLabels[selectedRouteMode]} vers ${place.name}`}
          accessibilityRole="button"
          disabled={isRouteLoading}
          onPress={() => onRequestDirections()}
          style={[
            styles.directionsButton,
            isRouteLoading ? styles.directionsButtonDisabled : null,
          ]}
        >
          <Text style={styles.directionsButtonText}>
            {isRouteLoading
              ? "Calcul de l’itinéraire…"
              : routeModeActionLabels[selectedRouteMode]}
          </Text>
        </Pressable>
      )}
      {routeSummary ? (
        <Text style={styles.routeSummary}>{routeSummary}</Text>
      ) : null}
      <Text style={styles.sectionLabel}>À PROPOS</Text>
      <Text style={styles.description}>{place.description}</Text>

      <Text style={styles.sectionLabel}>HORAIRES</Text>
      <Text style={styles.content}>{place.openingHours}</Text>

      <View style={styles.practicalCard}>
        <Text style={styles.sectionLabel}>INFOS PRATIQUES</Text>
        <Text style={styles.content}>{place.practicalInfo}</Text>
      </View>
      <Text style={styles.verificationText}>
        {getSourceStatus(place)}
      </Text>
      <Pressable
        accessibilityLabel={`Consulter la source de ${place.name}`}
        accessibilityRole="link"
        onPress={() => void Linking.openURL(place.sourceUrl)}
        style={styles.sourceLink}
      >
        <Text style={styles.sourceLinkText}>Consulter la source</Text>
      </Pressable>
    </View>
  );
}
