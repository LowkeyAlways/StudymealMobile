import type { RouteMode } from "../../types/directions";
import type { UserCoordinates } from "../location/getUserLocation";

export type Route = {
  coordinates: UserCoordinates[];
  distanceMeters: number;
  durationSeconds: number;
};

export type RouteResult =
  | { status: "success"; route: Route }
  | { status: "missing-token" }
  | { status: "unavailable" };

type MapboxDirectionsResponse = {
  routes?: Array<{
    distance: number;
    duration: number;
    geometry: {
      coordinates: Array<[number, number]>;
    };
  }>;
};

export async function getRoute(
  origin: UserCoordinates,
  destination: UserCoordinates,
  mode: RouteMode,
): Promise<RouteResult> {
  const accessToken = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (!accessToken) {
    return { status: "missing-token" };
  }

  const coordinates = [
    `${origin.longitude},${origin.latitude}`,
    `${destination.longitude},${destination.latitude}`,
  ].join(";");

  const url =
    `https://api.mapbox.com/directions/v5/mapbox/${mode}/${coordinates}` +
    `?access_token=${encodeURIComponent(accessToken)}` +
    "&geometries=geojson" +
    "&overview=full";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { status: "unavailable" };
    }

    const data = (await response.json()) as MapboxDirectionsResponse;
    const route = data.routes?.[0];

    if (!route || route.geometry.coordinates.length === 0) {
      return { status: "unavailable" };
    }

    return {
      status: "success",
      route: {
        coordinates: route.geometry.coordinates.map(
          ([longitude, latitude]) => ({
            latitude,
            longitude,
          }),
        ),
        distanceMeters: route.distance,
        durationSeconds: route.duration,
      },
    };
  } catch {
    return { status: "unavailable" };
  }
}