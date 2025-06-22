import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/Color";
import LawyerCard from "../components/LawyerCard/LawyerCard";
import LawyerSummarylist from "../components/LawyerSummarylist/LawyerSummarylist";
import { useLayoutEffect, useState } from "react";
import BookingBlock from "../components/BookingBlock/BookingBlock";
import AboutLawyer from "../components/AboutLawyer/AboutLawyer";
import LawyerQA from "../components/LawyerQA/LawyerQA";
import LawyerSpecialities from "../components/LawyerSpecialities/LawyerSpecialities";
import LawyerRatings from "../components/LawyerRatings/LawyerRating";
import { useQueries } from "@tanstack/react-query";
import { ServiceProvider } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Favourite from "../components/Icons/Favourite";
import {
  addToFavorites,
  isFavorite,
  removeFromFavorites,
} from "../store/FavoritesStore";
import useProfileStore from "../store/Profile";
export default function LawyerDetailsScreen({ route, navigation }) {
  const profileData = useProfileStore((state) => state.profileData);
  const lawyer = route.params.lawyer;
  const [type, setType] = useState(
    route.params.type == undefined ? true : route.params.type
  ); //true is in person , false is phone
  const [favorite, setFavorite] = useState(false);

  useLayoutEffect(() => {
    const checkFavorite = async () => {
      const fav = await isFavorite(lawyer.id, profileData);
      setFavorite(fav);
    };
    checkFavorite();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            if (favorite) {
              await removeFromFavorites(lawyer.id, profileData);
            } else {
              await addToFavorites(lawyer, profileData);
            }
            setFavorite((prev) => !prev);
          }}
          style={{ marginRight: 10 }}
        >
          <Favourite stroke="white" fill={favorite ? "white" : "none"} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, favorite, lawyer]);
  const onChange = (value) => {
    setType(value);
  };
  const results = useQueries({
    queries: [
      {
        queryKey: ["providerFeedbacks", lawyer.id],
        queryFn: () => ServiceProvider.getFeedbacks(lawyer.id),
      },
      {
        queryKey: ["providerQA", lawyer.id],
        queryFn: () => ServiceProvider.getQA(lawyer.id),
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const [providerFeedbacks, providerQA] = results;

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
          name={lawyer.firstName + " " + lawyer.lastName}
          rate={lawyer.rate}
          speciality={lawyer.main_Specialization}
          gender={lawyer.gender}
          address={lawyer.city}
          imageURL={lawyer.mainImage}
          style={styles.card}
          isLawyerDetailsCard={true}
        />
        <View style={styles.summaryContainer}>
          <LawyerSummarylist
            {...lawyer}
            lawyerVisitors={providerFeedbacks.data.data.length}
          />
        </View>
        <BookingBlock
          type={type}
          onChange={onChange}
          lawyer={lawyer}
          navigation={navigation}
        />
        <AboutLawyer Description={lawyer.description} />
        <LawyerQA lawyerQA={providerQA.data.data} navigation={navigation} />
        <LawyerSpecialities specializationName={lawyer.specializationName} />
        <LawyerRatings
          feedbacks={providerFeedbacks.data.data}
          feedbacksQuery={providerFeedbacks}
          serviceProviderId={lawyer.id}
          navigation={navigation}
        />
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
