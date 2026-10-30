export const campusOptions = [
  "Université Paris Cité – Grands Moulins",
  "Sorbonne Université – Jussieu",
  "Autre campus",
] as const;

export type Campus = (typeof campusOptions)[number];

export const budgetOptions = [
  { label: "Tous budgets", value: "all" },
  { label: "Jusqu’à 3 €", value: 3 },
  { label: "Jusqu’à 6 €", value: 6 },
  { label: "Jusqu’à 10 €", value: 10 },
] as const;

export type BudgetPreference = (typeof budgetOptions)[number]["value"];

export const categoryOptions = [
  { label: "CROUS", value: "crous" },
  { label: "Solidaires", value: "solidaire" },
  { label: "Bons plans", value: "bon-plan" },
] as const;

export type CategoryPreference = (typeof categoryOptions)[number]["value"];
