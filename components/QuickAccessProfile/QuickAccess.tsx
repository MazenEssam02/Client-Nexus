import { Text, View, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useEffect, useState } from "react";
import { Question } from "../Icons/Question";
import { Calendar } from "../Icons/Calendar";
import { Search } from "../Icons/Search";
import { Conditions } from "../Icons/Conditions";
import { Exit } from "../Icons/Exit";
import { Arrow } from "../Icons/Arrow";
import { useNavigation } from "@react-navigation/native";
import Favourite from "../Icons/Favourite";
import Payment from "../Icons/Payment";
import { useAuthStore } from "../../store/auth";
import { EditSmall } from "../Icons/EditSmall";
const QuickAccess = ({ icon, title, onPress = null }) => {
  const { logout } = useAuthStore();
  const [exitHandler, setExitHandler] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    if (icon === "Exit") {
      setExitHandler(true);
    }
  }, [icon]);
  const IconHandler = ({ icon }) => {
    switch (icon) {
      case "favourite":
        return <Favourite />;
      case "edit":
        return <EditSmall />;
      case "myQuestions":
        return <Question />;
      case "allQuestions":
        return <Question />;
      case "schedule":
        return <Calendar />;
      case "search":
        return <Search stroke={Colors.mainColor} fill={null} />;
      case "conditions":
        return <Conditions />;
      case "Exit":
        return <Exit />;
      case "Payment History":
        return <Payment />;
      default:
        return <Favourite />;
    }
  };
  const navigateHandler = () => {
    if (onPress) {
      onPress();
      return;
    }
    switch (icon) {
      case "favourite":
        navigation.navigate("Favourite" as never);
        break;
      case "myQuestions":
        navigation.navigate("MyQuestion" as never);
        break;
      case "allQuestions":
        navigation.navigate("Questions" as never);
        break;
      case "Payment History":
        return navigation.navigate("Payment History" as never);
      case "search":
        return navigation.navigate("HomeStack" as never, {
          screen: "Search" as never,
        });
      case "schedule":
        return navigation.navigate("Schedule" as never);
      case "Exit":
        logout();
        break;
      default:
        break;
    }
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.border,
        pressed && styles.pressed,
        exitHandler && styles.exitBorder,
      ]}
      onPress={navigateHandler}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <IconHandler icon={icon} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={exitHandler ? styles.exitTitle : styles.title}>
            {title}
          </Text>
          {icon === "Exit" ? (
            <Arrow fillColor={Colors.invalidColor600} />
          ) : (
            <Arrow fillColor="" />
          )}
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  border: {
    marginBlock: 7,
    borderWidth: 1,
    borderColor: Colors.SecondaryColorLight,
    borderRadius: 8,
  },
  exitBorder: {
    borderColor: Colors.invalidColor200,
  },
  pressed: {
    opacity: 0.5,
  },
  container: {
    padding: 7,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  imageContainer: {
    marginLeft: 5,
    minHeight: 15,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginInline: 5,
  },
  title: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.SecondaryColor,
  },
  exitTitle: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.invalidColor200,
  },
});
export default QuickAccess;
