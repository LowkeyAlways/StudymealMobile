import * as Location from "expo-location";

export type UserCoordinates = {
  latitude: number;
  longitude: number;
};

export type UserLocationResult =
  | {
      status: "success";
      coordinates: UserCoordinates;
    }
  | {
      status: "permission-denied";
    }
  | {
      status: "services-disabled";
    }
  | {
      status: "unavailable";
    };

export async function getUserLocation(): Promise<UserLocationResult> {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== "granted") {
    return { status: "permission-denied" };
  }

  const areLocationServicesEnabled =
    await Location.hasServicesEnabledAsync();

  if (!areLocationServicesEnabled) {
    return { status: "services-disabled" };
  }

  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      status: "success",
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    };
  } catch {
    return { status: "unavailable" };
  }
}