import { useState, useEffect, useRef } from "react";

interface MultiSelectDropdownProps {
  formFieldName: string;
  options: string[];
  selectedOptions: any[];
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
  const [isJsEnabled, setIsJsEnabled] = useState<Boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setIsJsEnabled(true);
  }, []);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const option = e.target.value;

    const selectedOptionSet = new Set(selectedOptions);
    if (isChecked) {
      selectedOptionSet.add(option);
    } else {
      selectedOptionSet.delete(option);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const isSelectAllEnabled = selectedOptions.length < options.length;
  const isClearSelectionEnabled = selectedOptions.length > 0;

  const handleSelectAllClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const inputs = optionsListRef.current?.querySelectorAll<HTMLInputElement>(
      "input[type=checkbox]"
    );
    inputs?.forEach((input) => (input.checked = true));
    setSelectedOptions([...options]);
    onChange([...options]);
  };

  const handleClearSelectionClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const inputs = optionsListRef.current?.querySelectorAll<HTMLInputElement>(
      "input[type=checkbox]"
    );
    inputs?.forEach((input) => (input.checked = false));
    setSelectedOptions([]);
    onChange([]);
  };

  // Filter options based on search term
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="absolute z-10 bg-white top-10 border rounded-b-md border-gray-200 w-full max-h-60 overflow-y-auto p-2">
            {/* Search Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full mb-2 px-2 py-1 border rounded-md border-gray-300"
            />

            {/* Options */}
            <ul ref={optionsListRef} className="grid grid-cols-2 gap-2">
              {filteredOptions.map((option) => (
                <li key={option}>
                  <label className="flex items-center rounded-md whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                    <input
                      type="checkbox"
                      name={formFieldName}
                      value={option}
                      className="cursor-pointer"
                      onChange={handleChange}
                      checked={selectedOptions.includes(option)}
                    />
                    <span className="ml-1">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isJsEnabled && (
          <div className="flex border-t border-gray-200 md:border-t-0 w-full md:w-auto justify-between items-center gap-2 px-2 py-1">
            <button
              onClick={handleSelectAllClick}
              disabled={!isSelectAllEnabled}
              className="flex-1 md:text-left px-2 py-1 text-center text-sm items-center text-nowrap text-blue-600 disabled:opacity-50 cursor-pointer border-r md:border-r-0 border-gray-200"
            >
              Select All
            </button>
            <button
              onClick={handleClearSelectionClick}
              disabled={!isClearSelectionEnabled}
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
