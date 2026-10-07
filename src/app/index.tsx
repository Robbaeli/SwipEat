import { dummyRecipes } from "@/data/dummy-recipes";
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
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: dummyRecipes[currentRecipeIndex].imageUrl,
          }}
          style={styles.image}
        />{" "}
        <Text style={styles.text}>{dummyRecipes[currentRecipeIndex].name}</Text>
        <Text style={styles.text}>
          {dummyRecipes[currentRecipeIndex].category}
        </Text>
        <View>
          <View style={styles.actionsRow}>
            <Pressable
              onPress={() => {
                setLiked(false);
                setCurrentRecipeIndex(
                  (prevIndex) => (prevIndex + 1) % dummyRecipes.length,
                );
              }}
            >
              <Text>❌</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setLiked(true);
                setCurrentRecipeIndex(
                  (prevIndex) => (prevIndex + 1) % dummyRecipes.length,
                );
              }}
            >
              <Text>❤️</Text>
            </Pressable>
          </View>
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
    backgroundColor: "#563b3b", // eller valfri färg
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
