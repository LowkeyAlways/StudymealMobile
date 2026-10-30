import type { ConfigContext } from "expo/config";

export default ({ config }: ConfigContext) => ({
  ...config,
  plugins: [
    ...(config.plugins ?? []),
    [
      "react-native-maps",
      {
        androidGoogleMapsApiKey: process.env.GOOGLE_MAPS_ANDROID_API_KEY ?? "",
      },
    ],
  ],
});
