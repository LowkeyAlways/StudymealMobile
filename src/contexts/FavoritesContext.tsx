import { createContext, type PropsWithChildren, useContext, useState } from "react";

type FavoritesContextValue = {
  favoritePlaceIds: string[];
  toggleFavorite: (placeId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favoritePlaceIds, setFavoritePlaceIds] = useState<string[]>([]);

  const toggleFavorite = (placeId: string) => {
    setFavoritePlaceIds((currentIds) => {
      const isAlreadyFavorite = currentIds.includes(placeId);

      return isAlreadyFavorite
        ? currentIds.filter((id) => id !== placeId)
        : [...currentIds, placeId];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favoritePlaceIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === null) {
    throw new Error("useFavorites must be used inside FavoritesProvider.");
  }

  return context;
}
