import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

export interface SelectedAsset {
  uri: string;
  name: string;
  type: string;
}

interface FileUploadButtonProps {
  label: string;
  onFileSelected: (asset: SelectedAsset | null) => void;
  selectedFileName?: string;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  label,
  onFileSelected,
  selectedFileName,
}) => {
  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to make this work!"
        );
        onFileSelected(null);
        return;
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // You can set this to false if not needed
        // aspect: [4, 3], // Optional: force aspect ratio if allowsEditing is true
        quality: 0.7, // Compress image (0 to 1)
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const localUri = asset.uri;

        // Determine filename
        const filename =
          asset.fileName ||
          localUri.split("/").pop() ||
          `imagepicker-${Date.now()}.jpg`; // Fallback filename

        // Determine MIME type
        let mimeType = asset.mimeType;
        if (!mimeType) {
          const fileExtension = filename.split(".").pop()?.toLowerCase();
          if (fileExtension === "jpg" || fileExtension === "jpeg") {
            mimeType = "image/jpeg";
          } else if (fileExtension === "png") {
            mimeType = "image/png";
          } else if (asset.type === "image") {
            // If expo-image-picker identifies it as an image but mimeType is missing
            mimeType = "image/jpeg"; // Default to jpeg, or add more specific extension checks
          } else {
            mimeType = "application/octet-stream"; // Generic fallback
          }
        }
        // Ensure mimeType is a valid format like 'image/jpeg'
        if (mimeType && !mimeType.includes("/")) {
          if (mimeType === "jpg" || mimeType === "jpeg")
            mimeType = "image/jpeg";
          else if (mimeType === "png") mimeType = "image/png";
          // Add more cases if needed or default to a generic image type
          else mimeType = `image/${mimeType}`; // Basic assumption
        }

        const selectedAssetData: SelectedAsset = {
          uri: localUri,
          name: filename,
          type: mimeType || "image/jpeg", // Ensure there's always a type
        };
        onFileSelected(selectedAssetData);
      } else {
        onFileSelected(null); // User cancelled picker or no assets found
      }
    } catch (error) {
      console.error("ImagePicker Error: ", error);
      Alert.alert("Error", "Could not pick image. Please try again.");
      onFileSelected(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttonAndFile}>
        {selectedFileName && (
          <Text style={styles.fileName} numberOfLines={1}>
            {selectedFileName}
          </Text>
        )}
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>اختر صورة</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    paddingVertical: 5,
  },
  label: {
    ...font.body,
    color: Colors.SecondaryColor,
    textAlign: "right",
  },
  buttonAndFile: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.gray200 || "#f5f5f5",
    borderColor: Colors.mainColor || "#A0522D",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    minWidth: 100,
    alignItems: "center",
  },
  buttonText: {
    ...font.Button,
    color: Colors.mainColor || "#A0522D",
    fontSize: 14,
  },
  fileName: {
    ...font.Caption,
    color: Colors.gray700,
    marginLeft: 10,
    maxWidth: 120,
  },
});
