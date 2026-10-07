import type { Ingredient, Recipe } from "@/types/recipes";
import type { MealDbMeal } from "./types";
export const mapMealDbMealToRecipe = (mealDbMeal: MealDbMeal): Recipe => {
  return {
    id: mealDbMeal.idMeal,
    name: mealDbMeal.strMeal,
    category: mealDbMeal.strCategory,
    imageUrl: mealDbMeal.strMealThumb,
    instructions: mealDbMeal.strInstructions,
    ingredients: (() => {
      const ingredients: Ingredient[] = [];
      for (let i = 1; i <= 20; i++) {
        const name = mealDbMeal[`strIngredient${i}` as keyof MealDbMeal];
        const measure = mealDbMeal[`strMeasure${i}` as keyof MealDbMeal];
        if (name && name.trim() !== "") {
          ingredients.push({ name, measure });
        }
      }
      return ingredients;
    })(),
  };
};
