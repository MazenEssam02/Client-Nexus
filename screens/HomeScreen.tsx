import { StyleSheet, View, Image, ScrollView } from "react-native";
import NotificationButton from "../components/NotificationButton/NotificationButton";
import QuickButton from "../components/QuickButton/QuickButton";
import SearchBlock from "../components/SearchBlock/SearchBlock";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} bounces={false}>
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 15,
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
    justifyContent: "space-around",
    marginVertical: 11,
  },
});
