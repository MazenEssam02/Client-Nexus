// components/ModalHeader/ModalHeader.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeIcon}>×</Text>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerIcon}>📍</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 15 : 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200 || "#e0e0e0",
    backgroundColor: Colors.gray200,
  },
  titleContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  headerTitle: {
    ...font.headline,
    fontSize: 18,
    color: Colors.SecondaryColor,
    marginRight: 8,
  },
  headerIcon: {
    fontSize: 22,
    color: Colors.SecondaryColor,
  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    fontSize: 24,
    color: Colors.gray700,
  },
});
