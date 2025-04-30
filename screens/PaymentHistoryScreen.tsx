import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";

const PaymentHistoryScreen = () => {
  const paymentHistoryData = [
    {
      id: "1",
      description: "تم قبول عملية الدفع بمبلغ 350 جنيه برقم 63000366",
      date: "11 ديسمبر",
    },
    {
      id: "2",
      description: "تم قبول عملية الدفع بمبلغ 350 جنيه برقم 63000366",
      date: "11 ديسمبر",
    },
    {
      id: "3",
      description: "تم قبول عملية الدفع بمبلغ 350 جنيه برقم 63000366",
      date: "11 ديسمبر",
    },
    {
      id: "4",
      description: "تم قبول عملية الدفع بمبلغ 350 جنيه برقم 63000366",
      date: "11 ديسمبر",
    },
    {
      id: "5",
      description: "تم قبول عملية الدفع بمبلغ 350 جنيه برقم 63000366",
      date: "11 ديسمبر",
    },
    {
      id: "6",
      description: "تم قبول عملية الدفع بمبلغ 350 جنيه برقم 63000366",
      date: "11 ديسمبر",
    },
    {
      id: "7",
      description: "تم قبول عملية الدفع بمبلغ 350 جنيه برقم 63000366",
      date: "11 ديسمبر",
    },
    {
      id: "8",
      description: "تم قبول عملية الدفع بمبلغ 350 جنيه برقم 63000366",
      date: "11 ديسمبر",
    },
    {
      id: "9",
      description: "تم قبول عملية الدفع بمبلغ 350 جنيه برقم 63000366",
      date: "11 ديسمبر",
    },
    {
      id: "10",
      description: "تم قبول عملية الدفع بمبلغ 350 جنيه برقم 63000366",
      date: "11 ديسمبر",
    },
  ];

  const renderPaymentItem = ({ item }) => (
    <View style={styles.paymentItem}>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={paymentHistoryData}
        keyExtractor={(item) => item.id}
        renderItem={renderPaymentItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Light background
  },
  listContent: {
    paddingHorizontal: 15,
  },
  paymentItem: {
    marginVertical: 15,
    alignItems: "flex-end", // Align text to the right for Arabic
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  description: {
    fontSize: font.body.fontSize,
    fontFamily: font.body.fontFamily,
    color: Colors.SecondaryColor,
    marginBottom: 5,
    textAlign: "right", // Ensure right alignment
  },
  date: {
    fontSize: font.subtitle.fontSize,
    fontFamily: font.subtitle.fontFamily,
    color: Colors.mainColor,
    textAlign: "right", // Ensure right alignment
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginTop: 15,
  },
});

export default PaymentHistoryScreen;
