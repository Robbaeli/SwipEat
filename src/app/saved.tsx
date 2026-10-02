import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function Saved() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Saved Recipes</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#563b3b",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
