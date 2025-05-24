// components/AddressListModal/AddressListModal.tsx
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { MainButton } from "../Buttons/MainButton";
import { ModalHeader } from "./ModalHeader"; // Assuming ModalHeader is correctly defined
import { AddressListItem } from "./AddressListItem";
import { AddAddressFormView, NewAddressData } from "./AddAddressFormView"; // Import the new view

export interface Address {
  id: string;
  detailedAddress: string;
  cityId: number;
  stateId: number;
}

interface AddressListModalProps {
  isVisible: boolean;
  onClose: () => void;
  addresses: Address[];
  onRemoveAddress: (addressId: string) => void;
  onAddressAdded: (newAddress: NewAddressData) => void; // Changed from onAddNewAddress
}

type ModalView = "list" | "addForm";

export const AddressListModal: React.FC<AddressListModalProps> = ({
  isVisible,
  onClose,
  addresses,
  onRemoveAddress,
  onAddressAdded,
}) => {
  const [currentView, setCurrentView] = useState<ModalView>("list");

  const handleCloseModal = () => {
    setCurrentView("list"); // Reset view on close
    onClose();
  };

  const handleSaveNewAddress = (newAddress: NewAddressData) => {
    onAddressAdded(newAddress);
    setCurrentView("list"); // Go back to list view after saving
  };

  const renderListView = () => (
    <>
      {addresses && addresses.length > 0 ? (
        <FlatList
          data={addresses}
          renderItem={({ item }) => (
            <AddressListItem
              addressText={item.detailedAddress}
              onRemove={() => onRemoveAddress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>لا توجد عناوين محفوظة.</Text>
          <Text style={styles.emptySubText}>قم بإضافة عنوانك الأول!</Text>
        </View>
      )}
      <View style={styles.addButtonContainer}>
        <MainButton
          title="اضافة عنوان جديد"
          onPress={() => setCurrentView("addForm")}
        />
      </View>
    </>
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={handleCloseModal}
    >
      <SafeAreaView style={styles.safeArea}>
        <ModalHeader
          title={currentView === "list" ? "العناوين" : "إضافة عنوان جديد"}
          onClose={
            currentView === "list"
              ? handleCloseModal
              : () => setCurrentView("list")
          } // Allow going back from form
        />
        <View style={styles.modalView}>
          {currentView === "list" ? (
            renderListView()
          ) : (
            <AddAddressFormView
              onAddressSaved={handleSaveNewAddress}
              onCancel={() => setCurrentView("list")}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff" /* Changed from background for full white */,
  },
  modalView: { flex: 1, backgroundColor: "#fff" }, // Ensure modal content area is white
  listContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    ...font.headline,
    fontSize: 18,
    color: Colors.gray700,
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubText: { ...font.body, color: Colors.gray500, textAlign: "center" },
  addButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200 || "#e0e0e0",
    backgroundColor: "#fff",
    height: 80,
  },
});
