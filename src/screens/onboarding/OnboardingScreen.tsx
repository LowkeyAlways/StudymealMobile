import {
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useRef, useState } from "react";

import { styles } from "../../styles/screens/onboarding.styles";

const slides = [
  {
    description:
      "Découvre les options abordables, solidaires et CROUS près de ton campus.",
    image: require("../../../assets/onboarding/discover-places.png"),
    title: "Trouve ton prochain repas.",
  },
  {
    description:
      "Compare les lieux et leurs tarifs pour choisir une pause qui te convient vraiment.",
    image: require("../../../assets/onboarding/choose-meal.png"),
    title: "Mange mieux, sans chercher partout.",
  },
  {
    description:
      "Enregistre tes bonnes adresses, renseigne tes préférences et prépare tes futures découvertes.",
    image: require("../../../assets/onboarding/save-preferences.png"),
    title: "Tes repères, à portée de main.",
  },
] as const;

export default function OnboardingScreen() {
  const carouselRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === slides.length - 1;
  const slideWidth = width - 48;

  const finishOnboarding = () => {
    router.replace("../auth");
  };

  const goToNextSlide = () => {
    if (isLastSlide) {
      finishOnboarding();
      return;
    }

    carouselRef.current?.scrollTo({
      animated: true,
      x: (activeIndex + 1) * slideWidth,
    });
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>S</Text>
            </View>
            <Text style={styles.brandName}>Studymeal</Text>
          </View>

          <Pressable
            accessibilityLabel="Passer la présentation"
            accessibilityRole="button"
            onPress={finishOnboarding}
            style={styles.skipButton}
          >
            <Text style={styles.skipButtonText}>Passer</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          onMomentumScrollEnd={(event) => {
            const nextIndex = Math.round(
              event.nativeEvent.contentOffset.x / slideWidth,
            );

            setActiveIndex(nextIndex);
          }}
          pagingEnabled
          ref={carouselRef}
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
          {slides.map((slide) => (
            <View key={slide.title} style={[styles.slide, { width: slideWidth }]}>
              <View style={styles.illustrationContainer}>
                <Image
                  resizeMode="contain"
                  source={slide.image}
                  style={styles.illustration}
                />
              </View>

              <View style={styles.copy}>
                <Text style={styles.eyebrow}>BIENVENUE</Text>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.description}>{slide.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {slides.map((slide, index) => (
              <View
                key={slide.title}
                style={[styles.dot, index === activeIndex ? styles.dotActive : null]}
              />
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={goToNextSlide}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              {isLastSlide ? "Connexion / Inscription" : "Suivant"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
