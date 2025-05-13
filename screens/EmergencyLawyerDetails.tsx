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
import EmergencyCard from "../components/EmergencyLawyer Card/EmergencyCard";

export default function EmeregencyLawyerDetails({ route, navigation }) {
  const { lawyer, lawyerPhone, emergencyCaseId } = route.params;
  console.log(lawyer);
  const { mutate: deleteEmergency } = useMutation({
    mutationFn: () => EmeregencyCases.deleteEmergency(emergencyCaseId),
    onSuccess: () => {
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error);
      Alert.alert("خطأ", "برجاء المحاولة مره اخري.");
    },
  });
  const handleBack = () => {
    Alert.alert(
      "الرجوع",
      "هل انت متأكد انك تريد الرجوع و الغاء الطلب",
      [
        {
          text: "الغاء",
          onPress: () => deleteEmergency(),
          style: "destructive",
        },
        {
          text: "البقاء",

          style: "cancel",
        },
      ],
      { cancelable: true, userInterfaceStyle: "light" }
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerLeft: () => (
        <Ionicons
          name="close-outline"
          size={30}
          color="white"
          onPress={handleBack}
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
    queryKey: ["providerFeedbacks", lawyer.ServiceProviderId],
    queryFn: () => ServiceProvider.getFeedbacks(lawyer.ServiceProviderId),
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
        <LawyerCard
          name={lawyer.FirstName + " " + lawyer.LastName}
          rate={lawyer.Rating}
          // speciality={lawyer.main_Specialization}
          // gender={lawyer.gender}
          // address={lawyer.city}
          imageURL={lawyer.ImageUrl}
          style={styles.card}
          isLawyerDetailsCard={true}
        />
        {/* <EmergencyCard lawyer={lawyer} emergencyCaseId={emergencyCaseId} /> */}
        <View style={styles.summaryContainer}>
          <LawyerSummarylist
            rate={lawyer.Rating}
            yearsOfExperience={lawyer.YearsOfExperience}
          />
        </View>
        <EmergencyCallBlock lawyer={lawyer} lawyerPhone={lawyerPhone} />
        {/* <AboutLawyer Description={lawyer.description} /> */}
        {/* <LawyerSpecialities specializationName={lawyer.specializationName} /> */}
        {/* <LawyerRatings feedbacks={providerFeedbacks.data.data} /> */}
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
