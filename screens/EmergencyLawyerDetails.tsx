import { StyleSheet, View, ScrollView, Text, Alert } from "react-native";
import { Colors } from "../constants/Color";
import LawyerCard from "../components/LawyerCard/LawyerCard";
import LawyerSummarylist from "../components/LawyerSummarylist/LawyerSummarylist";
import { useLayoutEffect } from "react";
import AboutLawyer from "../components/AboutLawyer/AboutLawyer";
import LawyerSpecialities from "../components/LawyerSpecialities/LawyerSpecialities";
import LawyerRatings from "../components/LawyerRatings/LawyerRating";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EmeregencyCases, ServiceProvider } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import EmergencyCallBlock from "../components/EmergencyCallBlock/EmergencyCallBlock";
import { Ionicons } from "@expo/vector-icons";
import EmergencyCard from "../components/EmergencyLawyerCards/EmergencyCard";
import { MainButton } from "../components/Buttons/MainButton";
import useEmergencyStore from "../store/EmergencyStore";
import EmergencyDetailsBlock from "../components/EmergencyDetailsBlock/EmergencyDetailsBlock";

export default function EmeregencyLawyerDetails({ route, navigation }) {
  let phone = null;
  let price = 0;
  let id = 0;
  let title = "";
  let description = "";
  if (route?.params) {
    ({ price, id, title, description } = route.params);
  } else {
    const { emergencyDetails } = useEmergencyStore.getState();
    ({ title, description, price, phone, id } = emergencyDetails);
  }
  const lawerDetails = {
    id: 25,
    firstName: "مازن",
    lastName: "عصام الدين",
    rate: "5",
    description: "حاصل على بكالريوس القانون من جامعة القاهرة ",
    mainImage:
      "https://clientnexus.s3.amazonaws.com/images/a5152bd9-9cc3-4854-aecf-09cbc724cbe1.jpeg",
    imageIDUrl:
      "https://clientnexus.s3.amazonaws.com/images/898c2fb9-4530-4476-b6b1-38b85482bf18.png",
    imageNationalIDUrl:
      "https://clientnexus.s3.amazonaws.com/images/3cb4d64d-fe81-4918-97b7-f6bb3c2ceb62.jpg",
    yearsOfExperience: 10,
    state: null,
    city: null,
    specializationName: ["جنائى", "مدنى"],
    office_consultation_price: 200,
    telephone_consultation_price: 150,
    main_Specialization: "جنائى",
    gender: 77,
  };
  // const handleBack = () => {
  //   Alert.alert(
  //     "الرجوع",
  //     "هل انت متأكد انك تريدالغاءالطلب",
  //     [
  //       {
  //         text: "الغاء",
  //         // onPress: () => endEmergency(),
  //         style: "destructive",
  //       },
  //       {
  //         text: "البقاء",

  //         style: "cancel",
  //       },
  //     ],
  //     { cancelable: true, userInterfaceStyle: "light" }
  //   );
  // };
  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerLeft: () => (
        <Ionicons
          name="close-outline"
          size={30}
          color="white"
          onPress={() => navigation.popToTop()}
        />
      ),
    });
  }, [navigation]);
  const {
    data: providerFeedbacks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["providerFeedbacks", id],
    queryFn: () => ServiceProvider.getFeedbacks(id),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>حدث خطأ</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <EmergencyDetailsBlock title={title} description={description} />
        {<EmergencyCallBlock price={price} lawyerPhone={phone} />}
        <LawyerCard
          name={lawerDetails.firstName + " " + lawerDetails.lastName}
          rate={lawerDetails.rate}
          speciality={lawerDetails.main_Specialization}
          gender={lawerDetails.gender}
          // address={lawyer.city}
          imageURL={lawerDetails.mainImage}
          style={styles.card}
          isLawyerDetailsCard={true}
        />
        {/* <EmergencyCard lawyer={lawyer} emergencyCaseId={emergencyCaseId} /> */}
        {/* <View style={styles.summaryContainer}>
          <LawyerSummarylist
            rate={lawerDetails.rate}
            yearsOfExperience={lawerDetails.yearsOfExperience}
          />
        </View> */}

        <AboutLawyer Description={lawerDetails.description} />
        {/* <LawyerSpecialities
          specializationName={lawerDetails.specializationName}
        /> */}
        <LawyerRatings
          feedbacks={providerFeedbacks.data}
          isDisabled={true}
          navigation={navigation}
        />
        {/* <View style={styles.bookingContainer}>
          <View style={styles.buttonContainer}>
            <MainButton title="انهاءالطلب" onPress={handleBack} />
          </View>
        </View> */}
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
    marginVertical: 5,
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
