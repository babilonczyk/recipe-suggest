import DeleteIcon from "@mui/icons-material/Delete";

type IngredientData = {
  amount: number;
  unit: string;
  unitNote?: string;
};

type IngredientMap = Record<string, IngredientData>;

interface RecipesTableProps {
  selectedOptions: IngredientMap;
  unitRanges: Record<string, any>;
  setSelectedOptions: (
    opts: IngredientMap | ((prev: IngredientMap) => IngredientMap)
  ) => void;
}

export default function RecipesTable({
  selectedOptions,
  unitRanges,
  setSelectedOptions,
}: RecipesTableProps) {
  return (
    <table className="table ml-8 mt-3">
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>How much you have?</th>
          <th className="text-center">Value</th>
          <th>Drop?</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(selectedOptions).map(([ingredient, data]) => {
          const range = unitRanges[data.unit];
          return (
            <tr key={ingredient}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-14 rounded-full">
                      <span className="text-xl">{ingredient[0]}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{ingredient}</div>
                  </div>
                </div>
              </td>
              <td className="flex gap-2">
                <div className="w-full max-w-xs">
                  <input
                    type="range"
                    min={range.rangeMin}
                    max={range.rangeMax}
                    value={data.amount}
                    onChange={(e) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [ingredient]: {
                          ...prev[ingredient],
                          amount: Number(e.target.value),
                        },
                      }))
                    }
                    className="range range-xs"
                    step={range.rangeStep}
                  />

                  <div className="flex justify-between px-1 mt-2 text-[8px]">
                    {range.rangeMarkers.map((label: string, idx: number) => (
                      <span key={idx}>{label}</span>
                    ))}
                  </div>
                </div>
              </td>
              <td>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm">
                    {data.amount} {data.unit}
                  </span>
                  {range.unitNote && (
                    <span className="text-xs text-gray-500">
                      {range.unitNote}
                    </span>
                  )}
                </div>
              </td>
              <th>
                <button
                  className="btn btn-ghost p-0 btn-xs"
                  onClick={() => {
                    setSelectedOptions((prev) => {
                      const updated = { ...prev };
                      delete updated[ingredient];
                      return updated;
                    });
                  }}
                >
                  <DeleteIcon className="text-red-500" />
                </button>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
