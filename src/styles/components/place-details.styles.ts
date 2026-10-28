import { StyleSheet } from 'react-native';

import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionLabel: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginTop: 18,
  },
  description: {
    color: colors.textSoft,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  content: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
  },
  practicalCard: {
    backgroundColor: '#EAF3EE',
    borderRadius: 18,
    marginTop: 20,
    padding: 18,
  },
  category: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  favoriteButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderColor: colors.brand,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  favoriteButtonActive: {
    backgroundColor: colors.brand,
  },
  favoriteButtonText: {
    color: colors.brand,
    fontSize: 14,
    fontWeight: '800',
  },
  favoriteButtonTextActive: {
    color: colors.white,
  },
});