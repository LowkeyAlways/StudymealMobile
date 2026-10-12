import { ScrollView, Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../../styles/components/feature-placeholder.styles';

type FeaturePlaceholderProps = {
  description: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

/** Composant réutilisable pendant que les écrans produit sont construits. */
export function FeaturePlaceholder({ description, eyebrow, title, children }: FeaturePlaceholderProps) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {children ? <View style={styles.children}>{children}</View> : null}
      </ScrollView>
    </SafeAreaView>
  );
}
