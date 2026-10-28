import { Tabs } from 'expo-router';
import { TabIcon } from '../../components/navigation/TabIcon';
import { tabBarOptions } from '../../styles/navigation/tabs.styles';


export default function TabLayout() {
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
          title: 'Favoris',
          tabBarIcon: ({ color }) => <TabIcon symbol="♡" color={color} />,
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
