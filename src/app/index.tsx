import { dummyRecipes } from "@/data/dummy-recipes";
import { useSavedRecipes } from "@/state/saved-recipes-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  // State: vilket recept (index i listan) som visas just nu
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const { saveRecipe } = useSavedRecipes();

  // Hjälpvariabel: slipper skriva dummyRecipes[currentRecipeIndex] överallt
  const currentRecipe = dummyRecipes[currentRecipeIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Pressable
          onPress={() => router.push(`/recipe-detail?id=${currentRecipe.id}`)}
        >
          <Image
            source={{ uri: currentRecipe.imageUrl }}
            style={styles.image}
          />
          <Text style={styles.text}>{currentRecipe.name}</Text>
          <Text style={styles.text}>{currentRecipe.category}</Text>
        </Pressable>

        <View style={styles.actionsRow}>
          <Pressable
            onPress={() => {
              setCurrentRecipeIndex(
                (prevIndex) => (prevIndex + 1) % dummyRecipes.length,
              );
            }}
          >
            <Text>❌</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              saveRecipe(currentRecipe);
              setCurrentRecipeIndex(
                (prevIndex) => (prevIndex + 1) % dummyRecipes.length,
              );
            }}
          >
            <Text>❤️</Text>
          </Pressable>
        </View>
      </View>

      <Button title="Saved recipes" onPress={() => router.push("/saved")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  card: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#563b3b",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
});
