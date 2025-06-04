import DeleteIcon from "@mui/icons-material/Delete";
import { Dispatch, SetStateAction } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { IngredientData } from "../types";

type IngredientMap = Record<string, IngredientData>;

interface IngredientsTableProps {
  selectedOptions: IngredientMap;
  unitRanges: Record<string, any>;
  setSelectedOptions: Dispatch<SetStateAction<Record<string, IngredientData>>>;
}

export default function IngredientsTable({
  selectedOptions,
  unitRanges,
  setSelectedOptions,
}: IngredientsTableProps) {
  const ingredients = Object.entries(selectedOptions);
  const rowHeight = 130;

  const Row = ({ index, style }: ListChildComponentProps) => {
    const [ingredient, data] = ingredients[index];
    const range = unitRanges[data.unit];

    return (
      <tr
        style={style}
        key={ingredient}
        className="flex w-full border-b py-2 border-gray-200"
      >
        <td className="w-1/3 flex items-center gap-3 pl-4">
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-14 rounded-full">
              <span className="text-xl">{ingredient[0]}</span>
            </div>
          </div>
          <div>
            <div className="font-bold">{ingredient}</div>
          </div>
        </td>

        <td className="w-1/3">
          <div className="w-full pt-9 max-w-xs px-2">
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
              className="range range-xs w-full"
              step={range.rangeStep}
            />
            <div className="flex justify-between px-1 mt-2 text-[8px]">
              {range.rangeMarkers.map((label: string, idx: number) => (
                <span key={idx}>{label}</span>
              ))}
            </div>
          </div>
        </td>

        <td className="w-1/5 flex flex-col gap-2 items-center justify-center text-sm">
          {data.amount} {data.unit}
          {range.unitNote && (
            <span className="text-xs text-gray-500">{range.unitNote}</span>
          )}
        </td>

        <td className="w-1/12 flex items-center justify-center">
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
        </td>
      </tr>
    );
  };

  return (
    <div className="w-full px-4 pt-2">
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr className="flex w-full">
              <th className="w-1/3">Ingredient</th>
              <th className="w-1/3">How much you have?</th>
              <th className="w-1/5 text-center">Value</th>
              <th className="w-1/12">Drop?</th>
            </tr>
          </thead>
        </table>
        <List
          height={Math.min(ingredients.length * rowHeight, 500)}
          itemCount={ingredients.length}
          itemSize={rowHeight}
          width="100%"
        >
          {Row}
        </List>
      </div>
    </div>
  );
}
