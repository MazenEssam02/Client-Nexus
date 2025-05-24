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
import ScreensWrapper from "./ScreensWrapper/ScreensWrapper";
import InfoArea from "../components/InfoProfile/InfoArea";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Client } from "../API/https";
import QuickAccessArea from "../components/QuickAccessProfile/QuickAccessArea";
import ProfilePicturePicker from "../components/ProfilePicturePicker/ProfilePicturePicker";
import IsError from "../components/IsError/IsError";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useAuthStore } from "../store/auth";
export default function ProfileScreen() {
  const login = useAuthStore((state) => state.login);
  const [editable, setEditable] = useState(false);
  const [originalInfo, setOriginalInfo] = useState(null);
  const [originalImageUri, setOriginalImageUri] = useState(null);
  const [currentImageUri, setCurrentImageUri] = useState(null);

  const [info, setInfo] = useState<{
    name: { value: string; header?: string };
    email: { value: string; header?: string };
    mobile: { value: string; header?: string };
    birthday: { value: string; header?: string };
    password: { value: string; header?: string };
  }>({
    name: { value: "" },
    email: { value: "" },
    mobile: { value: "" },
    birthday: { value: "" },
    password: { value: "" },
  });
  const {
    data: ClientData,
    isLoading: isGetLoading,
    isError: isGetError,
    error: getError,
    refetch: refetchClientData,
  } = useQuery({
    queryKey: ["Client"],
    queryFn: Client.get,
  });
  const {
    mutate: updateClient,
    isError: isUpdateError,
    error: updateError,
    reset: resetUpdateMutation,
  } = useMutation({
    mutationFn: Client.update,
    onError: (err) => {
      Alert.alert("خطأ", "برجاء المحاولة مره اخري.");
      console.error("Update error:", err);
    },
  });
  useEffect(() => {
    if (ClientData?.data) {
      console.log(ClientData.data);
      setInfo({
        name: {
          header: "الاسم",
          value: `${ClientData.data.data.firstName || ""} ${
            ClientData.data.data.lastName || ""
          }`,
        },
        email: {
          header: "البريد الالكتروني",
          value: `${ClientData.data.data.email}` || "",
        },
        mobile: {
          header: "التليفون",
          value: `${ClientData.data.data.phoneNumber}` || "",
        },
        birthday: {
          header: "تاريخ الميلاد",
          value: `${ClientData.data.data.birthDate}` || "",
        },
        password: { header: "كلمة السر", value: "" },
      });
    } else if (ClientData) {
      console.log(ClientData);
    }
  }, [ClientData]);
  function editableHandler() {
    setEditable((prevEditable) => {
      if (!prevEditable) {
        setOriginalInfo(info);
        setOriginalImageUri(currentImageUri);
      }
      return !prevEditable;
    });
  }

  function exitEditing() {
    setEditable(false);
    if (originalInfo) {
      setInfo(originalInfo);
      setOriginalInfo(null);
    }
    if (originalImageUri) {
      setCurrentImageUri(originalImageUri);
      setOriginalImageUri(null);
    }
  }
  function saveChanges() {
    if (info) {
      const newPasswordValue = info.password.value || "123456789";

      if (newPasswordValue) {
        const clientDataToSend = {
          email: info.email.value,
          firstName: info.name.value.split(" ")[0] || "",
          lastName: info.name.value.split(" ")[1] || "",
          birthDate: info.birthday.value,
          phoneNumber: info.mobile.value,
          newPassword: newPasswordValue,
        };

        updateClient(
          { ...clientDataToSend },
          {
            onSuccess: () => {
              Alert.alert("نجحت العملية", "تم تحديث كلمة السر بنجاح!.");
              setEditable(false);
              setOriginalInfo(null);
              setOriginalImageUri(null);
              resetUpdateMutation();

              // Re-login with the new password
              login({ email: info.email.value, password: newPasswordValue });
            },
            onError: (err) => {
              Alert.alert(
                "خطأ",
                "برجاء المحاولة مره اخري عند تحديث كلمة السر."
              );
              console.error("Update password error:", err);
            },
          }
        );
      } else {
        const clientDataToSend = {
          email: info.email.value,
          firstName: info.name.value.split(" ")[0] || "",
          lastName: info.name.value.split(" ")[1] || "",
          birthDate: info.birthday.value,
          phoneNumber: info.mobile.value,
          newPassword: newPasswordValue,
        };
        updateClient(
          { ...clientDataToSend },
          {
            onSuccess: () => {
              Alert.alert("نجحت العملية", "تم تحديث البيانات بنجاح!");
              setEditable(false);
              setOriginalInfo(null);
              setOriginalImageUri(null);
              refetchClientData().then(() => {});
              resetUpdateMutation();
            },
            onError: (err) => {
              Alert.alert("خطأ", "برجاء المحاولة مره اخري عند تحديث البيانات.");
              console.error("Update data error:", err);
            },
          }
        );
      }
    }
  }
  if (isGetLoading) {
    return <LoadingSpinner />;
  }
  if (isGetError || isUpdateError) {
    return <IsError error={getError || updateError} />;
  }

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
              {editable ? (
                <>
                  <Pressable
                    style={({ pressed }) => [pressed && styles.pressed]}
                    onPress={saveChanges}
                  >
                    <Text style={styles.editText}>حفظ</Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [pressed && styles.pressed]}
                    onPress={exitEditing}
                  >
                    <Text style={styles.editText}>إلغاء</Text>
                  </Pressable>
                </>
              ) : (
                <Pressable
                  style={({ pressed }) => [pressed && styles.pressed]}
                  onPress={editableHandler}
                >
                  <Text style={styles.editText}>تعديل</Text>
                </Pressable>
              )}
            </View>
            <ProfilePicturePicker
              editable={editable}
              onImageChange={setCurrentImageUri}
              currentImage={currentImageUri}
            />
            <InfoArea editable={editable} info={info} onChange={setInfo} />
            <QuickAccessArea editable={editable} />
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
});
