import React from "react";

interface SuggestionsListProps {
  show: boolean;
  suggestions: { name: string; id: string; category: string; value: string | number }[];
  addTag: (name: string, value: string | number) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ show, suggestions, addTag }) => {
  if (!show || !suggestions || suggestions.length === 0) return null;

  return (
    <ul className="absolute left-0 top-full mt-1 bg-white border rounded-lg w-full shadow-md z-10 p-2 text-sm max-h-60 overflow-y-auto">
      {suggestions.map((item) => (
        <li
          key={`${item.id}-${item.value}`}
          className="p-2 cursor-pointer hover:bg-gray-100 rounded-md transition flex justify-between items-center"
          onClick={() => addTag(item.name, item.value)}
        >
          <div>
            <span className="font-medium">{item.name}</span>
            <span className="text-gray-500 text-xs ml-2">({item.category})</span>
          </div>
          <span className="text-blue-600 font-semibold">{item.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsList;