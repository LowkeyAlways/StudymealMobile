import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { styles } from "../../styles/screens/find.styles";
import { places, type Place, type PlaceCategory } from "../../data/places";
import { PlaceCard } from "../../components/places/PlaceCard";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { colors } from "../../styles/theme/colors";
import { Fragment, useRef, useState } from "react";
import { PlaceDetails } from "../../components/places/PlaceDetails";

const parisRiveGaucheRegion = {
  latitude: 48.829,
  longitude: 2.38,
  latitudeDelta: 0.012,
  longitudeDelta: 0.012,
};

const sheetSnapPoints = ["26%", "50%", "88%"];
const markerColors: Record<PlaceCategory, string> = {
  crous: colors.markerCrous,
  solidaire: colors.markerSolidaire,
  "bon-plan": colors.markerBonPlan,
};

export default function FindScreen() {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const bottomSheetRef = useRef<BottomSheet>(null);

  const mapRef = useRef<MapView>(null);

  const selectedPlace = places.find((place) => place.id === selectedPlaceId);

  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase("fr-FR");

  const filteredPlaces = places.filter((place) => {
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

  const selectPlace = (place: Place) => {
    setSelectedPlaceId(place.id);
    bottomSheetRef.current?.snapToIndex(1);

    mapRef.current?.animateToRegion(
      {
        latitude: place.latitude - 0.003,
        longitude: place.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      },
      350,
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <MapView
        ref={mapRef}
        initialRegion={parisRiveGaucheRegion}
        style={styles.map}
        onPress={() => {
          setSelectedPlaceId(null);
          bottomSheetRef.current?.snapToIndex(0);
        }}
      >
        {places.map((place) => {
          const isSelected = selectedPlaceId === place.id;

          return (
            <Fragment key={place.id}>
              <Marker
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                opacity={selectedPlaceId && !isSelected ? 0.45 : 1}
                pinColor={markerColors[place.category]}
                stopPropagation
                onPress={() => selectPlace(place)}
              />

              {isSelected ? (
                <Marker
                  anchor={{ x: 0.5, y: 1 }}
                  coordinate={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                  }}
                  stopPropagation
                  zIndex={2}
                  onPress={() => selectPlace(place)}
                >
                  <View pointerEvents="none" style={styles.selectedMarkerLabel}>
                    <Text
                      numberOfLines={1}
                      style={styles.selectedMarkerLabelText}
                    >
                      {place.name}
                    </Text>
                  </View>
                </Marker>
              ) : null}
            </Fragment>
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
        <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
        <View style={styles.searchSection}>
  <TextInput
    autoCapitalize="none"
    onChangeText={setSearchQuery}
    onFocus={() => bottomSheetRef.current?.snapToIndex(1)}
    onPressIn={() => bottomSheetRef.current?.snapToIndex(1)}
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
              setSearchQuery('');
              selectPlace(place);
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
            <PlaceDetails place={selectedPlace} />
          ) : normalizedSearchQuery.length === 0 ? (
            <View style={styles.placesList}>
              {places.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onPress={() => selectPlace(place)}
                />
              ))}
            </View>
          ) : null}
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}
