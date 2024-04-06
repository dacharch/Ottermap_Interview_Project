import React from "react";

interface DropdownMenuProps {
  options: string[];
  onSelectOption: (option: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  onSelectOption,
}) => {
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectOption(e.target.value);
  };

  return (
    <select className="p-3" onChange={handleOptionChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownMenu;
