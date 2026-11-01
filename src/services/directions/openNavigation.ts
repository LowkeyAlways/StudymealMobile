import { Linking, Platform } from "react-native";

import type { Place } from "../../data/places";
import type { RouteMode } from "../../types/directions";
import type { NavigationApp } from "../../types/navigation";

type NavigationResult =
  | { status: "success" }
  | { status: "unavailable" };

const googleTravelModes: Record<RouteMode, string> = {
  walking: "walking",
  cycling: "bicycling",
  driving: "driving",
};

const appleTravelModes: Record<RouteMode, string> = {
  walking: "walking",
  cycling: "cycling",
  driving: "driving",
};

function getDestination(place: Place) {
  return `${place.latitude},${place.longitude}`;
}

async function openGoogleMaps(
  appUrl: string,
  webUrl: string,
): Promise<boolean> {
  try {
    await Linking.openURL(appUrl);
    return true;
  } catch {
    // Google Maps n’est peut-être pas installé : son lien universel reste utile.
  }

  try {
    await Linking.openURL(webUrl);
    return true;
  } catch {
    return false;
  }
}

export async function openNavigation(
  place: Place,
  mode: RouteMode,
  preferredApp?: NavigationApp,
): Promise<NavigationResult> {
  const destination = getDestination(place);
  const googleTravelMode = googleTravelModes[mode];
  const googleMapsAppUrl = `comgooglemaps://?daddr=${encodeURIComponent(destination)}&directionsmode=${googleTravelMode}`;
  const googleMapsWebUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=${googleTravelMode}&dir_action=navigate`;

  try {
    if (Platform.OS === "ios" && preferredApp === "apple-maps") {
      const appleMapsUrl = `https://maps.apple.com/directions?destination=${encodeURIComponent(destination)}&mode=${appleTravelModes[mode]}`;

      await Linking.openURL(appleMapsUrl);
      return { status: "success" };
    }

    if (Platform.OS === "ios" && preferredApp === "google-maps") {
      const didOpenGoogleMaps = await openGoogleMaps(
        googleMapsAppUrl,
        googleMapsWebUrl,
      );

      return { status: didOpenGoogleMaps ? "success" : "unavailable" };
    }

    const didOpenGoogleMaps = await openGoogleMaps(
      googleMapsAppUrl,
      googleMapsWebUrl,
    );

    return { status: didOpenGoogleMaps ? "success" : "unavailable" };
  } catch {
    return { status: "unavailable" };
  }
}
