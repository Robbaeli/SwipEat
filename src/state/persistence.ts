import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Store } from "@reduxjs/toolkit";
import { Recipe } from "@/types/recipes";
import { setRecipes } from "./saved-recipes-slice";

const STORAGE_KEY = "savedRecipes";

type PersistedState = {
  savedRecipes: { recipes: Recipe[] };
};

export async function setupPersistence(store: Store<PersistedState>) {
  // 1. Ladda: läs sparade recept från telefonen och lägg in dem i storen
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json !== null) {
      store.dispatch(setRecipes(JSON.parse(json)));
    }
  } catch (err) {
    console.log("Could not load saved recipes", err);
  }

  // 2. Spara: varje gång listan ändras skrivs den till telefonen.
  // Startar först EFTER laddningen, annars kan en tom lista skriva över det sparade.
  let previousRecipes = store.getState().savedRecipes.recipes;

  store.subscribe(() => {
    const recipes = store.getState().savedRecipes.recipes;
    if (recipes === previousRecipes) return; // inget ändrades i listan
    previousRecipes = recipes;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes)).catch((err) =>
      console.log("Could not save recipes", err),
    );
  });
}
