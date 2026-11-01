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
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  eyebrow: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.3,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1.2,
    marginTop: 8,
  },
  description: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  form: {
    marginTop: 30,
  },
  fieldLabel: {
    color: colors.brand,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
    marginTop: -12,
    paddingVertical: 4,
  },
  forgotPasswordText: {
    color: colors.brand,
    fontSize: 14,
    fontWeight: "800",
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 16,
    marginTop: 4,
    paddingVertical: 16,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  divider: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
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
    marginTop: 18,
    paddingVertical: 16,
  },
  googleButtonContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  googleButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  googleLogo: {
    height: 21,
    resizeMode: "contain",
    width: 28,
  },
  switchModeButton: {
    alignItems: "center",
    marginTop: 20,
    padding: 8,
  },
  switchModeText: {
    color: colors.brand,
    fontSize: 15,
    fontWeight: "800",
  },
});
