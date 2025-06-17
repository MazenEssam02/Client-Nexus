import { ScrollView, StyleSheet, Text, View } from "react-native";
import QuickButton from "../../components/QuickButton/QuickButton";
import ScreensWrapper from "../ScreensWrapper/ScreensWrapper";
import { useAuthStore } from "../../store/auth";

export default function LawyerDashboard({ navigation }) {
  const { logout } = useAuthStore();
  return (
    <ScreensWrapper>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Text>Lawyer Dashboard</Text>
        <Text>Welcome to the Lawyer Dashboard!</Text>
        <QuickButton
          title={"الاسئلة القانونية"}
          iconName={"Consult"}
          onPress={() => navigation.navigate("LawyerQA" as never)}
        />
        <QuickButton
          title={"logout"}
          iconName={"Consult"}
          onPress={() => logout()}
        />
      </ScrollView>
    </ScreensWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
  },
});
