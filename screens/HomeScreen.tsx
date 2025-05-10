import { StyleSheet, View, ScrollView, Pressable, Text } from "react-native";
import NotificationButton from "../components/NotificationButton/NotificationButton";
import QuickButton from "../components/QuickButton/QuickButton";
import SearchBlock from "../components/SearchBlock/SearchBlock";
import AskQuestionBlock from "../components/AskQuestionBlock/AskQuestionBlock";
import ArticlesSection from "../components/ArticlesSection/ArticlesSection";
import ScreensWrapper from "./ScreensWrapper/ScreensWrapper";
import Bot from "../components/Icons/Bot";
import { useQuery } from "@tanstack/react-query";
import { Documents } from "../API/https";
import MainLogo from "../components/Icons/MainLogo";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useEffect, useRef } from "react";
import { registerForPushNotificationsAsync } from "../helpers/notifications";
import { sendTokenToBackend } from "../API/sendTokenToBackend ";
import * as Notifications from "expo-notifications";
import { useAuthStore } from "../store/auth";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
export default function HomeScreen({ navigation }) {
  const responseListener = useRef<Notifications.EventSubscription>(null);
  // const authToken = useAuthStore().user?.authToken;
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        sendTokenToBackend(token);
      }
    });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("Notification Response:", response);
        navigation.navigate("Notification");
      });
    return () => {
      responseListener.current && responseListener.current.remove();
    };
  }, []);
  // const navigation = useNavigation();
  const {
    data: documents,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["documents"],
    queryFn: Documents.getAll,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
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
        <View style={styles.QuickButtonContainer}>
          <QuickButton
            title={"محامى عاجل"}
            iconName={"OnTime"}
            onPress={() => navigation.navigate("EmergencyLawyer" as never)}
          />
          <QuickButton
            title={"استشارة مكتبية"}
            iconName={"Consult"}
            onPress={() => navigation.navigate("Search" as never)}
          />
          <QuickButton
            title={"مكالمة محامى"}
            iconName={"Call"}
            onPress={() =>
              navigation.navigate("Search" as never, { type: false })
            }
          />
        </View>
        <SearchBlock />
        <AskQuestionBlock />
        <ArticlesSection
          navigation={navigation}
          documents={documents.data.data}
        />
      </ScrollView>
      <Pressable
        style={styles.chatBotContainer}
        onPress={() => navigation.navigate("ChatBotScreen" as never)}
      >
        <Bot width={50} height={50} />
      </Pressable>
    </ScreensWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 30,
    paddingHorizontal: 7,
  },
  header: {
    marginVertical: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  QuickButtonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 11,
  },
  chatBotContainer: {
    position: "absolute",
    bottom: 10,
    right: 15,
  },
});
