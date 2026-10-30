import { colors } from '../theme/colors';

export const tabBarOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.brand,
  tabBarInactiveTintColor: colors.textMuted,
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '700' as const,
  },
  tabBarStyle: {
    backgroundColor: colors.background,
    borderTopColor: colors.border,
  },
};
