import { StyleSheet, View, Image, ScrollView, Text } from "react-native";
import { Colors } from "../constants/Color";
import LawyerCard from "../components/LawyerCard/LawyerCard";
import LawyerSummarylist from "../components/LawyerSummarylist/LawyerSummarylist";
import { BookingPicker } from "../components/BookingPicker/BookingPicker";
import { useState } from "react";
import LawyerList from "../api-mock/LawyerList";
import { font } from "../constants/Font";
import { MainButton } from "../components/Buttons/MainButton";
export default function LawyerDetailsScreen({ route }) {
  const lwrID = route.params.lawyerid;
  const lawyer = LawyerList.find((lawyer) => lawyer.id === lwrID);
  const [type, setType] = useState(true);
  const onChange = (value) => {
    setType(value);
  };
  function onSubmitHandler() {}
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <LawyerCard
          name={lawyer.name}
          rate={lawyer.rate}
          speciality={lawyer.speciality}
          address={lawyer.address}
          style={styles.card}
          isLawyerDetailsCard={true}
        />
        <View style={styles.summaryContainer}>
          <LawyerSummarylist lawyer={lawyer} />
        </View>
        <View style={styles.bookingContainer}>
          <View style={styles.pickerContainer}>
            <BookingPicker value={type} onChange={onChange} />
          </View>
          <View style={{ width: "100%" }}>
            <View style={styles.bookInfoOuterContainer}>
              <View style={styles.bookInfoInnerContainer}>
                <Image
                  source={require("../assets/icons/Consult.png")}
                  style={{ width: 19, height: 21 }}
                />
                <Text style={[font.subtitle, styles.Text]}>
                  سعر الاستشارة : {lawyer.vezita}
                </Text>
              </View>
            </View>
            {type ? (
              <View style={styles.bookInfoOuterContainer}>
                <View style={styles.bookInfoInnerContainer}>
                  <Image
                    source={require("../assets/icons/Consult.png")}
                    style={{ width: 19, height: 21 }}
                  />
                  <Text style={[font.subtitle, styles.Text]}>
                    العنوان : {lawyer.address}
                  </Text>
                </View>
              </View>
            ) : (
              ""
            )}
          </View>
          <View style={styles.buttonContainer}>
            <MainButton
              title="حجز استشارة"
              onPress={() => {
                onSubmitHandler();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    flex: 1,
    width: "100%",
    height: 90,
    backgroundColor: "white",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 8,
    marginBottom: 5,
  },
  summaryContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    height: 110,
    justifyContent: "center",
  },
  bookingContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    // height: 110,
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    width: "90%",
    height: 50,
    justifyContent: "center",
  },
  bookInfoOuterContainer: {
    height: 50,
    width: "100%",
    borderBottomColor: Colors.SecondaryColor,
    borderBottomWidth: 0.5,
    justifyContent: "center",
  },
  bookInfoInnerContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  Text: {
    paddingRight: 10,
    color: Colors.SecondaryColor,
  },
  buttonContainer: {
    marginTop: 20,
    // marginBottom: 10,
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
});
