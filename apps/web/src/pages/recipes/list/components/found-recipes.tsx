import { useEffect, useState } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { IngredientData, Recipe } from "../types";
import RecipeModal from "./modals/recipe-modal";

const API_URL = (import.meta as any).env.VITE_API_URL;

interface FoundRecipesProps {
  selectedIngredients: Record<string, IngredientData>;
}

export default function FoundRecipes({
  selectedIngredients,
}: FoundRecipesProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const ingredientIds = Object.values(selectedIngredients)
        .map((item: any) => item.ingredientId)
        .filter(Boolean);
      if (ingredientIds.length === 0) return;

      setLoading(true);

      try {
        const query = `ingrediant_ids=${ingredientIds.join(",")}`;
        const response = await fetch(`${API_URL}/recipes?${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setRecipes(data.recipes || []);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedIngredients]);

  const Row = ({ index, style }: ListChildComponentProps) => {
    const recipe = recipes[index];

    return (
      <div className="pb-10!">
        <RecipeModal recipe={recipe} id={`modal-${recipe.id}`} />

        <div
          style={style}
          className="p-2 border-gray-500 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            (
              document.getElementById(`modal-${recipe.id}`) as HTMLDialogElement
            )?.showModal();
          }}
        >
          <div className="font-bold mt-1">{recipe.title}</div>
          <div className="text-sm text-gray-600 mt-2">
            Prep: {recipe.prep_time ?? "?"} min, Cook: {recipe.cook_time ?? "?"}
            min
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading recipes...</div>;

  return (
    <div className="w-full">
      {recipes.length === 0 ? (
        <p>No recipes found for selected ingredients.</p>
      ) : (
        <List
          height={400}
          width="100%"
          itemCount={recipes.length}
          itemSize={90}
          className="w-full"
        >
          {Row}
        </List>
      )}
    </div>
  );
}
