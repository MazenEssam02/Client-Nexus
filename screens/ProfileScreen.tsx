import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import InfoField from "../components/InfoField/InfoField";
import ScreensWrapper from "./ScreensWrapper/ScreensWrapper";
import { Colors } from "../constants/Color";
import QuickAccess from "../components/QuickAccess/QuickAccess";
import { font } from "../constants/Font";

export default function ProfileScreen() {
  return (
    <ScreensWrapper>
      <ScrollView>
        <View style={styles.container}>
          <Pressable style={({ pressed }) => [pressed && styles.pressed]}>
            <Text style={styles.editText}>تعديل</Text>
          </Pressable>
          <View style={styles.imageContainer}>
            <Image source={require("../assets/ProfilePic/profile.png")} />
          </View>
          <View style={styles.infoContainer}>
            <InfoField header="الاسم" info="جورج جيهام وليم" />
            <InfoField
              header="البريد الالكتروني"
              info="George25geham@gmail.com"
            />
            <InfoField header="التليفون" info="01210268324" />
            <InfoField header="تاريخ الميلاد" info="15/7/2001" />
          </View>
          <QuickAccess icon="favourite" title="المفضلة" />
          <QuickAccess icon="questions" title="اسئلتي" />
          <QuickAccess icon="schedule" title="مواعيدي" />
          <QuickAccess icon="search" title="البحث عن محامي" />
          <QuickAccess icon="conditions" title="الشروط و الاحكام" />
          <QuickAccess icon="Exit" title="الخروج" />
        </View>
      </ScrollView>
    </ScreensWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginInline: 30,
  },
  pressed: {
    opacity: 0.3,
  },
  editText: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.mainColor,
  },
  imageContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    borderBottomColor: Colors.SecondaryColor,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginVertical: 10,
  },
});
