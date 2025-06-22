import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import QuickButton from "../../components/QuickButton/QuickButton";
import ScreensWrapper from "../ScreensWrapper/ScreensWrapper";
import { useAuthStore } from "../../store/auth";
import NotificationButton from "../../components/NotificationButton/NotificationButton";
import MainLogo from "../../components/Icons/MainLogo";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Client, ServiceProvider } from "../../API/https";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import IsError from "../../components/IsError/IsError";
import { usePushNotifications } from "../../hooks/usePushNotifications";
import LawyerCard from "../../components/LawyerCard/LawyerCard";
import LawyerSummaryList from "../../components/LawyerSummarylist/LawyerSummarylist";
import LawyerRatings from "../../components/LawyerRatings/LawyerRating";
import LawyerQA from "../../components/LawyerQA/LawyerQA";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { MainButton } from "../../components/Buttons/MainButton";
import { QuestionCardLawyer } from "../../components/PreviewCard/QuestionCardLawyer";

export default function LawyerDashboard({ navigation }) {
  usePushNotifications(navigation);
  const { user } = useAuthStore();
  console.log(user.id);
  const results = useQueries({
    queries: [
      {
        queryKey: ["LawyerDashboard"],
        queryFn: () => ServiceProvider.getById(user.id),
      },
      {
        queryKey: ["providerFeedbacks", user.id],
        queryFn: () => ServiceProvider.getFeedbacks(user.id),
      },
      {
        queryKey: ["providerQA", user.id],
        queryFn: async () => {
          const response = await ServiceProvider.getQA(user.id);
          const fullItems = await Promise.all(
            response.data.slice(0, 3).map(async (item) => {
              const client = await Client.get(item.clientId);
              return { ...item, client: client.data.data };
            })
          );
          return fullItems;
        },
        enabled: !!user?.id, // only run when user.id exists
      },
    ],
  });
  const isLoading = results.some((result) => result.isLoading);
  console.log(isLoading);
  const isError = results.some((result) => result.isError);
  const [lawyerRes, providerFeedbacks, providerQA] = results;
  console.log(LawyerQA);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <IsError error={results.find((result) => result.isError)?.error} />;
  }
  const lawyer = lawyerRes.data.data.data;

  return (
    <ScreensWrapper>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <NotificationButton
            onPress={() => {
              navigation.navigate("Notification" as never);
            }}
          />
          <MainLogo />
        </View>
        {/* <Pressable onPress={() => console.log("Profile Pressed")}>
          <Text
            style={{
              ...font.subtitle,
              backgroundColor: "white",
              padding: 4,
              textAlign: "right",
              borderRadius: 5,
              borderColor: Colors.mainColor,
              borderWidth: 1,
              marginBottom: 10,
            }}
          >
            يرجي العلم ان حسابك مازال تحت المراجعة
          </Text>
        </Pressable> */}
        <View style={styles.TopContainer}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.nameText}>
              {lawyer.firstName} {lawyer.lastName}
            </Text>
            <Text style={styles.titleText}>{lawyer.main_Specialization}</Text>
          </View>
          <Image
            source={
              lawyer.mainImage
                ? { uri: lawyer.mainImage }
                : require("../../assets/user.jpg")
            }
            style={styles.profileImage}
          />
        </View>
        <View style={styles.summaryContainer}>
          <LawyerSummaryList
            {...lawyer}
            lawyerVisitors={providerFeedbacks.data.data.length}
          />
        </View>
        <View style={styles.QuickButtonContainer}>
          <QuickButton
            title={"الاسئلة القانونية"}
            iconName={"Consult"}
            onPress={() => navigation.navigate("LawyerQA" as never)}
            style={{
              width: "48%",
            }}
          />
          <QuickButton
            title={"الطلبات العاجلة"}
            iconName={"OnTime"}
            onPress={() => navigation.navigate("EmergencyRequests" as never)}
            style={{
              width: "48%",
            }}
          />
        </View>
        <LawyerRatings
          feedbacks={providerFeedbacks.data.data}
          feedbacksQuery={providerFeedbacks}
          serviceProviderId={lawyer.id}
          navigation={navigation}
          lawyerView
        />
        <View style={styles.QuestionCardContainer}>
          <View style={styles.QuestionListHeader}>
            <Text
              style={{
                ...font.title,
                color: Colors.SecondaryColor,
                textAlign: "right",
                marginVertical: 10,
              }}
            >
              الاسئلة المجابة
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("LawyerQA" as never, {
                  screen: "LawyerQAPrev",
                });
              }}
            >
              <Text
                style={{
                  ...font.subtitle,
                  color: Colors.mainColor,
                  textAlign: "right",
                }}
              >
                عرض الكل
              </Text>
            </Pressable>
          </View>
          {providerQA?.data.map((item, index) => (
            <View key={item.id}>
              <QuestionCardLawyer {...item} />
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: Colors.gray700,
                  opacity: index === providerQA.data.length - 1 ? 0 : 0.2,
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreensWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
  },
  header: {
    marginVertical: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  userInfoContainer: {
    flex: 1,
    marginRight: 15,
    alignItems: "flex-end",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  nameText: {
    ...font.headline,
    color: Colors.SecondaryColor,
    textAlign: "right",
  },
  titleText: {
    ...font.subtitle,
    color: Colors.SecondaryColor,
    textAlign: "right",
    marginTop: 4,
  },
  summaryContainer: {
    backgroundColor: "white",
    marginVertical: 20,
    height: 110,
    justifyContent: "center",
  },
  QuickButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  QuestionCardContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    marginTop: 4,
    padding: 10,
  },
  QAMoreButtonContainer: {
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
  QuestionListHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
