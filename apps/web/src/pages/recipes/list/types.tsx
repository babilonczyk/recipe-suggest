import { UNIT_RANGES } from "./constants";

export type UnitRange = {
  rangeMin: number;
  rangeMax: number;
  rangeStep: number;
  rangeMarkers: string[];
  unitNote?: string;
};

export type IngredientData = {
  amount: number;
  unit: keyof typeof UNIT_RANGES;
  unitNote?: string;
};
