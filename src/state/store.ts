import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setupPersistence } from "./persistence";
import savedRecipesReducer from "./saved-recipes-slice";

export const store = configureStore({
  reducer: {
    savedRecipes: savedRecipesReducer,
  },
});

// Typer för hela store så TypeScript vet hur state ser ut
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typade versioner av useSelector/useDispatch att använda i komponenterna
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

setupPersistence(store);
