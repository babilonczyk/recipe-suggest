import { useEffect, useRef, useState } from "react";
import { Recipe } from "../../types";

const API_URL = (import.meta as any).env.VITE_API_URL;

interface RecipeModalProps {
  recipe: Recipe;
  id: string;
}

export default function RecipeModal({ recipe, id }: RecipeModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [detailedRecipe, setDetailedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isOpen = dialogRef.current?.open;
      if (isOpen && !hasFetched) {
        fetchRecipe();
      }
    });

    if (dialogRef.current) {
      observer.observe(dialogRef.current, {
        attributes: true,
        attributeFilter: ["open"],
      });
    }

    return () => observer.disconnect();
  }, [hasFetched]);

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/recipes/${recipe.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setDetailedRecipe(data.recipe);
      setHasFetched(true);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog ref={dialogRef} id={`modal-${recipe.id}`} className="modal">
      <div className="modal-box max-w-3xl">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h3 className="font-bold text-lg mb-2">{recipe.title}</h3>

            <div className="text-sm mb-2">
              <strong>Prep:</strong> {detailedRecipe?.prep_time ?? "?"} min |{" "}
              <strong>Cook:</strong> {detailedRecipe?.cook_time ?? "?"} min
            </div>

            <div className="text-sm mb-2">
              <strong>Author:</strong> {detailedRecipe?.author?.name ?? "?"}
              <br />
              <strong>Category:</strong> {detailedRecipe?.category?.name ?? "?"}
            </div>

            <div>
              <h4 className="font-semibold mb-1">Ingredients:</h4>
              <ul className="list-disc list-inside text-sm">
                {detailedRecipe?.ingrediant_values?.map((iv) => (
                  <li key={iv.id}>
                    {iv.value} {iv.ingrediant.unit?.name} of{" "}
                    {iv.ingrediant.name}
                    {iv.ingrediant.unit?.help_text && (
                      <span className="text-gray-500 text-xs ml-1">
                        ({iv.ingrediant.unit.help_text})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-action mt-6">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
