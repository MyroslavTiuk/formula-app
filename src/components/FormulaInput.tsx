import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormulaStore, useVariableStore } from "../store/useFormulaStore";
import { evaluate } from "mathjs";
import FormulaTag from "./FormulaTag";
import SuggestionsList from "./SuggestionsList";
import { fetchSuggestions, OPERATORS } from "../utils/formulaUtils";

const FormulaInput: React.FC = () => {
  const { tags, inputValue, setInputValue, addTag, removeTag } = useFormulaStore();
  const { variables, setVariable } = useVariableStore();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState<number | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [formulaError, setFormulaError] = useState<string | null>(null);

  const { data: allSuggestions = [] } = useQuery({
    queryKey: ["autocomplete"],
    queryFn: fetchSuggestions,
  });

  const filteredSuggestions = inputValue.trim()
    ? allSuggestions.filter(
        (item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.value.toString().includes(inputValue)
      )
    : [];

  const handleAddTag = (name: string, value: string | number) => {
    addTag({ id: Date.now(), value: name });
    setVariable(name, typeof value === "number" ? value : parseFloat(value) || 0);
    setShowSuggestions(false);
    setIsResultVisible(false);
    setFormulaError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const parts = inputValue.match(/\d+|[-+*/()^]/g) || [];
      parts.forEach((part) => addTag({ id: Date.now(), value: part }));
      setInputValue("");
      setShowSuggestions(false);
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1].id);
      setIsResultVisible(false);
    } else if (OPERATORS.has(e.key)) {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag({ id: Date.now(), value: inputValue.trim() });
      }
      addTag({ id: Date.now(), value: e.key });
      setInputValue("");
      setIsResultVisible(false);
    }
  };

  const calculateFormula = () => {
    try {
      const expression = tags
        .map((tag) => (typeof tag.value === "string" && variables[tag.value] !== undefined ? variables[tag.value] : tag.value))
        .join(" ");
      const result = evaluate(expression);
      setCalculatedResult(result);
      setIsResultVisible(true);
      setFormulaError(null);
    } catch (error) {
      setCalculatedResult(null);
      setIsResultVisible(false);
      setFormulaError("Invalid formula. Please check your input.");
    }
  };

  return (
    <div className="relative border p-6 rounded-lg w-full max-w-2xl bg-white shadow-lg flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 border p-3 rounded-md bg-gray-100 relative">
        {tags.map((tag) => (
          <FormulaTag
            key={tag.id}
            tag={tag}
            removeTag={removeTag}
            setVariable={setVariable}
            variables={variables}
            setResultVisible={setIsResultVisible}
          />
        ))}
        <input
          type="text"
          className="outline-none border p-2 rounded-md flex-grow bg-white focus:ring-2 focus:ring-blue-400"
          placeholder="Enter formula..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(e.target.value.trim().length > 0 && filteredSuggestions.length > 0);
          }}
          onKeyDown={handleKeyDown}
        />
        {showSuggestions && (
          <div className="absolute left-0 top-full mt-1 w-full">
            <SuggestionsList show={showSuggestions} suggestions={filteredSuggestions} addTag={handleAddTag} />
          </div>
        )}
      </div>
      <button
        onClick={calculateFormula}
        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition font-semibold"
      >
        Calculate
      </button>
      {formulaError && (
        <div className="mt-2 text-lg font-bold text-red-600 text-center bg-red-100 p-2 rounded-md">
          {formulaError}
        </div>
      )}
      {isResultVisible && calculatedResult !== null && (
        <div className="mt-2 text-lg font-bold text-green-600 text-center bg-green-100 p-2 rounded-md">
          Result: {calculatedResult}
        </div>
      )}
    </div>
  );
};

export default FormulaInput;
