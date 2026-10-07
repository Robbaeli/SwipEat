import { SavedRecipesProvider } from "@/state/saved-recipes-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SavedRecipesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SavedRecipesProvider>
  );
}
