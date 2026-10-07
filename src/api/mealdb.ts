import type { Recipe } from "@/types/recipes";
import { mapMealDbMealToRecipe } from "./mealdb-mapper"; // justera filnamnet till vad din mapper-fil heter
import type { MealDbSearchResponse } from "./types";

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  // 1. Bygg URL
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

  // 2. fetch(url)
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Something went wrong: ${response.status}`);
  }

  // 3. await response.json()
  const data: MealDbSearchResponse = await response.json();

  // 4. if (!data.meals) return [];
  if (!data.meals) return [];

  // 5. data.meals.map(mapMealDbMealToRecipe)
  return data.meals.map(mapMealDbMealToRecipe);
};
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Something went wrong: ${response.status}`);
  }

  const data: MealDbSearchResponse = await response.json();
  if (!data.meals) {
    return null;
  }

  return mapMealDbMealToRecipe(data.meals[0]);
};
