import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { styles } from "../../styles/screens/find.styles";
import { places, type PlaceCategory } from "../../data/places";
import { PlaceCard } from "../../components/places/PlaceCard";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { colors } from "../../styles/theme/colors";
import { useRef, useState } from "react";
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

  const bottomSheetRef = useRef<BottomSheet>(null);

  const selectedPlace = places.find((place) => place.id === selectedPlaceId);

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <MapView
        initialRegion={parisRiveGaucheRegion}
        style={styles.map}
        onPress={() => {
          setSelectedPlaceId(null);
          bottomSheetRef.current?.snapToIndex(0);
        }}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            pinColor={markerColors[place.category]}
            title={place.name}
            description={`${place.priceLabel} · ${place.address}`}
            stopPropagation
            onPress={() => {
              setSelectedPlaceId(place.id);
              bottomSheetRef.current?.snapToIndex(1);
            }}
          />
        ))}
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
          ) : (
            <View style={styles.placesList}>
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}
