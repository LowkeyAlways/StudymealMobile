import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FBFAF5',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 9,
    paddingTop: 12,
  },
  brandMark: {
    alignItems: 'center',
    backgroundColor: '#0C5B4C',
    borderRadius: 10,
    height: 31,
    justifyContent: 'center',
    width: 31,
  },
  brandMarkText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  brandName: {
    color: '#16322D',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  eyebrow: {
    color: '#0C5B4C',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 16,
  },
  title: {
    color: '#16322D',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1.8,
    lineHeight: 46,
  },
  description: {
    color: '#5C6E67',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 18,
  },
  stepCard: {
    backgroundColor: '#E3F1EB',
    borderRadius: 22,
    marginBottom: 18,
    padding: 20,
  },
  stepLabel: {
    color: '#0C5B4C',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  stepTitle: {
    color: '#16322D',
    fontSize: 19,
    fontWeight: '800',
    marginTop: 7,
  },
  stepDescription: {
    color: '#486158',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
