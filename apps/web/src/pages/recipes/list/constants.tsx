import { IngredientData, UnitRange } from "./types";

export const UNIT_RANGES: Record<string, UnitRange> = {
  ml: {
    rangeMin: 0,
    rangeMax: 1000,
    rangeStep: 100,
    rangeMarkers: ["0", "250", "500", "750", "1000"],
    unitNote: "milliliters",
  },
  g: {
    rangeMin: 0,
    rangeMax: 500,
    rangeStep: 50,
    rangeMarkers: ["0", "100", "200", "300", "400", "500"],
    unitNote: "grams",
  },
  pcs: {
    rangeMin: 0,
    rangeMax: 12,
    rangeStep: 1,
    rangeMarkers: ["0", "2", "4", "6", "8", "10", "12"],
    unitNote: "pieces",
  },
  tsp: {
    rangeMin: 0,
    rangeMax: 10,
    rangeStep: 1,
    rangeMarkers: ["0", "2", "4", "6", "8", "10"],
    unitNote: "1 tsp ≈ 5 ml",
  },
  "cup/s": {
    rangeMin: 0,
    rangeMax: 5,
    rangeStep: 1,
    rangeMarkers: ["0", "1", "2", "3", "4", "5"],
    unitNote: "1 cup ≈ 150 ml",
  },
  "slice/s": {
    rangeMin: 0,
    rangeMax: 10,
    rangeStep: 1,
    rangeMarkers: ["0", "2", "4", "6", "8", "10"],
    unitNote: "bread slices",
  },
};

// Ingredient defaults stub - will come drom backend in real app
export const DEFAULT_INGREDIENTS_STATE: Record<string, IngredientData> = {
  Tea: { amount: 0, unit: "cup/s", unitNote: "1 cup = 150ml" },
  Coffee: { amount: 0, unit: "cup/s", unitNote: "1 cup = 150ml" },
  Milk: { amount: 0, unit: "cup/s", unitNote: "1 cup = 150ml" },
  Sugar: { amount: 0, unit: "tsp", unitNote: "teaspoons" },
  Salt: { amount: 0, unit: "tsp" },
  Pepper: { amount: 0, unit: "tsp" },
  Butter: { amount: 0, unit: "g", unitNote: "grams" },
  Cheese: { amount: 0, unit: "g" },
  Bread: { amount: 0, unit: "slice/s" },
  Eggs: { amount: 0, unit: "pcs", unitNote: "pieces" },
  Chicken: { amount: 0, unit: "g", unitNote: "grams" },
  Fish: { amount: 0, unit: "g", unitNote: "grams" },
};
