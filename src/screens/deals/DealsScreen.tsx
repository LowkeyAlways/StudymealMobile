import { Animated, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  dealCategoryLabels,
  deals,
  type Deal,
  type DealCategory,
} from '../../data/deals';
import { styles } from '../../styles/screens/deals.styles';

type DealFilter = 'all' | DealCategory;

const filters: { label: string; value: DealFilter }[] = [
  { label: 'Tout', value: 'all' },
  { label: dealCategoryLabels.food, value: 'food' },
  { label: dealCategoryLabels.leisure, value: 'leisure' },
];

export default function DealsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<DealFilter>('all');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [sheetProgress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!selectedDeal) {
      return;
    }

    sheetProgress.setValue(0);
    Animated.timing(sheetProgress, {
      duration: 260,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [selectedDeal, sheetProgress]);

  const closeDetails = () => {
    Animated.timing(sheetProgress, {
      duration: 180,
      toValue: 0,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setSelectedDeal(null);
      }
    });
  };

  const visibleDeals = useMemo(
    () =>
      selectedFilter === 'all'
        ? deals
        : deals.filter((deal) => deal.category === selectedFilter),
    [selectedFilter],
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>À NE PAS MANQUER</Text>
        <Text style={styles.title}>Bons plans étudiants</Text>
        <Text style={styles.description}>
          Des idées pour manger, sortir et profiter de Paris sans dépasser ton budget.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Une sélection en construction</Text>
          <Text style={styles.infoDescription}>
            Nous ajoutons progressivement des offres vérifiées, pensées pour la vie étudiante.
          </Text>
        </View>

        <View style={styles.filters}>
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter.value;

            return (
              <Pressable
                key={filter.value}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                onPress={() => setSelectedFilter(filter.value)}
                style={[styles.filter, isSelected ? styles.filterSelected : null]}
              >
                <Text style={[styles.filterText, isSelected ? styles.filterTextSelected : null]}>
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.list}>
          {visibleDeals.map((deal) => (
            <Pressable
              key={deal.id}
              accessibilityHint="Ouvre le détail de ce bon plan"
              accessibilityRole="button"
              onPress={() => setSelectedDeal(deal)}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.category}>{dealCategoryLabels[deal.category]}</Text>
                <Text style={styles.partner}>{deal.partner}</Text>
              </View>
              <Text style={styles.cardTitle}>{deal.title}</Text>
              <Text style={styles.cardDescription}>{deal.description}</Text>
              <View style={styles.availability}>
                <Text style={styles.availabilityText}>{deal.availability}</Text>
              </View>
              <Text style={styles.disclaimer}>{deal.disclaimer}</Text>
              <Text style={styles.detailAction}>Voir le détail</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="none"
        onRequestClose={closeDetails}
        transparent
        visible={selectedDeal !== null}
      >
        <Pressable
          accessibilityRole="button"
          onPress={closeDetails}
          style={styles.modalBackdrop}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.modalOverlay, { opacity: sheetProgress }]}
          />
          <Animated.View
            style={[
              styles.modalCard,
              {
                transform: [
                  {
                    translateY: sheetProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [420, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Pressable onPress={() => undefined}>
            {selectedDeal ? (
              <>
                <Text style={styles.modalEyebrow}>
                  {dealCategoryLabels[selectedDeal.category]} · {selectedDeal.partner}
                </Text>
                <Text style={styles.modalTitle}>{selectedDeal.title}</Text>
                <Text style={styles.modalDescription}>{selectedDeal.description}</Text>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionLabel}>DISPONIBILITÉ</Text>
                  <Text style={styles.modalSectionValue}>{selectedDeal.availability}</Text>
                </View>

                <View style={styles.modalNotice}>
                  <Text style={styles.modalNoticeTitle}>À vérifier avant d’en profiter</Text>
                  <Text style={styles.modalNoticeText}>{selectedDeal.disclaimer}</Text>
                </View>
              </>
            ) : null}

            <Pressable
              accessibilityRole="button"
              onPress={closeDetails}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </Pressable>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
