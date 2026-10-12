import { StyleSheet } from 'react-native';

import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  mapSurface: {
    alignItems: 'center',
    backgroundColor: '#DCEBE1',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    padding: 24,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  mapLabel: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  mapTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 10,
    textAlign: 'center',
  },
  mapDescription: {
    color: colors.textSoft,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    bottom: 0,
    left: 0,
    padding: 20,
    position: 'absolute',
    right: 0,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: '#B8C6BE',
    borderRadius: 4,
    height: 5,
    marginBottom: 18,
    width: 42,
  },
  eyebrow: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 7,
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
});