import { Alert, Pressable, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { getCrowdTrend } from "../../services/crowd/getCrowdTrend";
import { submitCrowdReport } from "../../services/crowd/submitCrowdReport";
import {
  crowdLevelDescriptions,
  crowdLevelLabels,
  type CrowdConfidence,
  type CrowdTrend,
  type CrowdLevel,
} from "../../types/crowd";
import { styles } from "../../styles/components/crowd-report-panel.styles";

type CrowdReportPanelProps = {
  placeId: string;
  placeName: string;
};

const crowdLevels: CrowdLevel[] = ["quiet", "moderate", "busy"];

const confidenceLabels = {
  low: "confiance faible",
  medium: "confiance moyenne",
  high: "confiance élevée",
} as const;

function getFreshnessLabel(lastReportedAt: string) {
  const elapsedMinutes = Math.max(
    0,
    Math.round((Date.now() - new Date(lastReportedAt).getTime()) / 60_000),
  );

  if (elapsedMinutes < 2) {
    return "à l’instant";
  }

  return `il y a ${elapsedMinutes} min`;
}

function getConfidenceLabel(confidence: CrowdConfidence) {
  if (confidence === "none") {
    return "pas assez de données";
  }

  return confidenceLabels[confidence];
}

export function CrowdReportPanel({
  placeId,
  placeName,
}: CrowdReportPanelProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLevel, setSubmittedLevel] = useState<CrowdLevel | null>(null);
  const [trend, setTrend] = useState<CrowdTrend | null>(null);
  const trendSummary =
    trend === null || trend.level === null || trend.lastReportedAt === null
      ? null
      : {
          confidence: trend.confidence,
          lastReportedAt: trend.lastReportedAt,
          level: trend.level,
          reportCount: trend.reportCount,
        };

  const refreshTrend = useCallback(async () => {
    const nextTrend = await getCrowdTrend(placeId);
    setTrend(nextTrend);
  }, [placeId]);

  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      void refreshTrend();
    }, 0);

    const pollingTimer = setInterval(() => {
      void refreshTrend();
    }, 30_000);

    return () => {
      clearTimeout(refreshTimer);
      clearInterval(pollingTimer);
    };
  }, [refreshTrend]);

  const handleSubmit = async (level: CrowdLevel) => {
    if (user === null) {
      Alert.alert(
        "Connexion requise",
        "Connecte-toi pour contribuer à l’affluence des lieux.",
      );
      return;
    }

    setIsSubmitting(true);
    const result = await submitCrowdReport(placeId, level);
    setIsSubmitting(false);

    if (result.status === "success") {
      setSubmittedLevel(level);
      void refreshTrend();
      Alert.alert(
        "Merci pour ton signalement",
        `L’affluence de ${placeName} a été indiquée comme ${crowdLevelLabels[level].toLowerCase()}.`,
      );
      return;
    }

    if (result.status === "rate-limited") {
      Alert.alert(
        "Signalement déjà envoyé",
        "Tu pourras contribuer à nouveau dans quelques minutes.",
      );
      return;
    }

    Alert.alert(
      "Signalement indisponible",
      "Studymeal ne parvient pas à enregistrer ton signalement pour le moment.",
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>AFFLUENCE</Text>
      <Text style={styles.title}>Comment est l’attente ?</Text>
      <Text style={styles.description}>
        Ton signalement aide les autres étudiants à choisir le bon moment.
      </Text>

      {trendSummary !== null ? (
        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>
            Tendance récente : {crowdLevelLabels[trendSummary.level]}
          </Text>
          <Text style={styles.trendMeta}>
            {trendSummary.reportCount} {trendSummary.reportCount > 1 ? "signalements" : "signalement"} · {getFreshnessLabel(trendSummary.lastReportedAt)} · {getConfidenceLabel(trendSummary.confidence)}
          </Text>
        </View>
      ) : (
        <Text style={styles.emptyTrend}>
          Pas encore de signalement récent pour ce lieu.
        </Text>
      )}

      <View style={styles.options}>
        {crowdLevels.map((level) => {
          const isSelected = submittedLevel === level;

          return (
            <Pressable
              key={level}
              accessibilityLabel={`Signaler une affluence ${crowdLevelLabels[level].toLowerCase()}`}
              accessibilityRole="button"
              accessibilityState={{ disabled: isSubmitting, selected: isSelected }}
              disabled={isSubmitting}
              onPress={() => void handleSubmit(level)}
              style={[
                styles.option,
                isSelected ? styles.optionSelected : null,
                isSubmitting ? styles.optionDisabled : null,
              ]}
            >
              <Text
                style={[
                  styles.optionLabel,
                  isSelected ? styles.optionLabelSelected : null,
                ]}
              >
                {crowdLevelLabels[level]}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  isSelected ? styles.optionDescriptionSelected : null,
                ]}
              >
                {crowdLevelDescriptions[level]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
