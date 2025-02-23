import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
// import { ChevronDown } from "lucide-react";

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export function Dropdown({
  value,
  onChange,
  options,
  placeholder = "Select option",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = useCallback(
    (selectedValue: string) => {
      onChange(selectedValue);
      setIsOpen(false);
    },
    [onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const currentIndex = options.indexOf(value);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (currentIndex < options.length - 1) {
          onChange(options[currentIndex + 1]);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (currentIndex > 0) {
          onChange(options[currentIndex - 1]);
        }
        break;
      case "Enter":
        e.preventDefault();
        setIsOpen((prev) => !prev);
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      className="relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="dropdown-list"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-48 items-center justify-between rounded-md border bg-white p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
        aria-label={value || placeholder}
      >
        <span>{value || placeholder}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
        {/* <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        /> */}
      </button>

      {isOpen && (
        <div
          id="dropdown-list"
          role="listbox"
          className="absolute z-10 mt-1 max-h-60 w-48 overflow-auto rounded-md border bg-white shadow-lg"
          aria-label="Options"
        >
          {options.map((option) => (
            <div
              key={option}
              role="option"
              aria-selected={value === option}
              className={`cursor-pointer px-4 py-2 transition-colors ${
                value === option
                  ? "bg-[#00E0C6] text-white"
                  : "hover:bg-[#00E0C6] hover:text-white"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
