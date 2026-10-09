import { Recipe } from "@/types/recipes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavedRecipesState {
  recipes: Recipe[];
}

const initialState: SavedRecipesState = {
  recipes: [],
};
const recipesSlice = createSlice({
  name: "savedRecipes",
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      // Spara inte samma recept två gånger
      const alreadySaved = state.recipes.some(
        (recipe) => recipe.id === action.payload.id,
      );
      if (!alreadySaved) {
        state.recipes.push(action.payload);
      }
    },
    removeRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload,
      );
    },
    // Ersätter hela listan, används när sparade recept laddas från AsyncStorage
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
  },
});

export const { addRecipe, removeRecipe, setRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
