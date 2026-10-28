import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

/** Styles propres à HomeScreen. Les styles partagés vont dans `src/styles/theme`. */
export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
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
    flex: 1,
    justifyContent: "center",
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
});
