import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const FAVORITES_STORAGE_KEY = "@studymeal/favorite-place-ids";

type FavoritesContextValue = {
  favoritePlaceIds: string[];
  isFavoritesLoading: boolean;
  toggleFavorite: (placeId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favoritePlaceIds, setFavoritePlaceIds] = useState<string[]>([]);
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const restoreFavorites = async () => {
      try {
        const storedFavoriteIds = await AsyncStorage.getItem(
          FAVORITES_STORAGE_KEY,
        );

        if (storedFavoriteIds === null) {
          return;
        }

        const parsedFavoriteIds: unknown = JSON.parse(storedFavoriteIds);

        if (
          Array.isArray(parsedFavoriteIds) &&
          parsedFavoriteIds.every((id) => typeof id === "string") &&
          isMounted
        ) {
          setFavoritePlaceIds(parsedFavoriteIds);
        }
      } catch {
        // Le stockage indisponible ne doit pas bloquer l’application.
      } finally {
        if (isMounted) {
          setIsFavoritesLoading(false);
        }
      }
    };

    void restoreFavorites();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFavorite = (placeId: string) => {
    if (isFavoritesLoading) {
      return;
    }

    setFavoritePlaceIds((currentIds) => {
      const isAlreadyFavorite = currentIds.includes(placeId);

      const nextIds = isAlreadyFavorite
        ? currentIds.filter((id) => id !== placeId)
        : [...currentIds, placeId];

      void AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(nextIds),
      ).catch(() => {
        // L’état courant continue de fonctionner même si l’écriture échoue.
      });

      return nextIds;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoritePlaceIds,
        isFavoritesLoading,
        toggleFavorite,
      }}
    >
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