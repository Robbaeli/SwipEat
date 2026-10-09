import { removeRecipe } from "@/state/saved-recipes-slice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// const dummySavedRecipes = [
export default function Saved() {
  const savedRecipes = useAppSelector((state) => state.savedRecipes.recipes);
  const dispatch = useAppDispatch();
  const router = useRouter();

  //Dummyrecept for testing purposes
  // {
  //   id: "1",
  //   name: "Spicy Arrabiata Penne",
  //   imageUrl:
  //     "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
  // },
  // {
  //   id: "2",
  //   name: "Teriyaki Chicken",
  //   imageUrl:
  //     "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
  // },
  // ];
  // export default function Saved() {
  //   const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButton}>
        <Pressable onPress={() => router.back()}>
          <Text>← back</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>Saved Recipes</Text>
      {savedRecipes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No saved recipes</Text>
        </View>
      ) : (
        <FlatList
          data={savedRecipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.thumbnail}
                contentFit="cover"
              />
              <Text style={styles.name} numberOfLines={2}>
                {item.name}
              </Text>
              <Pressable
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel={`Delete ${item.name}`}
                style={({ pressed }) => (pressed ? styles.pressed : undefined)}
                onPress={() => dispatch(removeRecipe(item.id))}
              >
                <Text style={styles.deleteIcon}>🗑️</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#beb2b2",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2b1d1d",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#2b1d1d",
    fontSize: 18,
  },
  listContent: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#563b3b",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  name: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteIcon: {
    fontSize: 20,
  },
  pressed: {
    opacity: 0.6,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
