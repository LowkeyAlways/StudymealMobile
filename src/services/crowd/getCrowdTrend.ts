import { supabase } from "../supabase/client";
import type { CrowdConfidence, CrowdLevel, CrowdTrend } from "../../types/crowd";

type CrowdTrendRow = {
  confidence: CrowdConfidence;
  last_reported_at: string | null;
  level: CrowdLevel | null;
  report_count: number;
};

export async function getCrowdTrend(placeId: string): Promise<CrowdTrend | null> {
  if (supabase === null) {
    return null;
  }

  const { data, error } = await supabase.rpc("get_crowd_trend", {
    target_place_id: placeId,
  });

  if (error !== null || data === null || data.length === 0) {
    return null;
  }

  const trend = data[0] as CrowdTrendRow;

  return {
    confidence: trend.confidence,
    lastReportedAt: trend.last_reported_at,
    level: trend.level,
    reportCount: trend.report_count,
  };
}
