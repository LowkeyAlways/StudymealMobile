export type PlaceCategory = 'crous' | 'solidaire' | 'bon-plan';

export type Place = {
  id: string;
  name: string;
  category: PlaceCategory;
  priceLabel: string;
  address: string;
};

export const places: Place[] = [
  {
    id: 'ru-halle-aux-farines',
    name: 'RU Halle aux Farines',
    category: 'crous',
    priceLabel: 'Tarif CROUS',
    address: 'Campus Grands Moulins',
  },
  {
    id: 'agorae-paris-13',
    name: 'AGORAé Paris 13',
    category: 'solidaire',
    priceLabel: 'Tarif solidaire',
    address: 'Paris 13e',
  },
];