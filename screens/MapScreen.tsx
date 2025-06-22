import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
// import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
export default function MapScreen({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState<
    { lat: number; lng: number } | undefined
  >();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  }
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "لم يتم اختيار موقع",

        "يجب عليك اختيار موقع (عن طريق الضغط على الخريطة)اولا"
      );
      return;
    }
    navigation.goBack();
    navigation.navigate("Form", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="save"
          size={24}
          style={{ marginRight: 10 }}
          color={"white"}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);
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
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setCurrentLocation(loc.coords);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }
  // return (
  //   <MapView
  //     style={styles.Map}
  //     initialRegion={{
  //       latitude: currentLocation.latitude,
  //       longitude: currentLocation.longitude,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01,
  //     }}
  //     onPress={selectLocationHandler}
  //   >
  //     <Marker
  //       coordinate={{
  //         latitude: currentLocation.latitude,
  //         longitude: currentLocation.longitude,
  //       }}
  //       title="موقعك الحالى"
  //     >
  //       <View style={styles.customMarker}>
  //         <View style={styles.markerDot} />
  //       </View>
  //     </Marker>
  //     {selectedLocation && (
  //       <Marker
  //         title="الموقع المختار"
  //         coordinate={{
  //           latitude: selectedLocation.lat,
  //           longitude: selectedLocation.lng,
  //         }}
  //       />
  //     )}
  //   </MapView>
  // );
}
const styles = StyleSheet.create({
  Map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  customMarker: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerDot: {
    width: 20,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  markerText: {
    position: "absolute",
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
