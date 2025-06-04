import { useState, useEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";

interface MultiSelectDropdownProps {
  formFieldName: string;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (opts: string[]) => void;
  onChange: (selectedOptions: string[]) => void;
  prompt?: string;
}

export default function MultiSelectDropdown({
  formFieldName,
  options,
  selectedOptions,
  setSelectedOptions,
  onChange,
  prompt = "Select one or more options",
}: MultiSelectDropdownProps) {
  const [isJsEnabled, setIsJsEnabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setIsJsEnabled(true), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (option: string, isChecked: boolean) => {
    const updated = new Set(selectedOptions);
    isChecked ? updated.add(option) : updated.delete(option);
    const updatedArray = Array.from(updated);
    setSelectedOptions(updatedArray);
    onChange(updatedArray);
  };

  const handleClearSelection = () => {
    setSelectedOptions([]);
    onChange([]);
  };

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const option = filteredOptions[index];
    const isChecked = selectedOptions.includes(option);

    return (
      <div style={style}>
        <label className="flex items-center rounded-md whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
          <input
            type="checkbox"
            name={formFieldName}
            value={option}
            checked={isChecked}
            onChange={(e) => handleChange(option, e.target.checked)}
            className="cursor-pointer"
          />
          <span className="ml-1">{option}</span>
        </label>
      </div>
    );
  };

  return (
    <div
      ref={dropdownRef}
      className="relative max-w-2xl w-full inline-block bg-white rounded-l-md"
    >
      <div className="flex flex-col md:flex-row gap-2 items-center relative border border-gray-200 rounded-sm">
        <div
          className={`cursor-pointer border-r border-gray-200 inline-flex px-5 py-2 max-w-2xl w-full after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center after:transition-transform ${
            isOpen ? "after:rotate-180" : ""
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {prompt}
          {isJsEnabled && selectedOptions.length > 0 && (
            <span className="ml-1 text-blue-500">{`(${selectedOptions.length} selected)`}</span>
          )}
        </div>

        {isOpen && (
          <div className="absolute z-10 bg-white top-10 border rounded-b-md border-gray-200 w-full max-h-60 p-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                "Search for one of " + options.length + " ingrediants..."
              }
              className="w-full mb-2 px-2 py-1 border rounded-md border-gray-300"
            />
            <List
              height={185}
              itemCount={filteredOptions.length}
              itemSize={40}
              width="100%"
            >
              {Row}
            </List>
          </div>
        )}

        {isJsEnabled && (
          <div className="flex border-t border-gray-200 md:border-t-0 w-full md:w-auto justify-between items-center gap-2 px-2 py-1">
            <button
              onClick={handleClearSelection}
              disabled={selectedOptions.length === 0}
              className="flex-1 md:text-left px-2 py-1 text-center text-sm items-center text-blue-600 disabled:opacity-50 cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
