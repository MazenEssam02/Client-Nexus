import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favorites";

export const getFavorites = async () => {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const addToFavorites = async (item) => {
  const favorites = await getFavorites();

  const exists = favorites.find((fav) => fav.id === item.id);
  if (!exists) {
    const updated = [...favorites, item];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  }
};

export const removeFromFavorites = async (id) => {
  const favorites = await getFavorites();
  const updated = favorites.filter((fav) => fav.id !== id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const isFavorite = async (id) => {
  const favorites = await getFavorites();
  return favorites.some((fav) => fav.id === id);
};
