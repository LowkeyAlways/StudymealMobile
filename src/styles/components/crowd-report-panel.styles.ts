import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.goldSoft,
    borderRadius: 18,
    marginTop: 24,
    padding: 18,
  },
  description: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  eyebrow: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  emptyTrend: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 12,
  },
  option: {
    backgroundColor: colors.white,
    borderColor: colors.brand,
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    minHeight: 76,
    padding: 10,
  },
  optionDescription: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 3,
  },
  optionDescriptionSelected: {
    color: colors.white,
  },
  optionDisabled: {
    opacity: 0.55,
  },
  optionLabel: {
    color: colors.brand,
    fontSize: 13,
    fontWeight: "800",
  },
  optionLabelSelected: {
    color: colors.white,
  },
  optionSelected: {
    backgroundColor: colors.brand,
  },
  options: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 5,
  },
  trendCard: {
    backgroundColor: colors.white,
    borderColor: colors.brand,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 14,
    padding: 12,
  },
  trendMeta: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  trendTitle: {
    color: colors.brand,
    fontSize: 14,
    fontWeight: "800",
  },
});
