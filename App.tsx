import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Test from "./components/Test1";
import { Colors } from "./constants/Color";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [loaded, error] = useFonts({
  //   "Cairo": require("./assets/fonts/CairoRegular.ttf"),
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }
  return (
    <View style={styles.container}>
      <Test message={"مرحبا"} />
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
