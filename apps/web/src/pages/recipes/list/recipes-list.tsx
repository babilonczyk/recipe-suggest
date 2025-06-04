import { useEffect, useState } from "react";
import MultiSelectDropdown from "./components/multi-select";
import IngredientsTable from "./components/ingredients-table";
import FoundRecipes from "./components/found-recipes";
import { IngredientData, UnitRange } from "./types";
import { UNIT_RANGES as DEFAULT_UNIT_RANGES } from "./constants";

const API_URL = (import.meta as any).env.VITE_API_URL;

const RecipesList = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [ingredientsState, setIngredientsState] = useState<
    Record<string, IngredientData>
  >({});
  const [unitRanges, setUnitRanges] =
    useState<Record<string, UnitRange>>(DEFAULT_UNIT_RANGES);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, IngredientData>
  >({});

  const ingredientNames = Object.keys(ingredientsState);

  const UNIT_NAME_MAP: Record<string, string> = {
    teaspoon: "tsp",
    tablespoon: "tbsp",
    piece: "pcs",
    cup: "cup/s",
    slice: "slice/s",
    gram: "g",
    liter: "ml",
    milliliter: "ml",
    ounce: "oz",
    package: "package",
  };

  // Handle ingredient selection
  const handleSelectionChange = (newKeys: string[]) => {
    setSelectedOptions((prev) => {
      const updated: Record<string, IngredientData> = {};
      newKeys.forEach((key) => {
        updated[key] = prev[key] || ingredientsState[key];
      });
      return updated;
    });
  };

  // Fetch and transform ingredients on mount
  useEffect(() => {
    setLoading(true);

    const fetchIngredients = async () => {
      const response = await fetch(`${API_URL}/ingrediants`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const ingrediants = data.ingrediants;

      const localIngrediantsState: Record<string, IngredientData> = {};

      ingrediants.forEach((item: any) => {
        const name = item.name;
        const rawUnit = item.unit?.name?.toLowerCase();
        const normalizedUnit = UNIT_NAME_MAP[rawUnit];

        if (!name || !normalizedUnit || !DEFAULT_UNIT_RANGES[normalizedUnit])
          return;

        localIngrediantsState[name] = {
          ingredientId: item.id,
          amount: 0,
          unit: normalizedUnit,
          unitNote:
            item.unit?.help_text ||
            DEFAULT_UNIT_RANGES[normalizedUnit].unitNote,
        };
      });

      setIngredientsState(localIngrediantsState);

      setLoading(false);
    };

    fetchIngredients();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 justify-center max-w-3xl mx-auto p-4">
      {step === 1 && (
        <>
          <div
            className="tooltip tooltip-bottom ml-auto"
            data-tip={
              Object.entries(selectedOptions).length === 0
                ? "Select at least one ingredient to proceed"
                : ""
            }
          >
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setStep(2)}
              disabled={Object.entries(selectedOptions).length === 0}
            >
              Find Recipes
            </button>
          </div>

          <MultiSelectDropdown
            formFieldName="ingredients"
            options={ingredientNames}
            selectedOptions={Object.keys(selectedOptions)}
            setSelectedOptions={handleSelectionChange}
            onChange={() => {}}
            prompt="What ingredients do you own?"
            loading={loading}
          />

          {Object.keys(selectedOptions).length > 0 && (
            <IngredientsTable
              selectedOptions={selectedOptions}
              unitRanges={unitRanges}
              setSelectedOptions={setSelectedOptions}
            />
          )}
        </>
      )}

      {step === 2 && (
        <>
          <button
            className="btn btn-primary btn-sm mr-auto"
            onClick={() => setStep(1)}
          >
            Go back
          </button>

          <h1 className="text-xl font-semibold text-center">
            Recipes based on your ingredients
          </h1>

          <FoundRecipes selectedIngredients={selectedOptions} />
        </>
      )}
    </div>
  );
};

export default RecipesList;
