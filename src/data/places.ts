export type PlaceCategory = 'crous' | 'solidaire' | 'bon-plan';

export type Place = {
  id: string;
  name: string;
  category: PlaceCategory;
  priceLabel: string;
  address: string;
  latitude: number;
  longitude: number;
};

export const places: Place[] = [
  {
  id: 'ru-halle-aux-farines',
  name: 'RU Halle aux Farines',
  category: 'crous',
  priceLabel: 'Tarif CROUS',
  address: 'Campus Grands Moulins',
  latitude: 48.8296,
  longitude: 2.3805,
  },
  {
  id: 'agorae-paris-13',
  name: 'AGORAé Paris 13',
  category: 'solidaire',
  priceLabel: 'Tarif solidaire',
  address: 'Paris 13e',
  latitude: 48.8268,
  longitude: 2.3776,
  },
];