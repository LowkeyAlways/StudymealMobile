import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../../styles/screens/home.styles';

/** Écran affiché par la route d'accueil (`src/app/index.tsx`). */
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.brandMark}>
          <Text style={styles.brandMarkText}>S</Text>
        </View>
        <Text style={styles.brandName}>Studymeal</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.eyebrow}>LE PROJET COMMENCE ICI</Text>
        <Text style={styles.title}>Manger mieux,{"\n"}sans chercher partout.</Text>
        <Text style={styles.description}>
          La base mobile iOS et Android de Studymeal est prête. Nous ajouterons maintenant
          la carte, les lieux et les filtres, une fonctionnalité à la fois.
        </Text>
      </View>

      <View style={styles.stepCard}>
        <Text style={styles.stepLabel}>ÉTAPE 1</Text>
        <Text style={styles.stepTitle}>Fondations de l’application</Text>
        <Text style={styles.stepDescription}>
          Expo Router gère les futurs écrans. Cette page est la route d’accueil :
          src/app/index.tsx.
        </Text>
      </View>
    </SafeAreaView>
  );
}
