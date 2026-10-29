import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline, type MapMarker } from "react-native-maps";
import { styles } from "../../styles/screens/find.styles";
import { places, type Place, type PlaceCategory } from "../../data/places";
import { PlaceCard } from "../../components/places/PlaceCard";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { colors } from "../../styles/theme/colors";
import { useRef, useState } from "react";
import { PlaceDetails } from "../../components/places/PlaceDetails";
import { useFavorites } from "../../contexts/FavoritesContext";
import {
  getWalkingRoute,
  type WalkingRoute,
} from "../../services/directions/getWalkingRoute";
import { getUserLocation } from "../../services/location/getUserLocation";

const parisRiveGaucheRegion = {
  latitude: 48.829,
  longitude: 2.38,
  latitudeDelta: 0.012,
  longitudeDelta: 0.012,
};

const sheetSnapPoints = ["26%", "50%", "70%", "88%"];
const markerColors: Record<PlaceCategory, string> = {
  crous: colors.markerCrous,
  solidaire: colors.markerSolidaire,
  "bon-plan": colors.markerBonPlan,
};

type CategoryFilter = PlaceCategory | "all";

type BudgetFilter = number | "all";

const categoryFilters: Array<{ id: CategoryFilter; label: string }> = [
  { id: "all", label: "Tous" },
  { id: "crous", label: "CROUS" },
  { id: "solidaire", label: "Solidaire" },
  { id: "bon-plan", label: "Bon plan" },
];

const budgetFilters: Array<{ value: BudgetFilter; label: string }> = [
  { value: "all", label: "Tous budgets" },
  { value: 3, label: "≤ 3 €" },
  { value: 6, label: "≤ 6 €" },
  { value: 10, label: "≤ 10 €" },
];

export default function FindScreen() {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");

  const [selectedBudget, setSelectedBudget] = useState<BudgetFilter>("all");

  const [walkingRoute, setWalkingRoute] = useState<WalkingRoute | null>(null);
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const mapRef = useRef<MapView>(null);

  const searchInputRef = useRef<TextInput>(null);

  const markerRefs = useRef<Record<string, MapMarker | null>>({});

  const ignoreMapPressRef = useRef(false);

  const { favoritePlaceIds, toggleFavorite } = useFavorites();

  const selectedPlace = places.find((place) => place.id === selectedPlaceId);

  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase("fr-FR");

  const categoryFilteredPlaces = places.filter((place) => {
    return selectedCategory === "all" || place.category === selectedCategory;
  });

  const budgetFilteredPlaces = categoryFilteredPlaces.filter((place) => {
    return selectedBudget === "all" || place.budgetAmount <= selectedBudget;
  });

  const filteredPlaces = budgetFilteredPlaces.filter((place) => {
    const searchableText = [
      place.name,
      place.category,
      place.address,
      place.priceLabel,
    ]
      .join(" ")
      .toLocaleLowerCase("fr-FR");

    return searchableText.includes(normalizedSearchQuery);
  });

  const resultCount =
    normalizedSearchQuery.length > 0
      ? filteredPlaces.length
      : budgetFilteredPlaces.length;

  const resultLabel =
    resultCount === 0
      ? "Aucun lieu trouvé"
      : resultCount === 1
        ? "1 lieu trouvé"
        : `${resultCount} lieux trouvés`;

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);

    if (selectedPlaceId !== null) {
      markerRefs.current[selectedPlaceId]?.hideCallout();
      setSelectedPlaceId(null);
    }
  };

  const selectPlace = (place: Place, sheetIndex = 1) => {
    ignoreMapPressRef.current = true;

    setTimeout(() => {
      ignoreMapPressRef.current = false;
    }, 100);
    setWalkingRoute(null);
    setSelectedPlaceId(place.id);
    bottomSheetRef.current?.snapToIndex(sheetIndex);

    mapRef.current?.animateToRegion(
      {
        latitude: place.latitude - 0.003,
        longitude: place.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      },
      350,
    );
    setTimeout(() => {
      markerRefs.current[place.id]?.showCallout();
    }, 400);
  };

  const handleRequestDirections = async () => {
    if (!selectedPlace || isRouteLoading) {
      return;
    }

    setIsRouteLoading(true);

    try {
      const locationResult = await getUserLocation();

      if (locationResult.status !== "success") {
        const messages = {
          "permission-denied":
            "Autorise Studymeal à accéder à ta position pour calculer l’itinéraire.",
          "services-disabled":
            "Active les services de localisation de ton appareil, puis réessaie.",
          unavailable:
            "Studymeal ne parvient pas à récupérer ta position pour le moment.",
        };

        Alert.alert("Position indisponible", messages[locationResult.status]);
        return;
      }

      const routeResult = await getWalkingRoute(locationResult.coordinates, {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      });

      if (routeResult.status !== "success") {
        Alert.alert(
          "Itinéraire indisponible",
          routeResult.status === "missing-token"
            ? "La clé Mapbox est absente de la configuration locale."
            : "Studymeal ne parvient pas à calculer cet itinéraire pour le moment.",
        );
        return;
      }

      setWalkingRoute(routeResult.route);

      bottomSheetRef.current?.snapToIndex(1);

      mapRef.current?.fitToCoordinates(routeResult.route.coordinates, {
        animated: true,
        edgePadding: {
          bottom: 480,
          left: 40,
          right: 40,
          top: 120,
        },
      });
    } finally {
      setIsRouteLoading(false);
    }
  };

  const handleClearDirections = () => {
    setWalkingRoute(null);
  };
  const routeStart = walkingRoute?.coordinates[0];

  const routeSummary = walkingRoute
    ? `${Math.ceil(walkingRoute.durationSeconds / 60)} min à pied · ${
        walkingRoute.distanceMeters < 1000
          ? `${Math.round(walkingRoute.distanceMeters)} m`
          : `${(walkingRoute.distanceMeters / 1000).toFixed(1)} km`
      }`
    : null;

  const routeSummaryCoordinate = walkingRoute
    ? walkingRoute.coordinates[Math.floor(walkingRoute.coordinates.length / 2)]
    : null;

  const visibleMapPlaces =
    walkingRoute && selectedPlace ? [selectedPlace] : budgetFilteredPlaces;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <MapView
        ref={mapRef}
        initialRegion={parisRiveGaucheRegion}
        style={styles.map}
        onPress={() => {
          if (ignoreMapPressRef.current) {
            return;
          }

          searchInputRef.current?.blur();
          Keyboard.dismiss();

          if (selectedPlaceId !== null) {
            markerRefs.current[selectedPlaceId]?.hideCallout();
          }

          setSelectedPlaceId(null);
          bottomSheetRef.current?.snapToIndex(0);
          setWalkingRoute(null);
        }}
      >
        {routeStart ? (
          <Marker
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={routeStart}
            zIndex={20}
          >
            <View style={styles.routeStartMarker}>
              <View style={styles.routeStartMarkerCore} />
            </View>
          </Marker>
        ) : null}
        {walkingRoute ? (
          <Polyline
            coordinates={walkingRoute.coordinates}
            strokeColor={colors.brand}
            strokeWidth={5}
          />
        ) : null}

        {routeSummaryCoordinate && routeSummary ? (
          <Marker
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={routeSummaryCoordinate}
            zIndex={30}
          >
            <View style={styles.routeSummaryMarker}>
              <Text style={styles.routeSummaryMarkerText}>{routeSummary}</Text>
            </View>
          </Marker>
        ) : null}
        {visibleMapPlaces.map((place) => {
          const isSelected = selectedPlaceId === place.id;

          return (
            <Marker
              key={place.id}
              ref={(marker) => {
                markerRefs.current[place.id] = marker;
              }}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              title={place.name}
              opacity={selectedPlaceId !== null && !isSelected ? 0.45 : 1}
              pinColor={markerColors[place.category]}
              calloutOffset={{ x: 0, y: -37 }}
              onPress={() => selectPlace(place)}
            ></Marker>
          );
        })}
      </MapView>

      <BottomSheet
        index={0}
        snapPoints={sheetSnapPoints}
        enableDynamicSizing={false}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handle}
        ref={bottomSheetRef}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.sheetContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.searchSection}>
            <TextInput
              autoCapitalize="none"
              ref={searchInputRef}
              onChangeText={handleSearchChange}
              onFocus={() => bottomSheetRef.current?.snapToIndex(2)}
              placeholder="Rechercher un lieu"
              placeholderTextColor={colors.textMuted}
              style={styles.searchInput}
              value={searchQuery}
            />

            {normalizedSearchQuery.length > 0 ? (
              <View style={styles.suggestions}>
                {filteredPlaces.length > 0 ? (
                  filteredPlaces.map((place) => (
                    <Pressable
                      key={place.id}
                      accessibilityLabel={`Sélectionner ${place.name}`}
                      accessibilityRole="button"
                      onPress={() => {
                        searchInputRef.current?.blur();
                        setSearchQuery("");
                        selectPlace(place, 0);
                      }}
                      style={styles.suggestion}
                    >
                      <Text style={styles.suggestionName}>{place.name}</Text>
                      <Text style={styles.suggestionDetails}>
                        {place.priceLabel} · {place.address}
                      </Text>
                    </Pressable>
                  ))
                ) : (
                  <Text style={styles.emptySuggestions}>
                    Aucun lieu ne correspond à cette recherche.
                  </Text>
                )}
              </View>
            ) : null}
          </View>
          {!selectedPlace ? (
            <View style={styles.filters}>
              {categoryFilters.map((filter) => {
                const isSelected = selectedCategory === filter.id;

                return (
                  <Pressable
                    key={filter.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => setSelectedCategory(filter.id)}
                    style={[
                      styles.filterChip,
                      isSelected ? styles.filterChipSelected : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        isSelected ? styles.filterChipTextSelected : null,
                      ]}
                    >
                      {filter.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}

          {!selectedPlace ? (
            <View>
              <Text style={styles.budgetFilterLabel}>BUDGET INDICATIF</Text>

              <View style={styles.filters}>
                {budgetFilters.map((filter) => {
                  const isSelected = selectedBudget === filter.value;

                  return (
                    <Pressable
                      key={filter.label}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                      onPress={() => setSelectedBudget(filter.value)}
                      style={[
                        styles.filterChip,
                        isSelected ? styles.filterChipSelected : null,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          isSelected ? styles.filterChipTextSelected : null,
                        ]}
                      >
                        {filter.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}
          {!selectedPlace ? (
            <Text style={styles.resultCount}>{resultLabel}</Text>
          ) : null}
          <Text style={styles.eyebrow}>À PROXIMITÉ</Text>

          <Text style={styles.title}>
            {selectedPlace ? selectedPlace.name : "Lieux autour de toi"}
          </Text>

          <Text style={styles.description}>
            {selectedPlace
              ? `${selectedPlace.priceLabel} · ${selectedPlace.address}`
              : "Fais glisser cette fenêtre vers le haut pour consulter les bonnes adresses."}
          </Text>

          {selectedPlace ? (
            <PlaceDetails
              isFavorite={favoritePlaceIds.includes(selectedPlace.id)}
              onToggleFavorite={() => toggleFavorite(selectedPlace.id)}
              place={selectedPlace}
              isRouteLoading={isRouteLoading}
              onRequestDirections={handleRequestDirections}
              onClearDirections={handleClearDirections}
              routeSummary={routeSummary}
            />
          ) : normalizedSearchQuery.length === 0 ? (
            budgetFilteredPlaces.length > 0 ? (
              <View style={styles.placesList}>
                {budgetFilteredPlaces.map((place) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    onPress={() => selectPlace(place)}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyCategoryState}>
                <Text style={styles.emptyCategoryTitle}>
                  Aucun lieu ne correspond aux filtres
                </Text>
                <Text style={styles.emptyCategoryDescription}>
                  Essaie un autre budget ou une autre catégorie.
                </Text>
              </View>
            )
          ) : null}
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}
