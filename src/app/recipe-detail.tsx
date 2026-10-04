import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
export default function RecipeDetail() {
  const router = useRouter();

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
            uri: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
          }}
          style={styles.image}
        />
        <Text style={styles.text}>name</Text>
        <Text style={styles.text}>category</Text>

        <Text style={styles.heading}>Ingredients</Text>
        <Text>• 400g Penne</Text>
        <Text>• 2 garlic</Text>
        <Text>• 1 can of crushed tomatoes</Text>

        <Text style={styles.heading}>Instructions</Text>
        <Text>
          Keep it simple: cook the pasta according to the package instructions.
          Sauté garlic in olive oil, add the crushed tomatoes, and simmer.
          Combine with the cooked pasta and serve.
        </Text>
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
