import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { OPERATORS } from "../utils/formulaUtils";

interface FormulaTagProps {
  tag: { id: number; value: string };
  removeTag: (id: number) => void;
  setVariable: (key: string, value: number) => void;
  variables: { [key: string]: number };
  setResultVisible: (visible: boolean) => void;
}

const FormulaTag: React.FC<FormulaTagProps> = ({ tag, removeTag, setVariable, variables, setResultVisible }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDropdownToggle = () => {
    if (!OPERATORS.has(tag.value)) {
      setOpenDropdown(!openDropdown);
    }
  };

  return (
    <div className="relative flex items-center bg-blue-200 px-3 py-2 rounded-md cursor-pointer shadow-sm hover:bg-blue-300 transition">
      <span className="mr-2 font-medium" onClick={handleDropdownToggle}>
        {tag.value}
      </span>
      <Dropdown
        isOpen={openDropdown && !OPERATORS.has(tag.value)}
        onClose={() => setOpenDropdown(false)}
        onDelete={() => removeTag(tag.id)}
        value={variables[tag.value] || ""}
        onValueChange={(value) => {
          setVariable(tag.value, value);
          setResultVisible(false);
        }}
      />
    </div>
  );
};

export default FormulaTag;