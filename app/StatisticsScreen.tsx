import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function StatisticsScreen() {
  const router = useRouter();
  return (
    <View style={styles.root}>
      <Text style={styles.label}>StatisticsScreen</Text>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0D8584",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  label: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
  back: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backText: {
    color: "#ffffff",
    fontSize: 16,
  },
});