import React, { useState } from "react";
import { View, Image, StyleSheet, Alert, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ProfilePictureModal from "../ProfilePictureModal/ProfilePictureModal";
import { Edit } from "../Icons/Edit";
import { Colors } from "../../constants/Color";

const ProfilePicturePicker = ({ editable }) => {
  const [imageUri, setImageUri] = useState(null);
  const [cameraPermissionInformation, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryPermissionInformation, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [isModelOpened, setIsModalOpened] = useState(false);
  // Request permissions when the component loads
  async function requestMediaHandler() {
    if (
      mediaLibraryPermissionInformation.status ===
      ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestMediaPermission();
      return permissionResponse.granted;
    }
    if (
      mediaLibraryPermissionInformation.status ===
      ImagePicker.PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos."
      );
      return false;
    }
    return true;
  }
  // Open the image library
  const selectImage = async () => {
    const permission = await requestMediaHandler();
    if (!permission) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1], // Crop to a square
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setIsModalOpened(false);
    }
  };
  // Request Camera Permission
  async function requestCameraHandler() {
    if (
      cameraPermissionInformation.status ===
      ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestCameraPermission();
      return permissionResponse.granted;
    }
    if (
      cameraPermissionInformation.status === ImagePicker.PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your camera."
      );
      return false;
    }
    return true;
  }
  // Open the camera
  const takePhoto = async () => {
    const permission = await requestCameraHandler();
    if (!permission) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,

      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setIsModalOpened(false);
    }
  };
  function openModal() {
    setIsModalOpened(true);
  }
  return (
    <>
      {isModelOpened && (
        <ProfilePictureModal
          modalVisible={isModelOpened}
          modalHandler={() => setIsModalOpened(false)}
          selectImage={selectImage}
          takePhoto={takePhoto}
        />
      )}
      <View style={styles.container}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Image
            source={require("../../assets/ProfilePic/profile.png")}
            style={styles.image}
          />
        )}
        {editable && (
          <Pressable onPress={openModal}>
            <Edit
              color={Colors.mainColor}
              size={24}
              style={{
                marginTop: -15,
                marginLeft: 70,
                backgroundColor: "white",
                borderRadius: 30,
                padding: 12,
              }}
            />
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default ProfilePicturePicker;
