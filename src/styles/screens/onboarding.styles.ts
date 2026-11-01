import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
  },
  brand: {
    alignItems: "center",
    flexDirection: "row",
    gap: 9,
  },
  brandMark: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 10,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  brandMarkText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  brandName: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  skipButton: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  skipButtonText: {
    color: colors.brand,
    fontSize: 15,
    fontWeight: "800",
  },
  illustrationContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 14,
  },
  carousel: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  illustration: {
    height: "86%",
    maxWidth: 420,
    width: "100%",
  },
  copy: {
    minHeight: 178,
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -1.2,
    lineHeight: 38,
    marginTop: 9,
  },
  description: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 12,
  },
  footer: {
    paddingBottom: 12,
    paddingTop: 10,
  },
  pagination: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    backgroundColor: colors.border,
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  dotActive: {
    backgroundColor: colors.gold,
    width: 24,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 18,
    paddingVertical: 17,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
});
