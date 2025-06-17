import AsyncStorage from "@react-native-async-storage/async-storage";
const getUserFavoritesKey = (profileData) => {
  const email = profileData?.email?.value?.trim().toLowerCase() || "";
  const phone = profileData?.mobile?.value?.trim() || "";
  return `FAVORITES_${email}_${phone}`;
};
export const getFavorites = async (profileData) => {
  const key = getUserFavoritesKey(profileData);
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};
export const addToFavorites = async (item, profileData) => {
  const favorites = await getFavorites(profileData);
  const exists = favorites.find((fav) => fav.id === item.id);

  if (!exists) {
    const updated = [...favorites, item];
    const key = getUserFavoritesKey(profileData);
    await AsyncStorage.setItem(key, JSON.stringify(updated));
  }
};
export const removeFromFavorites = async (id, profileData) => {
  const favorites = await getFavorites(profileData);
  const updated = favorites.filter((fav) => fav.id !== id);
  const key = getUserFavoritesKey(profileData);
  await AsyncStorage.setItem(key, JSON.stringify(updated));
};
export const isFavorite = async (id, profileData) => {
  const favorites = await getFavorites(profileData);
  return favorites.some((fav) => fav.id === id);
};
