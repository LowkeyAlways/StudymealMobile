import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 24,
    elevation: 5,
    height: 48,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    shadowColor: "#000000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    top: 40,
    width: 48,
  },
  buttonLoading: {
    opacity: 0.6,
  },
  icon: {
    color: colors.brand,
    fontSize: 27,
    fontWeight: "700",
    lineHeight: 30,
  },
});