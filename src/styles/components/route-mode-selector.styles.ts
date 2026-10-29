import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  button: {
    alignItems: "center",
    borderColor: "#D8E3DD",
    borderRadius: 999,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonSelected: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  buttonText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "800",
  },
  buttonTextSelected: {
    color: colors.white,
  },
});