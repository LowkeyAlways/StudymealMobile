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
  selectedMarkerLabel: {
    backgroundColor: colors.white,
    borderRadius: 14,
    elevation: 4,
    maxWidth: 200,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    transform: [{ translateY: -40 }],
  },
  selectedMarkerLabelText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    
  },
  searchInput: {
    backgroundColor: colors.white,
    borderColor: '#DDE5DF',
    borderRadius: 14,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  suggestions: {
    backgroundColor: colors.white,
    borderColor: '#DDE5DF',
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  suggestion: {
    borderBottomColor: '#E8EEEA',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  suggestionName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  suggestionDetails: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  emptySuggestions: {
    color: colors.textMuted,
    fontSize: 14,
    padding: 16,
  },
  searchSection: {
    marginBottom: 18,
  },
});
