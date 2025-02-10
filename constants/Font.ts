import {
  Cairo_700Bold,
  Cairo_600SemiBold,
  Cairo_400Regular,
  useFonts,
} from "@expo-google-fonts/cairo";

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
    fontSize: 18,
  },
  title: {
    fontFamily: "Cairo_600SemiBold",
    fontSize: 14,
  },
  subtitle: {
    fontFamily: "Cairo_400Regular",
    fontSize: 12,
  },
  body: {
    fontFamily: "Cairo_400Regular",
    fontSize: 14,
  },
  Button: {
    fontFamily: "Cairo_700Bold",
    fontSize: 14,
  },
  Caption: {
    fontFamily: "Cairo_700Bold",
    fontSize: 12,
  },
};
