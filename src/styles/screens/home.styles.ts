import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

/** Styles propres à HomeScreen. Les styles partagés vont dans `src/styles/theme`. */
export const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 9,
    paddingTop: 12,
  },
  brandMark: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 10,
    height: 31,
    justifyContent: "center",
    width: 31,
  },
  brandMarkText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  brandName: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  content: {
    paddingTop: 96,
  },
  eyebrow: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginBottom: 16,
  },
  title: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: -1.8,
    lineHeight: 46,
  },
  description: {
    color: colors.textMuted,
    fontSize: 17,
    lineHeight: 25,
    marginTop: 18,
  },
  stepCard: {
    backgroundColor: colors.surfaceAccent,
    borderRadius: 22,
    marginBottom: 18,
    padding: 20,
    marginTop: 16,
  },
  stepLabel: {
    color: colors.brand,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  stepTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 7,
  },
  stepDescription: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 999,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  primaryActionText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryAction: {
    alignSelf: "flex-start",
    borderColor: colors.brand,
    borderRadius: 999,
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  secondaryActionText: {
    color: colors.brand,
    fontSize: 14,
    fontWeight: "800",
  },
  contextCard: {
    backgroundColor: colors.white,
    borderColor: "#E2E9E5",
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 16,
    padding: 18,
  },
  contextLabel: {
    color: colors.brand,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  contextMetrics: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 14,
  },
  contextMetric: {
    flex: 1,
  },
  contextValue: {
    color: colors.text,
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  contextText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  contextDivider: {
    backgroundColor: "#E2E9E5",
    height: 38,
    marginHorizontal: 16,
    width: 1,
  },
  mission: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 16,
  },
  featuredCard: {
    borderColor: "#E2E9E5",
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 16,
    padding: 18,
  },
  featuredLabel: {
    color: colors.brand,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  featuredName: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 7,
  },
  featuredDetails: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  featuredAction: {
    alignSelf: "flex-start",
    marginTop: 14,
  },
  featuredActionText: {
    color: colors.brand,
    fontSize: 14,
    fontWeight: "800",
  },
});
