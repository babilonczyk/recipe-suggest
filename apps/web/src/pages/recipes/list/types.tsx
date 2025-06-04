import { UNIT_RANGES } from "./constants";

export type UnitRange = {
  rangeMin: number;
  rangeMax: number;
  rangeStep: number;
  rangeMarkers: string[];
  unitNote?: string;
};

export type IngredientData = {
  ingredientId: string;
  amount: number;
  unit: keyof typeof UNIT_RANGES;
  unitNote?: string;
};

export interface Unit {
  id: number;
  name: string;
  help_text?: string;
}

export interface Ingrediant {
  id: number;
  name: string;
  unit: Unit;
}

export interface IngrediantValue {
  id: number;
  value: number;
  ingrediant: Ingrediant;
}

export interface Author {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export type Recipe = {
  id: number;
  title: string;
  prep_time?: number;
  cook_time?: number;
  image_url?: string;
  author?: Author;
  category?: Category;
  ingrediant_values?: IngrediantValue[];
};
