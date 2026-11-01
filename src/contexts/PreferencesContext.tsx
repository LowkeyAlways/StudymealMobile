import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  budgetOptions,
  campusOptions,
  categoryOptions,
  type BudgetPreference,
  type Campus,
  type CategoryPreference,
} from "../types/preferences";
import type { NavigationApp } from "../types/navigation";

const CAMPUS_STORAGE_KEY = "@studymeal/campus";
const BUDGET_STORAGE_KEY = "@studymeal/budget";
const CATEGORIES_STORAGE_KEY = "@studymeal/categories";
const NOTIFICATIONS_STORAGE_KEY = "@studymeal/notifications-enabled";
const NAVIGATION_APP_STORAGE_KEY = "@studymeal/navigation-app";

type PreferencesContextValue = {
  isPreferencesLoading: boolean;
  selectedBudget: BudgetPreference;
  selectedCampus: Campus | null;
  selectedCategories: CategoryPreference[];
  notificationsEnabled: boolean;
  selectedNavigationApp: NavigationApp | null;
  setBudget: (budget: BudgetPreference) => void;
  setCampus: (campus: Campus) => void;
  setCategories: (categories: CategoryPreference[]) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setNavigationApp: (app: NavigationApp) => void;
  resetPreferences: () => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: PropsWithChildren) {
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [selectedBudget, setSelectedBudget] =
    useState<BudgetPreference>("all");
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryPreference[]
  >(categoryOptions.map((option) => option.value));
  const [notificationsEnabled, setNotificationsEnabledState] =
    useState(false);
  const [selectedNavigationApp, setSelectedNavigationApp] =
    useState<NavigationApp | null>(null);
  const [isPreferencesLoading, setIsPreferencesLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const restorePreferences = async () => {
      try {
        const [storedCampus, storedBudget, storedCategories, storedNotifications, storedNavigationApp] =
          await Promise.all([
            AsyncStorage.getItem(CAMPUS_STORAGE_KEY),
            AsyncStorage.getItem(BUDGET_STORAGE_KEY),
            AsyncStorage.getItem(CATEGORIES_STORAGE_KEY),
            AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY),
            AsyncStorage.getItem(NAVIGATION_APP_STORAGE_KEY),
          ]);

        if (
          storedCampus !== null &&
          campusOptions.includes(storedCampus as Campus) &&
          isMounted
        ) {
          setSelectedCampus(storedCampus as Campus);
        }

        if (
          storedBudget !== null &&
          budgetOptions.some(
            (option) => option.value === getStoredBudget(storedBudget),
          ) &&
          isMounted
        ) {
          setSelectedBudget(getStoredBudget(storedBudget));
        }

        const restoredCategories = getStoredCategories(storedCategories);

        if (restoredCategories !== null && isMounted) {
          setSelectedCategories(restoredCategories);
        }

        if (isMounted && storedNotifications !== null) {
          setNotificationsEnabledState(storedNotifications === "true");
        }

        if (
          isMounted &&
          (storedNavigationApp === "apple-maps" ||
            storedNavigationApp === "google-maps")
        ) {
          setSelectedNavigationApp(storedNavigationApp);
        }
      } catch {
        // Le stockage indisponible ne doit pas bloquer l’application.
      } finally {
        if (isMounted) {
          setIsPreferencesLoading(false);
        }
      }
    };

    void restorePreferences();

    return () => {
      isMounted = false;
    };
  }, []);

  const setCampus = (campus: Campus) => {
    if (isPreferencesLoading) {
      return;
    }

    setSelectedCampus(campus);

    void AsyncStorage.setItem(CAMPUS_STORAGE_KEY, campus).catch(() => {
      // L’état courant continue de fonctionner même si l’écriture échoue.
    });
  };

  const setBudget = (budget: BudgetPreference) => {
    if (isPreferencesLoading) {
      return;
    }

    setSelectedBudget(budget);

    void AsyncStorage.setItem(BUDGET_STORAGE_KEY, String(budget)).catch(() => {
      // L’état courant continue de fonctionner même si l’écriture échoue.
    });
  };

  const setCategories = (categories: CategoryPreference[]) => {
    if (isPreferencesLoading) {
      return;
    }

    setSelectedCategories(categories);

    void AsyncStorage.setItem(
      CATEGORIES_STORAGE_KEY,
      JSON.stringify(categories),
    ).catch(() => {
      // L’état courant continue de fonctionner même si l’écriture échoue.
    });
  };

  const setNotificationsEnabled = (enabled: boolean) => {
    if (isPreferencesLoading) {
      return;
    }

    setNotificationsEnabledState(enabled);

    void AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, String(enabled)).catch(
      () => {
        // L’état courant continue de fonctionner même si l’écriture échoue.
      },
    );
  };

  const setNavigationApp = (app: NavigationApp) => {
    if (isPreferencesLoading) {
      return;
    }

    setSelectedNavigationApp(app);

    void AsyncStorage.setItem(NAVIGATION_APP_STORAGE_KEY, app).catch(() => {
      // L’état en mémoire reste utilisable même si le stockage échoue.
    });
  };

  const resetPreferences = () => {
    if (isPreferencesLoading) {
      return;
    }

    setSelectedCampus(null);
    setSelectedBudget("all");
    setSelectedCategories(categoryOptions.map((option) => option.value));
    setNotificationsEnabledState(false);
    setSelectedNavigationApp(null);

    void AsyncStorage.multiRemove([
      CAMPUS_STORAGE_KEY,
      BUDGET_STORAGE_KEY,
      CATEGORIES_STORAGE_KEY,
      NOTIFICATIONS_STORAGE_KEY,
      NAVIGATION_APP_STORAGE_KEY,
    ]).catch(() => {
      // L’état en mémoire revient bien aux valeurs par défaut même si l’effacement échoue.
    });
  };

  return (
    <PreferencesContext.Provider
      value={{
        isPreferencesLoading,
        selectedBudget,
        selectedCampus,
        selectedCategories,
        notificationsEnabled,
        selectedNavigationApp,
        setBudget,
        setCampus,
        setCategories,
        setNotificationsEnabled,
        setNavigationApp,
        resetPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

function getStoredBudget(storedBudget: string): BudgetPreference {
  if (storedBudget === "all") {
    return storedBudget;
  }

  return Number(storedBudget) as BudgetPreference;
}

function getStoredCategories(
  storedCategories: string | null,
): CategoryPreference[] | null {
  if (storedCategories === null) {
    return null;
  }

  try {
    const parsedCategories: unknown = JSON.parse(storedCategories);

    if (!Array.isArray(parsedCategories)) {
      return null;
    }

    const validCategories = parsedCategories.filter(
      (category): category is CategoryPreference =>
        typeof category === "string" &&
        categoryOptions.some((option) => option.value === category),
    );

    return validCategories.length > 0 ? validCategories : null;
  } catch {
    return null;
  }
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (context === null) {
    throw new Error("usePreferences must be used inside PreferencesProvider.");
  }

  return context;
}
