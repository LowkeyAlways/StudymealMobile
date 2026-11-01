export type DealCategory = 'food' | 'leisure';

export type Deal = {
  id: string;
  category: DealCategory;
  partner: string;
  title: string;
  description: string;
  availability: string;
  disclaimer: string;
};

/**
 * Contenu local de démonstration. Les offres réelles seront alimentées par des
 * partenaires ou une source éditoriale vérifiée dans une évolution ultérieure.
 */
export const deals: Deal[] = [
  {
    id: 'student-meals',
    category: 'food',
    partner: 'RESTAURATION',
    title: 'Repas étudiants à petit prix',
    description:
      'Retrouve les formules, menus et avantages étudiants proposés près de ton campus.',
    availability: 'À découvrir près de toi',
    disclaimer: 'Disponibilités et conditions à confirmer auprès du lieu.',
  },
  {
    id: 'crous-good-deals',
    category: 'food',
    partner: 'CROUS',
    title: 'Les bons réflexes pour manger à moindre coût',
    description:
      'Les restaurants universitaires et solutions solidaires restent les premières options à consulter.',
    availability: 'Toute l’année universitaire',
    disclaimer: 'Les horaires et menus dépendent de chaque établissement.',
  },
  {
    id: 'cinema-student',
    category: 'leisure',
    partner: 'LOISIRS',
    title: 'Sorties cinéma au tarif étudiant',
    description:
      'Garde un œil sur les tarifs réduits, cartes étudiantes et séances spéciales près de chez toi.',
    availability: 'Selon les salles partenaires',
    disclaimer: 'Vérifie le tarif et les justificatifs demandés avant ta séance.',
  },
  {
    id: 'culture-student',
    category: 'leisure',
    partner: 'CULTURE',
    title: 'Concerts, expos et événements à prix réduit',
    description:
      'Studymeal réunira progressivement les opportunités culturelles accessibles aux étudiants.',
    availability: 'Sélection à venir',
    disclaimer: 'Cette rubrique sera enrichie avec des offres vérifiées.',
  },
];

export const dealCategoryLabels: Record<DealCategory, string> = {
  food: 'Restauration',
  leisure: 'Loisirs',
};
