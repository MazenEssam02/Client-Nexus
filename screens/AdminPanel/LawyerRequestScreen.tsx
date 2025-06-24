import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { Admin } from "../../API/https";

const LawyerRequestScreen = ({ route, navigation }) => {
  const { requestItem } = route.params;
  function decline() {
    navigation.goBack();
  }
  async function approve(id) {
    try {
      const response = await Admin.approveServiceProvider(id);
      if (response.data.success) {
        Alert.alert("تم الموافقة بنجاح");
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
      Alert.alert("حاول مرة اخري");
      navigation.goBack();
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.header}>طلب رقم {requestItem.id}</Text>

        <View style={styles.profileSection}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>الاسم:</Text>
            <Text style={styles.value}>
              {requestItem.firstName} {requestItem.lastName}
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>عنوان:</Text>
            <Text style={styles.value}>{requestItem.addresses.cityName} </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>التخصص:</Text>
            <Text style={styles.value}>{requestItem.main_Specialization}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>سنين الخبرة:</Text>
            <Text style={styles.value}>
              {requestItem.yearsOfExperience} سنوات
            </Text>
          </View>
          {/* <View style={styles.infoBlock}>
            <Text style={styles.label}>تاريخ الطلب:</Text>
            <Text style={styles.value}>2024-07-15 | 7:30</Text>
          </View> */}
        </View>
        <TextInput
          placeholder="تفاصيل عن الطلب..."
          multiline
          numberOfLines={5}
          style={styles.textInput}
          value={requestItem.description}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.rejectButton} onPress={decline}>
            <Text style={styles.buttonText}>رفض الطلب</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => approve(requestItem.id)}
          >
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
    textAlign: "right",
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
