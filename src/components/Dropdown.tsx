import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  value: number | string;
  onValueChange: (value: number) => void;
  setResultVisible?: (visible: boolean) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose, onDelete, value, onValueChange, setResultVisible }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onValueChange(parseFloat(localValue as string) || 0);
        if (setResultVisible) setResultVisible(false);
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, localValue, onValueChange, setResultVisible]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onValueChange(parseFloat(localValue as string) || 0);
      if (setResultVisible) setResultVisible(false);
      onClose();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute left-0 top-full mt-2 bg-white border rounded-lg w-44 shadow-md z-10 p-3 text-sm flex flex-col gap-2"
    >
      <button
        className="w-full text-left p-2 bg-red-50 hover:bg-red-100 rounded-md text-red-600 font-medium transition"
        onClick={() => {
          onDelete();
          if (setResultVisible) setResultVisible(false);
        }}
      >
        Delete
      </button>
      <div>
        <label className="block text-gray-600 text-xs font-semibold mb-1">Value:</label>
        <input
          type="number"
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter value..."
          value={localValue}
          onChange={(e) => {
            setLocalValue(e.target.value);
            if (setResultVisible) setResultVisible(false);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Dropdown;