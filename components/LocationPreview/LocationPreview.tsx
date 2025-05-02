import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Color";
import OutlinedButton from "../Buttons/OutlineButton";
// import MapView, { Marker } from "react-native-maps";
import { font } from "../../constants/Font";
export default function locationPreview({ navigation, pickedLocation }) {
  let inputStyle = [
    styles.mapPreview,
    !pickedLocation.isValid && styles.invalidInput,
  ];
  function mapHandler() {
    navigation.navigate("MapScreen");
  }

  let locationPreview = (
    <Text
      style={[
        styles.locationText,
        !pickedLocation.isValid && styles.invalidText,
      ]}
    >
      لم يتم اختيار الموقع بعد
    </Text>
  );

  // if (!!pickedLocation.lat) {
  //   locationPreview = (
  //     <MapView
  //       style={styles.imagePreview}
  //       initialRegion={{
  //         latitude: pickedLocation.lat,
  //         longitude: pickedLocation.lng,
  //         latitudeDelta: 0.01,
  //         longitudeDelta: 0.01,
  //       }}
  //     >
  //       <Marker
  //         title="الموقع المختار"
  //         coordinate={{
  //           latitude: pickedLocation.lat,
  //           longitude: pickedLocation.lng,
  //         }}
  //       />
  //     </MapView>
  //   );
  // }
  return (
    <View style={styles.container}>
      <View style={inputStyle}>{locationPreview}</View>
      <View style={styles.outlineButtonContainer}>
        <OutlinedButton icon="map" onPress={mapHandler}>
          اختيار الموقع
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapPreview: {
    margin: 10,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: Colors.SecondaryColorLight,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  locationText: {
    color: Colors.gray500,
    ...font.title,
  },
  invalidText: { color: Colors.invalidColor200 },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  outlineButtonContainer: {
    width: "40%",
    alignSelf: "flex-end",
    margin: 10,
    marginTop: -5,
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: Colors.invalidColor600,
  },
});
