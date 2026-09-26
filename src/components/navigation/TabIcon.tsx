import { type ColorValue, Text } from 'react-native';

import { styles } from '../../styles/components/tab-icon.styles';

type TabIconProps = {
  color: ColorValue;
  symbol: string;
};

/** Icône légère provisoire : elle sera remplacée par le système d’icônes final. */
export function TabIcon({ color, symbol }: TabIconProps) {
  return <Text style={[styles.icon, { color }]}>{symbol}</Text>;
}
