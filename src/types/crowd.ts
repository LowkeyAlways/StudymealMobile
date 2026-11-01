export type CrowdLevel = "quiet" | "moderate" | "busy";

export const crowdLevelLabels: Record<CrowdLevel, string> = {
  quiet: "Fluide",
  moderate: "Modérée",
  busy: "Chargée",
};

export const crowdLevelDescriptions: Record<CrowdLevel, string> = {
  quiet: "Peu ou pas d’attente",
  moderate: "Un peu d’attente",
  busy: "File importante",
};

export type CrowdConfidence = "none" | "low" | "medium" | "high";

export type CrowdTrend = {
  confidence: CrowdConfidence;
  lastReportedAt: string | null;
  level: CrowdLevel | null;
  reportCount: number;
};
