import { UnitRange } from "./types";

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
  oz: {
    rangeMin: 0,
    rangeMax: 16,
    rangeStep: 1,
    rangeMarkers: ["0", "4", "8", "12", "16"],
    unitNote: "1 oz ≈ 28.35 g",
  },
  tbsp: {
    rangeMin: 0,
    rangeMax: 10,
    rangeStep: 1,
    rangeMarkers: ["0", "2", "4", "6", "8", "10"],
    unitNote: "1 tbsp ≈ 15 ml",
  },
  package: {
    rangeMin: 0,
    rangeMax: 5,
    rangeStep: 1,
    rangeMarkers: ["0", "1", "2", "3", "4", "5"],
    unitNote: "package",
  },
  liter: {
    rangeMin: 0,
    rangeMax: 3,
    rangeStep: 0.5,
    rangeMarkers: ["0", "0.5", "1", "1.5", "2", "2.5", "3"],
    unitNote: "1 liter = 1000 ml",
  },
};
