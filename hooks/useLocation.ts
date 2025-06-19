import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  
  useEffect(() => {
    (async () => {
      const { status: existingStatus } =
        await Location.getForegroundPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        setError("Permission to access location was denied");
        setLoading(false);
        Alert.alert("خطأ", "يرجى السماح بالوصول إلى الموقع");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setLoading(false);
    })();
  }, []);

    return {
        location,
        error,
        loading,
        setLocation,
    };
}