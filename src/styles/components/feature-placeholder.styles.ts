import { StyleSheet } from 'react-native';

import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  eyebrow: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 14,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1.2,
    lineHeight: 39,
  },
  description: {
    color: colors.textMuted,
    fontSize: 17,
    lineHeight: 25,
    marginTop: 16,
  },
  children: {
    gap: 12,
    marginTop: 24,
  },
});
