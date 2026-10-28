import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderColor: "#DDE5DF",
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
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },
  details: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 6,
  },
});
