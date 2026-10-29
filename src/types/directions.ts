export type RouteMode = "walking" | "cycling" | "driving";

export const routeModeLabels: Record<RouteMode, string> = {
  walking: "À pied",
  cycling: "Vélo",
  driving: "Voiture",
};

export const routeModeActionLabels: Record<RouteMode, string> = {
    walking: "Itinéraire à pied",
    cycling: "Itinéraire à vélo",
    driving: "Itinéraire en voiture",
  };