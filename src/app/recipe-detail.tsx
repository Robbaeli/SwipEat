import { dummyRecipes } from "@/data/dummy-recipes";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function RecipeDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const currentRecipe = dummyRecipes.find((recipe) => recipe.id === id);

  if (!currentRecipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>didn't find the recipe</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButton}>
        <Pressable onPress={() => router.back()}>
          <Text>← back</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{
            uri: currentRecipe.imageUrl,
          }}
          style={styles.image}
        />
        <Text style={styles.text}>{currentRecipe.name}</Text>
        <Text style={styles.text}>{currentRecipe.category}</Text>

        <Text style={styles.heading}>Ingredients</Text>
        {currentRecipe.ingredients.map((ingredient, index) => (
          <Text key={index}>
            • {ingredient.name} ({ingredient.measure})
          </Text>
        ))}

        <Text style={styles.heading}>Instructions</Text>
        <Text>{currentRecipe.instructions}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 18,
    marginVertical: 8,
    fontWeight: "bold",
  },
});
