import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Test from "./components/Test1";
import { Colors } from "./constants/Color";

export default function App() {
  return (
    <View style={styles.container}>
      <Test message={"Test component"} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
