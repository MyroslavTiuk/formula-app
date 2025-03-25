import { create } from "zustand";

interface FormulaTag {
  id: number;
  value: string;
}

interface FormulaState {
  tags: FormulaTag[];
  inputValue: string;
  setInputValue: (value: string) => void;
  addTag: (tag: FormulaTag) => void;
  removeTag: (id: number) => void;
}

export const useFormulaStore = create<FormulaState>((set) => ({
  tags: [],
  inputValue: "",
  setInputValue: (value) => set({ inputValue: value }),
  addTag: (tag) =>
    set((state) => ({
      tags: [...state.tags, tag],
      inputValue: "",
    })),
  removeTag: (id) =>
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== id),
    })),
}));

interface VariableState {
  variables: { [key: string]: number };
  setVariable: (key: string, value: number) => void;
}

export const useVariableStore = create<VariableState>((set) => ({
  variables: {},
  setVariable: (key, value) =>
    set((state) => ({
      variables: { ...state.variables, [key]: value },
    })),
}));