import { useState } from "react";
import MultiSelectDropdown from "./components/multi-select";
import RecipesTable from "./components/recipes-table";

import { IngredientData } from "./types";

import { DEFAULT_INGREDIENTS_STATE, UNIT_RANGES } from "./constants";

const RecipesList = () => {
  const [step, setStep] = useState<1 | 2>(1);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, IngredientData>
  >({});

  const handleSelectionChange = (newKeys: string[]) => {
    setSelectedOptions((prev) => {
      const updated: Record<string, IngredientData> = {};
      newKeys.forEach((key) => {
        updated[key] = prev[key] || DEFAULT_INGREDIENTS_STATE[key];
      });
      return updated;
    });
  };

  return (
    <div className="flex flex-col items-center gap-5 justify-center max-w-3xl mx-auto p-4">
      {step === 1 && (
        <>
          <div
            className="tooltip tooltip-bottom  ml-auto"
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
            options={Object.keys(DEFAULT_INGREDIENTS_STATE)}
            selectedOptions={Object.keys(selectedOptions)}
            setSelectedOptions={handleSelectionChange}
            onChange={() => {}}
            prompt="What ingredients do you own?"
          />

          {Object.keys(selectedOptions).length > 0 && (
            <RecipesTable
              selectedOptions={selectedOptions}
              unitRanges={UNIT_RANGES}
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
          <pre>{JSON.stringify(selectedOptions, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default RecipesList;
