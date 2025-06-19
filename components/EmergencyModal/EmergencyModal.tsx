import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import { MainButton } from "../Buttons/MainButton";
import InfoInput from "../InfoProfile/InfoInput";
import { LabeledInput } from "../AddressListModal/LabeledInput";
import { EmeregencyCases } from "../../API/https";
import { useLocation } from "../../hooks/useLocation";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  name: string;
  title: string;
  description: string;
  location: string;
  id: number;
}

const EmergencyModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  name,
  title,
  description,
  location,
  id,
}) => {
  const navigation = useNavigation();
  const { location: currentLocation } = useLocation();
  const [price, setPrice] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  return (
    <Modal
      transparent={true}
      animationType="fade" // or "slide"
      visible={visible}
      onRequestClose={onClose} // For Android back button
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            {/* Top section: Close button, Title, Profile Image */}
            <View style={styles.topRow}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.title}>{name}</Text>
            </View>

            {/* Problem Title */}
            <Text style={styles.problemTitle}>{title}</Text>

            {/* Description */}
            <Text style={styles.descriptionText}>{description}</Text>

            {/* Location */}
            <View style={styles.locationContainer}>
              <Text style={styles.locationIconPlaceholder}>📍</Text>
              <Text style={styles.locationText}>
                {location || "الموقع غير متوفر"}
              </Text>
            </View>


            <LabeledInput
              label="السعر (جنيه)"
              placeholder="أدخل السعر"
              keyboardType="numeric"
              inputStyle={{ textAlign: "right" }}
              value={price !== null ? price.toString() : ""}
              onChangeText={(text) =>
                setPrice(text === "" ? null : parseFloat(text))
              }

            />

            {/* Accept Button */}
            <View style={{ width: "100%", alignItems: "center", height: 35 }}>
              <MainButton
                title="قبول الطلب"
                disabled={loading || price === null}
                onPress={async () => {
                  try {
                    setLoading(true);
                    await EmeregencyCases.enableEmergency();
                    await EmeregencyCases.sendLawyerLocation(
                      currentLocation.latitude,
                      currentLocation.longitude
                    );
                    const res = await EmeregencyCases.createOffer(
                      id,
                      price ?? 0,
                      98
                    );
                    console.log("Offer created:", JSON.stringify(res, null, 2));
                    setLoading(false);
                    (navigation as any).navigate("LawyerTabs", {
                      screen: "Schedule",
                      params: {
                        screen: "EmergencySchedule",
                      },
                    });
                  } catch (error) {
                    console.error(
                      "Error accepting request:",
                      JSON.stringify(error, null, 2)
                    );
                    alert("حدث خطأ أثناء قبول الطلب. يرجى المحاولة مرة أخرى.");
                    setLoading(false);
                    onClose();
                  }
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: screenWidth * 0.9,
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center", // Centers the button at the bottom
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
  },
  closeButton: {
    // Positioned absolutely according to the image
    position: "absolute",
    top: -10, // Adjust to match visual
    left: -10, // Adjust to match visual
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
    zIndex: 1, // Ensure it's above other elements
  },
  closeButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  title: {
    ...font.title,
    flex: 1,
    textAlign: "right", // For Arabic text
    marginRight: 10, // Space between title and profile image
    marginLeft: 40, // Space for close button
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  problemTitle: {
    ...font.headline,
    textAlign: "right",
    width: "100%", // Ensure it takes full width for textAlign to work
    marginBottom: 10,
    marginTop: 10, // Add some space if close button is not absolute
  },
  descriptionText: {
    ...font.body,
    textAlign: "right", // For Arabic text
    width: "100%",
    lineHeight: 22, // Improved readability
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: "row-reverse", // Icon appears left of text for RTL
    alignItems: "center",
    alignSelf: "flex-end", // Aligns this whole block to the right
    marginBottom: 25,
  },
  locationText: {
    ...font.body,
    color: Colors.invalidColor200,
    textAlign: "right", // Text itself is right-aligned
  },
  locationIcon: {
    marginLeft: 8, // Space between icon and text (visual right for LTR, visual left for RTL)
  },
  locationIconPlaceholder: {
    // If not using vector icons
    fontSize: 18,
    marginLeft: 8,
  },
});

export default EmergencyModal;
