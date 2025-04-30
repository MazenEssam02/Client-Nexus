import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

const LawyerRequestScreen = ({ route }) => {
  const { requestId } = route.params;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.header}>طلب رقم {requestId}</Text>

        <View style={styles.profileSection}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>الاسم:</Text>
            <Text style={styles.value}>عبدالكريم محمود</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>عنوان:</Text>
            <Text style={styles.value}>--- </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>التخصص:</Text>
            <Text style={styles.value}>جنائي</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>سنين الخبرة:</Text>
            <Text style={styles.value}>5 سنوات</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>تاريخ الطلب:</Text>
            <Text style={styles.value}>2024-07-15 | 7:30</Text>
          </View>
        </View>
        <TextInput
          placeholder="تفاصيل عن الطلب..."
          multiline
          numberOfLines={5}
          style={styles.textInput}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.rejectButton}>
            <Text style={styles.buttonText}>رفض الطلب</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.buttonText}>تأكيد الطلب</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LawyerRequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    fontSize: font.headline.fontSize,
    fontFamily: font.headline.fontFamily,
    textAlign: "center",
    marginVertical: 15,
    color: Colors.mainColor,
  },
  profileSection: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  infoBlock: {
    flexDirection: "row-reverse",
    columnGap: 5,
  },
  label: {
    fontSize: font.body.fontSize,
    color: Colors.SecondaryColor,
    fontFamily: font.body.fontFamily,
  },
  value: {
    fontSize: font.body.fontSize,
    fontFamily: font.body.fontFamily,
    marginBottom: 10,
  },
  textInput: {
    height: 120,
    borderColor: "#c29060",
    borderWidth: 1,
    borderRadius: 10,
    textAlignVertical: "top",
    padding: 10,
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  acceptButton: {
    backgroundColor: Colors.mainColor,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  rejectButton: {
    backgroundColor: Colors.invalidColor600,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: font.Button.fontSize,
    fontFamily: font.Button.fontFamily,
  },
});
