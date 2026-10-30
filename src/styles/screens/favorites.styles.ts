import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  eyebrow: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.3,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -1.2,
    marginTop: 8,
  },
  description: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
  },
  list: {
    gap: 14,
    marginTop: 28,
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  category: {
    color: colors.brand,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  placeName: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 7,
  },
  placeDetails: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
  },
  removeButton: {
    alignSelf: "flex-start",
    borderColor: colors.brand,
    borderRadius: 999,
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  removeButtonText: {
    color: colors.brand,
    fontSize: 14,
    fontWeight: "800",
  },
  emptyCard: {
    backgroundColor: colors.surfaceAccent,
    borderRadius: 20,
    marginTop: 28,
    padding: 20,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  emptyDescription: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
});
