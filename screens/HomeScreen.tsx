import { StyleSheet, View, Image, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import NotificationButton from "../components/NotificationButton/NotificationButton";
import QuickButton from "../components/QuickButton/QuickButton";
import SearchBlock from "../components/SearchBlock/SearchBlock";
import AskQuestionBlock from "../components/AskQuestionBlock/AskQuestionBlock";
import ArticlesSection from "../components/ArticlesSection/ArticlesSection";
import ChatBotIcon from "../components/ChatBotIcon/ChatBotIcon";

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          bounces={false}
          stickyHeaderIndices={[-1]}
        >
          <View style={styles.header}>
            <NotificationButton />
            <Image
              source={require("../assets/icons/Main-Logo.png")}
              style={styles.logoImage}
              resizeMethod="resize"
            />
          </View>
          <View style={styles.QuickButtonContainer}>
            <QuickButton title={"محامى عاجل"} iconName={"On_time"} />
            <QuickButton title={"استشارة مكتبية"} iconName={"Consult"} />
            <QuickButton title={"مكالمة محامى"} iconName={"Call"} />
          </View>
          <SearchBlock />
          <AskQuestionBlock />
          <ArticlesSection />
        </ScrollView>
        <View style={styles.chatBotContainer}>
          <ChatBotIcon />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
    bottom: 12,
    right: 15,
  },
});
