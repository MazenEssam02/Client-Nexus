import {
  Cairo_700Bold,
  Cairo_600SemiBold,
  Cairo_400Regular,
  useFonts,
} from "@expo-google-fonts/cairo";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const scaleFont = (size: number) => (width / 375) * size;

export function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    Cairo_400Regular,
    Cairo_600SemiBold,
    Cairo_700Bold,
  });

  return fontsLoaded;
}

export const font = {
  headline: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: scaleFont(18),
  },
  title: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: scaleFont(14),
  },
  subtitle: {
    fontFamily: "Cairo_400Regular",
    fontSize: scaleFont(12),
  },
  body: {
    fontFamily: "Cairo_400Regular",
    fontSize: scaleFont(14),
  },
  Button: {
    fontFamily: "Cairo_700Bold",
    fontSize: scaleFont(14),
  },
  Caption: {
    fontFamily: "Cairo_700Bold",
    fontSize: scaleFont(12),
  },
};
