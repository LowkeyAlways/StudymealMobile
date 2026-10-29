import { Pressable, Text, View } from "react-native";

import {
  routeModeLabels,
  type RouteMode,
} from "../../types/directions";
import { styles } from "../../styles/components/route-mode-selector.styles"

type RouteModeSelectorProps = {
  onSelectMode: (mode: RouteMode) => void;
  selectedMode: RouteMode;
};

const routeModes: RouteMode[] = ["walking", "cycling", "driving"];

export function RouteModeSelector({
  onSelectMode,
  selectedMode,
}: RouteModeSelectorProps) {
  return (
    <View style={styles.container}>
      {routeModes.map((mode) => {
        const isSelected = mode === selectedMode;

        return (
          <Pressable
            key={mode}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelectMode(mode)}
            style={[
              styles.button,
              isSelected ? styles.buttonSelected : null,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                isSelected ? styles.buttonTextSelected : null,
              ]}
            >
              {routeModeLabels[mode]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}