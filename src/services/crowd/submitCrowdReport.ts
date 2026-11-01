import { supabase } from "../supabase/client";
import type { CrowdLevel } from "../../types/crowd";

export type SubmitCrowdReportResult =
  | { status: "success" }
  | { status: "not-configured" }
  | { status: "rate-limited" }
  | { status: "error" };

export async function submitCrowdReport(
  placeId: string,
  level: CrowdLevel,
): Promise<SubmitCrowdReportResult> {
  if (supabase === null) {
    return { status: "not-configured" };
  }

  const { error } = await supabase.rpc("submit_crowd_report", {
    reported_level: level,
    target_place_id: placeId,
  });

  if (error === null) {
    return { status: "success" };
  }

  if (error.message.includes("already submitted recently")) {
    return { status: "rate-limited" };
  }

  return { status: "error" };
}
