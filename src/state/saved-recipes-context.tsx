import { Recipe } from "@/types/recipes";
import { createContext, ReactNode, useContext, useState } from "react";

type SavedRecipesContextValue = {
  savedRecipes: Recipe[];

  saveRecipe: (recipe: Recipe) => void;
  removeRecipe: (id: string) => void;
};

const SavedRecipesContext = createContext<SavedRecipesContextValue | undefined>(
  undefined,
);
export function SavedRecipesProvider({ children }: { children: ReactNode }) {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  function saveRecipe(recipe: Recipe) {
    console.log("saveRecipe called with:", recipe.name);
    setSavedRecipes((prev) => {
      const updated = [...prev, recipe];
      console.log("savedRecipes now has", updated.length, "items");
      return updated;
    });
  }

  function removeRecipe(id: string) {
    console.log("removeRecipe called with:", id);
    setSavedRecipes((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      console.log("savedRecipes now has", updated.length, "items");
      return updated;
    });
  }

  return (
    <SavedRecipesContext.Provider
      value={{ savedRecipes, saveRecipe, removeRecipe }}
    >
      {children}
    </SavedRecipesContext.Provider>
  );
}

export function useSavedRecipes() {
  const context = useContext(SavedRecipesContext);
  if (!context) {
    throw new Error(
      "useSavedRecipes måste användas inom en SavedRecipesProvider",
    );
  }
  return context;
}
