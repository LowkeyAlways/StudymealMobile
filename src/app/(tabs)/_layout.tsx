import { Tabs, Redirect } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { TabIcon } from '../../components/navigation/TabIcon';
import { tabBarOptions } from '../../styles/navigation/tabs.styles';


export default function TabLayout() {
  const { isAuthLoading, user } = useAuth();

  if (isAuthLoading) {
    return null;
  }

  if (user === null) {
    return <Redirect href="../auth" />;
  }

  return (
    <Tabs screenOptions={tabBarOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <TabIcon symbol="⌂" color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Trouver',
          tabBarIcon: ({ color }) => <TabIcon symbol="◎" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Bons plans',
          tabBarIcon: ({ color }) => <TabIcon symbol="★" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <TabIcon symbol="◯" color={color} />,
        }}
      />
    </Tabs>
  );
}
