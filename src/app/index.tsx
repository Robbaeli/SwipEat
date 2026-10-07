import { searchRecipes } from "@/api/mealdb";
import { useSavedRecipes } from "@/state/saved-recipes-context";
import { Recipe } from "@/types/recipes";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { saveRecipe } = useSavedRecipes();
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  // searchQuery: vad användaren SKRIVER just nu i fältet (uppdateras varje tangenttryckning)
  const [searchQuery, setSearchQuery] = useState("");
  // submittedQuery: vad som faktiskt ska SÖKAS på (ändras bara när man trycker på knappen)
  const [submittedQuery, setSubmittedQuery] = useState("");

  useEffect(() => {
    async function loadRecipes() {
      try {
        setIsLoading(true);
        setError(null);
        const result = await searchRecipes(submittedQuery);
        setRecipes(result);
        setCurrentRecipeIndex(0);
      } catch (err) {
        setError(
          "Could not fetch recipes. Please check your internet connection.",
        );
      } finally {
        setIsLoading(false);
      }
    }
    loadRecipes();
  }, [submittedQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search recipes..."
        />
        <Button title="search" onPress={() => setSubmittedQuery(searchQuery)} />
      </View>

      {isLoading && <ActivityIndicator size="large" />}
      {!isLoading && error && <Text>{error}</Text>}
      {!isLoading && !error && recipes.length === 0 && (
        <Text>Inga recept hittades</Text>
      )}

      {!isLoading && !error && recipes.length > 0 && (
        <>
          <View style={styles.card}>
            <Pressable
              style={styles.cardContent}
              onPress={() =>
                router.push(
                  `/recipe-detail?id=${recipes[currentRecipeIndex].id}`,
                )
              }
            >
              <Image
                source={{ uri: recipes[currentRecipeIndex].imageUrl }}
                style={styles.image}
                contentFit="cover"
              />
              <Text style={styles.title}>
                {recipes[currentRecipeIndex].name}
              </Text>
              <Text style={styles.category}>
                {recipes[currentRecipeIndex].category}
              </Text>
            </Pressable>

            <View style={styles.actionsRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Skip recipe"
                hitSlop={8}
                style={[styles.actionButton, styles.skipButton]}
                onPress={() => {
                  setCurrentRecipeIndex(
                    (prevIndex) => (prevIndex + 1) % recipes.length,
                  );
                }}
              >
                <Text style={styles.actionIcon}>✕</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Save recipe"
                hitSlop={8}
                style={[styles.actionButton, styles.saveButton]}
                onPress={() => {
                  saveRecipe(recipes[currentRecipeIndex]);
                  setCurrentRecipeIndex(
                    (prevIndex) => (prevIndex + 1) % recipes.length,
                  );
                }}
              >
                <Text style={styles.actionIcon}>♥</Text>
              </Pressable>
            </View>
          </View>

          <Button title="Saved recipes" onPress={() => router.push("/saved")} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#beb2b2",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "90%",
    maxWidth: 440,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
    width: "100%",
    marginTop: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
    marginBottom: 18,
  },
  cardContent: {
    width: "100%",
  },
  card: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#563b3b",
    width: "90%",
    maxWidth: 440,
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  category: {
    color: "#e5cece",
    fontSize: 15,
    textAlign: "center",
  },
  actionButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  skipButton: {
    backgroundColor: "#f1e5e5",
  },
  saveButton: {
    backgroundColor: "#f4b5b5",
  },
  actionIcon: {
    color: "#563b3b",
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 34,
  },
});
