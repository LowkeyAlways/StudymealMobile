import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";

import { useAuth } from "../contexts/AuthContext";
import { colors } from "../styles/theme/colors";

// Cette route décide de l'écran d'entrée une fois la session locale restaurée.
export default function IndexRoute() {
  const { isAuthLoading, user } = useAuth();

  if (isAuthLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: colors.background,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={colors.brand} />
      </View>
    );
  }

  if (user !== null) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="./onboarding" />;
}
