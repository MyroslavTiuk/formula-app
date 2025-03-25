export const OPERATORS = new Set(["+", "-", "*", "/", "^", "(", ")"]);

export const fetchSuggestions = async (): Promise<
  { name: string; id: string; category: string; value: string | number }[]
> => {
  try {
    const response = await fetch("https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete");
    if (!response.ok) throw new Error("Failed to fetch suggestions");

    return await response.json();
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};