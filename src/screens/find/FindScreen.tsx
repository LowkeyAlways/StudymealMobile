import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline, type MapMarker } from "react-native-maps";
import ClusteredMapView from "react-native-map-clustering";
import { styles } from "../../styles/screens/find.styles";
import { places, type Place, type PlaceCategory } from "../../data/places";
import { PlaceCard } from "../../components/places/PlaceCard";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { colors } from "../../styles/theme/colors";
import {
  type ComponentProps,
  type ComponentType,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { PlaceDetails } from "../../components/places/PlaceDetails";
import { useFavorites } from "../../contexts/FavoritesContext";
import { getRoute, type Route } from "../../services/directions/getRoute";
import {
  getUserLocation,
  type UserCoordinates,
} from "../../services/location/getUserLocation";
import { routeModeLabels, type RouteMode } from "../../types/directions";
import { UserLocationButton } from "../../components/map/UserLocationButton";
import { usePreferences } from "../../contexts/PreferencesContext";
import {
  budgetOptions,
  categoryOptions,
  type CategoryPreference,
} from "../../types/preferences";
import { useLocalSearchParams, useRouter } from "expo-router";

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

type BudgetFilter = number | "all";

const categoryFilters: {
  color: string;
  id: CategoryPreference;
  label: string;
}[] = [
  { color: colors.markerCrous, id: "crous", label: "CROUS" },
  { color: colors.markerSolidaire, id: "solidaire", label: "Solidaire" },
  { color: colors.markerBonPlan, id: "bon-plan", label: "Bon plan" },
];

const budgetFilters: { value: BudgetFilter; label: string }[] = [
  { value: "all", label: "Tous budgets" },
  { value: 3, label: "≤ 3 €" },
  { value: 6, label: "≤ 6 €" },
  { value: 10, label: "≤ 10 €" },
];

type NonClusteredMarkerProps = ComponentProps<typeof Marker> & {
  cluster: false;
};

const NonClusteredMarker = Marker as unknown as ComponentType<NonClusteredMarkerProps>;

export default function FindScreen() {

  const { placeId } = useLocalSearchParams<{ placeId?: string }>();

  const router = useRouter();

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [isSearchActive, setIsSearchActive] = useState(false);

  const [selectedBudget, setSelectedBudget] = useState<BudgetFilter>("all");

  const [hasSelectedBudgetManually, setHasSelectedBudgetManually] =
    useState(false);

  const [selectedCategories, setSelectedCategories] = useState<
    CategoryPreference[]
  >(categoryOptions.map((option) => option.value));

  const [hasSelectedCategoriesManually, setHasSelectedCategoriesManually] =
    useState(false);

  const [showAllCampuses, setShowAllCampuses] = useState(false);

  const [walkingRoute, setWalkingRoute] = useState<Route | null>(null);

  const [isRouteLoading, setIsRouteLoading] = useState(false);

  const [userLocation, setUserLocation] = useState<UserCoordinates | null>(
    null,
  );

  const [isLocatingUser, setIsLocatingUser] = useState(false);

  const [selectedRouteMode, setSelectedRouteMode] =
    useState<RouteMode>("walking");

  const bottomSheetRef = useRef<BottomSheet>(null);

  const mapRef = useRef<MapView>(null);

  const searchInputRef = useRef<TextInput>(null);

  const markerRefs = useRef<Record<string, MapMarker | null>>({});

  const ignoreMapPressRef = useRef(false);

  const { favoritePlaceIds, toggleFavorite } = useFavorites();
  const {
    isPreferencesLoading,
    selectedBudget: preferredBudget,
    selectedCategories: preferredCategories,
    selectedCampus,
  } = usePreferences();

  const selectedPlace = places.find((place) => place.id === selectedPlaceId);

  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase("fr-FR");

  const activeBudget =
    !isPreferencesLoading && !hasSelectedBudgetManually
      ? preferredBudget
      : selectedBudget;

  const activeCategories =
    !isPreferencesLoading && !hasSelectedCategoriesManually
      ? preferredCategories
      : selectedCategories;

  const campusFilteredPlaces =
    selectedCampus !== null && !showAllCampuses
      ? places.filter((place) => place.campuses.includes(selectedCampus))
      : places;

  const categoryFilteredPlaces = campusFilteredPlaces.filter((place) => {
    return activeCategories.includes(place.category);
  });

  const budgetFilteredPlaces = categoryFilteredPlaces.filter((place) => {
    return activeBudget === "all" || place.budgetAmount <= activeBudget;
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

  const activeBudgetLabel =
    budgetOptions.find((option) => option.value === activeBudget)?.label ??
    "Tous budgets";

  const activeCategoriesLabel =
    activeCategories.length === categoryOptions.length
      ? "Toutes catégories"
      : categoryOptions
          .filter((option) => activeCategories.includes(option.value))
          .map((option) => option.label)
          .join(" · ");

  const hasTemporaryFilters =
    hasSelectedBudgetManually ||
    hasSelectedCategoriesManually ||
    showAllCampuses;

  const toggleCategory = (category: CategoryPreference) => {
    const isSelected = activeCategories.includes(category);

    if (isSelected && activeCategories.length === 1) {
      return;
    }

    const updatedCategories = isSelected
      ? activeCategories.filter(
          (selectedCategory) => selectedCategory !== category,
        )
      : [...activeCategories, category];

    setHasSelectedCategoriesManually(true);
    setSelectedCategories(updatedCategories);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);

    if (selectedPlaceId !== null) {
      markerRefs.current[selectedPlaceId]?.hideCallout();
      setSelectedPlaceId(null);
    }
  };

  const selectPlace = useCallback((place: Place, sheetIndex = 1) => {
    ignoreMapPressRef.current = true;

    setTimeout(() => {
      ignoreMapPressRef.current = false;
    }, 100);
    setIsSearchActive(false);
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
  }, []);

  useEffect(() => {
    if (typeof placeId !== "string") {
      return;
    }

    const placeFromHome = places.find((place) => place.id === placeId);

    if (!placeFromHome) {
      router.setParams({ placeId: undefined });
      return;
    }

    const selectionTimeout = setTimeout(() => {
      selectPlace(placeFromHome);
      router.setParams({ placeId: undefined });
    }, 0);

    return () => {
      clearTimeout(selectionTimeout);
    };
  }, [placeId, router, selectPlace]);

  const handleRequestDirections = async (
    mode: RouteMode = selectedRouteMode,
  ) => {
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

      setUserLocation(locationResult.coordinates);

      const routeResult = await getRoute(
        locationResult.coordinates,
        {
          latitude: selectedPlace.latitude,
          longitude: selectedPlace.longitude,
        },
        mode,
      );

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

  const handleCenterOnUser = async () => {
    if (isLocatingUser) {
      return;
    }

    setIsLocatingUser(true);

    try {
      const locationResult = await getUserLocation();

      if (locationResult.status === "success") {
        setUserLocation(locationResult.coordinates);
        bottomSheetRef.current?.snapToIndex(0);

        mapRef.current?.animateToRegion(
          {
            latitude: locationResult.coordinates.latitude,
            longitude: locationResult.coordinates.longitude,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
          },
          350,
        );

        return;
      }

      const messages = {
        "permission-denied":
          "Autorise Studymeal à accéder à ta position pour te recentrer sur la carte.",
        "services-disabled":
          "Active les services de localisation de ton appareil, puis réessaie.",
        unavailable:
          "Studymeal ne parvient pas à récupérer ta position pour le moment.",
      };

      Alert.alert("Position indisponible", messages[locationResult.status]);
    } finally {
      setIsLocatingUser(false);
    }
  };

  const handleClearDirections = () => {
    setWalkingRoute(null);
  };

  const handleSelectRouteMode = (mode: RouteMode) => {
    if (mode === selectedRouteMode || isRouteLoading) {
      return;
    }

    const hasActiveRoute = walkingRoute !== null;

    setSelectedRouteMode(mode);

    if (hasActiveRoute) {
      void handleRequestDirections(mode);
    }
  };

  const routeStart = walkingRoute?.coordinates[0];

  const routeSummary = walkingRoute
    ? `${Math.ceil(walkingRoute.durationSeconds / 60)} min · ${
        walkingRoute.distanceMeters < 1000
          ? `${Math.round(walkingRoute.distanceMeters)} m`
          : `${(walkingRoute.distanceMeters / 1000).toFixed(1)} km`
      } · ${routeModeLabels[selectedRouteMode]}`
    : null;

  const routeSummaryCoordinate = walkingRoute
    ? walkingRoute.coordinates[Math.floor(walkingRoute.coordinates.length / 2)]
    : null;

  const visibleMapPlaces =
    (walkingRoute || isRouteLoading) && selectedPlace
      ? [selectedPlace]
      : selectedPlace &&
          !budgetFilteredPlaces.some((place) => place.id === selectedPlace.id)
        ? [...budgetFilteredPlaces, selectedPlace]
        : budgetFilteredPlaces;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ClusteredMapView
        clusterColor={colors.brand}
        clusterTextColor={colors.white}
        edgePadding={{ bottom: 450, left: 100, right: 100, top: 140 }}
        ref={mapRef}
        initialRegion={parisRiveGaucheRegion}
        minPoints={2}
        radius={18}
        spiralEnabled
        spiderLineColor={colors.brand}
        style={styles.map}
        onPress={() => {
          if (ignoreMapPressRef.current) {
            return;
          }

          searchInputRef.current?.blur();
          Keyboard.dismiss();
          setIsSearchActive(false);

          if (selectedPlaceId !== null) {
            markerRefs.current[selectedPlaceId]?.hideCallout();
          }

          setSelectedPlaceId(null);
          bottomSheetRef.current?.snapToIndex(0);
          setWalkingRoute(null);
        }}
      >
        {userLocation ? (
          <NonClusteredMarker
            anchor={{ x: 0.5, y: 0.5 }}
            cluster={false}
            coordinate={userLocation}
            zIndex={40}
          >
            <View style={styles.userLocationMarker}>
              <View style={styles.userLocationMarkerCore} />
            </View>
          </NonClusteredMarker>
        ) : null}
        {routeStart ? (
          <NonClusteredMarker
            anchor={{ x: 0.5, y: 0.5 }}
            cluster={false}
            coordinate={routeStart}
            zIndex={20}
          >
            <View style={styles.routeStartMarker}>
              <View style={styles.routeStartMarkerCore} />
            </View>
          </NonClusteredMarker>
        ) : null}
        {walkingRoute ? (
          <Polyline
            coordinates={walkingRoute.coordinates}
            strokeColor={colors.brand}
            strokeWidth={5}
          />
        ) : null}

        {routeSummaryCoordinate && routeSummary ? (
          <NonClusteredMarker
            anchor={{ x: 0.5, y: 0.5 }}
            cluster={false}
            coordinate={routeSummaryCoordinate}
            zIndex={30}
          >
            <View style={styles.routeSummaryMarker}>
              <Text style={styles.routeSummaryMarkerText}>{routeSummary}</Text>
            </View>
          </NonClusteredMarker>
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
      </ClusteredMapView>

      <UserLocationButton
        isLoading={isLocatingUser}
        onPress={handleCenterOnUser}
      />

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
              onFocus={() => {
                setIsSearchActive(true);
                bottomSheetRef.current?.snapToIndex(2);
              }}
              placeholder="Rechercher un lieu"
              placeholderTextColor={colors.textMuted}
              style={styles.searchInput}
              value={searchQuery}
            />

            {isSearchActive && normalizedSearchQuery.length > 0 ? (
              <ScrollView
                contentContainerStyle={styles.suggestionsContent}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                showsVerticalScrollIndicator
                style={styles.suggestions}
              >
                {filteredPlaces.length > 0 ? (
                  filteredPlaces.map((place) => (
                    <Pressable
                      key={place.id}
                      accessibilityLabel={`Sélectionner ${place.name}`}
                      accessibilityRole="button"
                      onPress={() => {
                        searchInputRef.current?.blur();
                        setSearchQuery("");
                        selectPlace(place);
                      }}
                      style={styles.suggestion}
                    >
                      <Text numberOfLines={1} style={styles.suggestionName}>
                        {place.name}
                      </Text>
                      <Text numberOfLines={1} style={styles.suggestionDetails}>
                        {place.priceLabel} · {place.address}
                      </Text>
                    </Pressable>
                  ))
                ) : (
                  <Text style={styles.emptySuggestions}>
                    Aucun lieu ne correspond à cette recherche.
                  </Text>
                )}
              </ScrollView>
            ) : null}
          </View>
          {!selectedPlace ? (
            <View style={styles.profileFiltersHint}>
              <View>
                <Text style={styles.profileFiltersHintEyebrow}>
                  FILTRES ACTIFS
                </Text>
                <Text style={styles.profileFiltersHintText}>
                  {activeCategoriesLabel} · {activeBudgetLabel}
                </Text>
              </View>
              {hasTemporaryFilters ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    setHasSelectedBudgetManually(false);
                    setHasSelectedCategoriesManually(false);
                    setShowAllCampuses(false);
                  }}
                  style={styles.resetFiltersButton}
                >
                  <Text style={styles.resetFiltersButtonText}>Réinitialiser</Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}
          {!selectedPlace && selectedCampus ? (
            <View style={styles.campusFilterCard}>
              <View style={styles.campusFilterCopy}>
                <Text style={styles.campusFilterEyebrow}>CAMPUS</Text>
                <Text style={styles.campusFilterTitle}>
                  {showAllCampuses ? "Tous les campus" : selectedCampus}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowAllCampuses((isShowingAll) => !isShowingAll)}
                style={styles.campusFilterButton}
              >
                <Text style={styles.campusFilterButtonText}>
                  {showAllCampuses ? "Mon campus" : "Tout voir"}
                </Text>
              </Pressable>
            </View>
          ) : null}
          {!selectedPlace ? (
            <View style={styles.filters}>
              {categoryFilters.map((filter) => {
                const isSelected = activeCategories.includes(filter.id);

                return (
                  <Pressable
                    key={filter.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => toggleCategory(filter.id)}
                    style={[
                      styles.filterChip,
                      isSelected
                        ? {
                            backgroundColor: filter.color,
                            borderColor: filter.color,
                          }
                        : null,
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
                  const isSelected = activeBudget === filter.value;

                  return (
                    <Pressable
                      key={filter.label}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                      onPress={() => {
                        setHasSelectedBudgetManually(true);
                        setSelectedBudget(filter.value);
                      }}
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
              onSelectRouteMode={handleSelectRouteMode}
              selectedRouteMode={selectedRouteMode}
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
