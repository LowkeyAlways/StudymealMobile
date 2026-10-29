import { Pressable, Text } from "react-native";

import { styles } from "../../styles/components/user-location-button.styles";

type UserLocationButtonProps = {
  isLoading: boolean;
  onPress: () => void;
};

export function UserLocationButton({
  isLoading,
  onPress,
}: UserLocationButtonProps) {
  return (
    <Pressable
      accessibilityLabel="Recentrer la carte sur ma position"
      accessibilityRole="button"
      accessibilityState={{ busy: isLoading }}
      disabled={isLoading}
      onPress={onPress}
      style={[
        styles.button,
        isLoading ? styles.buttonLoading : null,
      ]}
    >
      <Text style={styles.icon}>{isLoading ? "…" : "⌖"}</Text>
    </Pressable>
  );
}