import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../../styles/components/feature-placeholder.styles';

type FeaturePlaceholderProps = {
  description: string;
  eyebrow: string;
  title: string;
};

/** Composant réutilisable pendant que les écrans produit sont construits. */
export function FeaturePlaceholder({ description, eyebrow, title }: FeaturePlaceholderProps) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </SafeAreaView>
  );
}
