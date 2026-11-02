import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  brandHeader: {
    alignItems: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 40,
    zIndex: 1,
  },
  brandMark: {
    alignItems: "center",
    backgroundColor: colors.background,
    height: 140,
    justifyContent: "center",
    overflow: "hidden",
    width: 140,
  },
  brandLogo: {
    height: "100%",
    resizeMode: "contain",
    width: "100%",
  },
  brandName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginTop: 4,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    paddingTop: 190,
  },
  registerContent: {
    paddingTop: 270,
  },
  eyebrow: {
    color: colors.brand,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.3,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -1.2,
    marginTop: 8,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  form: {
    marginTop: 16,
  },
  fieldLabel: {
    color: colors.brand,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.text,
    fontSize: 14,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    marginTop: -6,
    paddingVertical: 4,
  },
  forgotPasswordText: {
    color: colors.brand,
    fontSize: 13,
    fontWeight: "800",
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 16,
    marginTop: 4,
    paddingVertical: 12,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  divider: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  dividerLine: {
    backgroundColor: colors.border,
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  googleButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
    paddingVertical: 12,
  },
  googleButtonContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  googleButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  googleLogo: {
    height: 21,
    resizeMode: "contain",
    width: 28,
  },
  switchModeButton: {
    alignItems: "center",
    marginTop: 12,
    padding: 8,
  },
  switchModeText: {
    color: colors.brand,
    fontSize: 14,
    fontWeight: "800",
  },
});
