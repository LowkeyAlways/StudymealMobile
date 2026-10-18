export type PlaceCategory = 'crous' | 'solidaire' | 'bon-plan';

export type Place = {
  id: string;
  name: string;
  category: PlaceCategory;
  priceLabel: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  openingHours: string;
  practicalInfo: string;
};

export const places: Place[] = [
  {
  id: 'ru-halle-aux-farines',
  name: 'RU Halle aux Farines',
  category: 'crous',
  priceLabel: 'Tarif CROUS',
  address: '3 esplanade Pierre Vidal-Naquet, 75013 Paris',
  latitude: 48.8296,
  longitude: 2.3805,
  description: 'Restaurant universitaire du campus des Grands Moulins, proposant une restauration complète aux étudiants et aux personnels de l’enseignement supérieur.',
  openingHours: 'Du lundi au vendredi, de 11h15 à 14h15.',
  practicalInfo: 'Paiement par carte bancaire et Izly · Accès : RER C ou métro Bibliothèque François-Mitterrand.',
  },
  {
  id: 'agorae-paris-13',
  name: 'AGORAé Paris 13',
  category: 'solidaire',
  priceLabel: 'Tarif solidaire',
  address: '3 allée Paris-Ivry, 75013 Paris',
  latitude: 48.8268,
  longitude: 2.3776,
  description: 'Épicerie sociale et solidaire étudiante, avec un lieu de vie et un accompagnement vers les droits.',
  openingHours: 'Mardi et vendredi, de 16h à 20h.',
  practicalInfo: 'Épicerie accessible sur critères sociaux, après dépôt d’un dossier AGORAé.',
  },
];