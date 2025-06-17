import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import { Colors } from "../constants/Color";
import LawyerCard from "../components/LawyerCard/LawyerCard";
import LawyerSummarylist from "../components/LawyerSummarylist/LawyerSummarylist";
import { useLayoutEffect } from "react";
import LawyerRatings from "../components/LawyerRatings/LawyerRating";
import { useQueries } from "@tanstack/react-query";
import { ServiceProvider } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import EmergencyCallBlock from "../components/EmergencyCallBlock/EmergencyCallBlock";
import { Ionicons } from "@expo/vector-icons";
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
        <Pressable onPress={() => navigation.popToTop()}>
          <Ionicons name="close-outline" size={30} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const results = useQueries({
    queries: [
      {
        queryKey: ["providerFeedbacks", id],
        queryFn: () => ServiceProvider.getFeedbacks(id),
      },
      {
        queryKey: ["providerDetails", id],
        queryFn: () => ServiceProvider.getById(id),
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const [providerFeedbacks, providerDetails] = results;
  const providerDetailsData = providerDetails.data?.data.data;
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
          name={
            providerDetailsData.firstName + " " + providerDetailsData.lastName
          }
          rate={providerDetailsData.rate}
          speciality={providerDetailsData.main_Specialization}
          gender={providerDetailsData.gender}
          // address={lawyer.city}
          imageURL={providerDetailsData.mainImage}
          style={styles.card}
          isLawyerDetailsCard={true}
        />

        <View style={styles.summaryContainer}>
          <LawyerSummarylist
            rate={providerDetailsData.rate}
            yearsOfExperience={providerDetailsData.yearsOfExperience}
            lawyerVisitors={providerFeedbacks.data?.data.length}
          />
        </View>

        <LawyerRatings
          feedbacks={providerFeedbacks.data?.data}
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
