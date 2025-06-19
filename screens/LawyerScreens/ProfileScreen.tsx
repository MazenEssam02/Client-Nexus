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
import { MainButton } from "../../components/Buttons/MainButton";
import { Payment } from "../../API/https";
import { useState } from "react";

export default function LawyerProfileScreen({ navigation }) {
  const { user, setIsSubscribed } = useAuthStore();
  const [loadingSubscription, setLoadingSubscription] = useState(false);

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
                onPress={() => navigation.navigate("Edit")}
              >
                <Text style={styles.editText}>تعديل</Text>
              </Pressable>
            </View>
            <ProfilePicturePicker
              editable={false}
              onImageChange={() => {}}
              currentImage={user.mainImage}
            />
            <View style={{ marginVertical: 10 }}>
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
                <Text style={styles.info}>
                  {user.phoneNumber || "01093922530"}
                </Text>
              </View>
              <View style={styles.DataContainer}>
                <Text style={styles.title}>تاريخ الميلاد</Text>
                <Text style={styles.info}>
                  {user.birthDate || "01/01/2000"}
                </Text>
              </View>
            </View>
            {/* join subscription button */}
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <View style={styles.DataContainer}>
                <Text style={styles.title}>الاشتراك</Text>
                <Text style={styles.info}>
                  {user.isSubscribed ? "مشترك" : "غير مشترك"}
                </Text>
              </View>
              <View style={{ width: "40%", height: 35 }}>
                <MainButton
                  title={user.isSubscribed ? "الغاء الاشتراك" : "الاشتراك"}
                  loading={loadingSubscription}
                  onPress={async () => {
                    if (!user.isSubscribed) {
                      setLoadingSubscription(true);
                      try {
                        const payRes = await Payment.subscription({
                          serviceProviderId: user.id,
                          email: user.email,
                          phone: "01093922530",
                          firstName: user.firstName,
                          lastName: user.lastName,
                          subscriptionTier: "Normal",
                          subscriptionType: "Monthly",
                        });
                        navigation.navigate("SubscriptionWebView", {
                          url: `https://accept.paymob.com/unifiedcheckout/?publicKey=${payRes.data.publicKey}&clientSecret=${payRes.data.clientSecret}`,
                        });
                      } catch (error) {
                        Alert.alert(
                          "خطأ",
                          "حدث خطأ أثناء الاشتراك. حاول مرة أخرى."
                        );
                      }
                      setLoadingSubscription(false);
                    } else {
                      Alert.alert(
                        "الغاء الاشتراك",
                        "هل أنت متأكد أنك تريد إلغاء الاشتراك؟",
                        [
                          {
                            text: "إلغاء",
                            style: "cancel",
                          },
                          {
                            text: "نعم",
                            onPress: async () => {
                              setIsSubscribed(false);
                            },
                          },
                        ]
                      );
                    }
                  }}
                />
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
