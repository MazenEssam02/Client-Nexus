import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import ScreensWrapper from "../ScreensWrapper/ScreensWrapper";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import ProfilePicturePicker from "../../components/ProfilePicturePicker/ProfilePicturePicker";
import { useAuthStore } from "../../store/auth";
import InfoArea from "../../components/InfoProfile/InfoArea";
import QuickAccess from "../../components/QuickAccessProfile/QuickAccess";

export default function LawyerProfileScreen() {
  const { user } = useAuthStore();

  return (
    <ScreensWrapper>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.optionContainer}>
              <Pressable
                style={({ pressed }) => [pressed && styles.pressed]}
                onPress={() => console.log("Edit Profile")}
              >
                <Text style={styles.editText}>تعديل</Text>
              </Pressable>
            </View>
            <ProfilePicturePicker
              editable={false}
              onImageChange={() => {}}
              currentImage={user.mainImage}
            />
            <View>
              <View style={styles.DataContainer}>
                <Text style={styles.title}>الاسم</Text>
                <Text style={styles.info}>
                  {user.firstName} {user.lastName}
                </Text>
              </View>
              <View style={styles.DataContainer}>
                <Text style={styles.title}>البريد الالكترونى</Text>
                <Text style={styles.info}>{user.email}</Text>
              </View>
              <View style={styles.DataContainer}>
                <Text style={styles.title}>التليفون</Text>
                <Text style={styles.info}>{user.phoneNumber}</Text>
              </View>
              <View style={styles.DataContainer}>
                <Text style={styles.title}>تاريخ الميلاد</Text>
                <Text style={styles.info}>{user.birthDate}</Text>
              </View>
            </View>
            <QuickAccess icon="Exit" title="الخروج" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreensWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginInline: 30,
  },
  keyboardContainer: {
    flex: 1,
    minHeight: "100%",
  },
  pressed: {
    opacity: 0.3,
  },
  optionContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 40,
    minHeight: "100%",
  },
  DataContainer: {
    marginVertical: 7,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: font.subtitle.fontFamily,
    fontSize: font.subtitle.fontSize,
    borderBottomWidth: 1,
    borderBottomColor: Colors.SecondaryColor,
    color: Colors.SecondaryColor,
  },
  info: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.mainColor,
  },
});
