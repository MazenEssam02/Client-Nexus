import { StyleSheet, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationButton from "../components/NotificationButton/NotificationButton";
import QuickButton from "../components/QuickButton/QuickButton";
import SearchBlock from "../components/SearchBlock/SearchBlock";
import AskQuestionBlock from "../components/AskQuestionBlock/AskQuestionBlock";
import ArticlesSection from "../components/ArticlesSection/ArticlesSection";
import ChatBotIcon from "../components/ChatBotIcon/ChatBotIcon";
import { useNavigation } from "@react-navigation/native";
import ScreensWrapper from "./ScreensWrapper/ScreensWrapper";

export default function HomeScreen() {
  const navigation = useNavigation();

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
          <Image
            source={require("../assets/icons/Main-Logo.png")}
            style={styles.logoImage}
            resizeMethod="resize"
          />
        </View>
        <View style={styles.QuickButtonContainer}>
          <QuickButton
            title={"محامى عاجل"}
            iconName={"On_time"}
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
            onPress={() => navigation.navigate("Search" as never)}
          />
        </View>
        <SearchBlock />
        <AskQuestionBlock />
        <ArticlesSection navigation={navigation} />
      </ScrollView>
      <View style={styles.chatBotContainer}>
        <ChatBotIcon
          onPress={() => navigation.navigate("ChatBotScreen" as never)}
        />
      </View>
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
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoImage: {
    width: 60,
    height: 43,
  },
  QuickButtonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginVertical: 11,
  },
  chatBotContainer: {
    position: "absolute",
    bottom: 10,
    right: 15,
  },
});
