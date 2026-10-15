import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  map: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  mapLabel: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  mapTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 10,
    textAlign: "center",
  },
  mapDescription: {
    color: colors.textSoft,
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  sheet: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 4,
    borderTopLeftRadius: 28,
  },
  handle: {
    alignSelf: "center",
    backgroundColor: "#B8C6BE",
    borderRadius: 4,
    height: 5,
    marginBottom: 18,
    width: 42,
  },
  eyebrow: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 7,
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  placesList: {
    gap: 12,
    marginTop: 18,
  },
  sheetBackground: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },

  sheetContent: {
    paddingBottom: 24,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
});
