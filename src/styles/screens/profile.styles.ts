import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 120,
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
  profileCard: {
    alignItems: "center",
    backgroundColor: colors.surfaceAccent,
    borderRadius: 22,
    flexDirection: "row",
    marginTop: 28,
    padding: 20,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  avatarText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "800",
  },
  profileCopy: {
    flex: 1,
    marginLeft: 14,
  },
  profileEyebrow: {
    color: colors.brand,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  profileTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
  },
  profileDescription: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderColor: "#DDE5DF",
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 16,
    padding: 18,
  },
  summaryEyebrow: {
    color: colors.brand,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 21,
    fontWeight: "800",
    marginTop: 8,
  },
  summaryDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  sectionLabel: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginTop: 28,
  },
  preferencesCard: {
    backgroundColor: colors.white,
    borderColor: "#DDE5DF",
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 12,
  },
  preferenceRow: {
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  preferenceRowContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  preferenceCopy: {
    flex: 1,
  },
  preferenceRowBorder: {
    borderBottomColor: "#E8EEEA",
    borderBottomWidth: 1,
  },
  preferenceLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  preferenceValue: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 5,
  },
  preferenceAction: {
    color: colors.brand,
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 16,
  },
  noticeCard: {
    backgroundColor: colors.surfaceAccent,
    borderRadius: 18,
    marginTop: 16,
    padding: 18,
  },
  noticeTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  noticeDescription: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
  },
  resetButton: {
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  resetButtonText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "800",
  },
  modalBackdrop: {
    alignItems: "center",
    backgroundColor: "rgba(22, 50, 45, 0.36)",
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  modalCard: {
    backgroundColor: colors.background,
    borderRadius: 24,
    padding: 22,
    width: "100%",
  },
  modalEyebrow: {
    color: colors.brand,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 7,
  },
  modalDescription: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  campusOptions: {
    gap: 10,
    marginTop: 22,
  },
  campusOption: {
    backgroundColor: colors.white,
    borderColor: "#DDE5DF",
    borderRadius: 14,
    borderWidth: 1,
    padding: 15,
  },
  campusOptionSelected: {
    backgroundColor: colors.surfaceAccent,
    borderColor: colors.brand,
  },
  campusOptionText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  campusOptionTextSelected: {
    color: colors.brand,
  },
  cancelButton: {
    alignItems: "center",
    marginTop: 18,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: "800",
  },
});
