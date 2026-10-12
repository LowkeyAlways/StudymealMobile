import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../../styles/screens/find.styles';

export default function FindScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.mapSurface}>
        <Text style={styles.mapLabel}>CARTE INTERACTIVE</Text>
        <Text style={styles.mapTitle}>Autour de Paris Rive Gauche</Text>
        <Text style={styles.mapDescription}>
          Les marqueurs de lieux apparaîtront ici.
        </Text>
      </View>

      <View style={styles.sheet}>
        <View style={styles.handle} />

        <Text style={styles.eyebrow}>À PROXIMITÉ</Text>
        <Text style={styles.title}>Lieux autour de toi</Text>
        <Text style={styles.description}>
          Fais glisser cette fenêtre vers le haut pour consulter les bonnes adresses.
        </Text>
      </View>
    </SafeAreaView>
  );
}