import { Redirect } from 'expo-router';

// Cette route est uniquement la porte d'entrée vers la navigation principale.
export default function IndexRoute() {
  return <Redirect href="/(tabs)" />;
}
