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
import InfoUpdate from "../components/InfoProfile/InfoUpdate";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Client } from "../API/https";
import QuickAccessArea from "../components/QuickAccessProfile/QuickAccessArea";
import ProfilePicturePicker from "../components/ProfilePicturePicker/ProfilePicturePicker";
import IsError from "../components/IsError/IsError";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useAuthStore } from "../store/auth";
import useProfileStore from "../store/Profile";
export default function ProfileScreen() {
  const login = useAuthStore((state) => state.login);
  const [editable, setEditable] = useState(false);
  const [originalInfo, setOriginalInfo] = useState(null);
  const [originalImageUri, setOriginalImageUri] = useState(null);
  const [currentImageUri, setCurrentImageUri] = useState(null);
  const resetProfileData = useProfileStore((state) => state.resetProfileData);
  const {
    data: ClientData,
    isLoading: isGetLoading,
    isError: isGetError,
    error: getError,
    refetch: refetchClientData,
  } = useQuery({
    queryKey: ["Client"],
    queryFn: Client.get,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnReconnect: true,
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
      refetchClientData();
    },
  });
  useFocusEffect(
    useCallback(() => {
      if (isGetError) {
        refetchClientData();
      }
    }, [isGetError, refetchClientData])
  );
  useEffect(() => {
    if (ClientData?.data) {
      console.log(ClientData.data);
      const initialData = {
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
      };
      resetProfileData(initialData);
      setCurrentImageUri(ClientData.data.data.mainImage);
      setOriginalInfo(initialData);
    } else if (ClientData) {
      console.log(ClientData);
    }
  }, [ClientData, resetProfileData]);
  function editableHandler() {
    setEditable((prevEditable) => {
      if (!prevEditable) {
        setOriginalInfo(useProfileStore.getState().profileData);
        setOriginalImageUri(currentImageUri);
      }
      return !prevEditable;
    });
  }

  function exitEditing() {
    setEditable(false);
    if (originalInfo) {
      resetProfileData(originalInfo);
      setOriginalInfo(null);
    }
    if (originalImageUri) {
      setCurrentImageUri(originalImageUri);
      setOriginalImageUri(null);
    }
  }
  function saveChanges(formData) {
    console.log("Starting Saving Changes");

    // Create a new FormData object
    const clientFormData = new FormData();

    // Append all regular text fields to formData
    clientFormData.append("email", formData.email);
    clientFormData.append("firstName", formData.name.split(" ")[0] || "");
    clientFormData.append("lastName", formData.name.split(" ")[1] || "");
    clientFormData.append("birthDate", formData.birthday);
    clientFormData.append("phoneNumber", formData.mobile);
    clientFormData.append("newPassword", "string"); // Must be removed y Sara Argoooooki

    // Conditionally add newPassword

    if (currentImageUri) {
      if (currentImageUri.startsWith("file://")) {
        const fileName = currentImageUri.split("/").pop();
        const fileExtension = fileName.split(".").pop().toLowerCase();

        // Map common extensions to MIME types
        const mimeTypeMap = {
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          png: "image/png",
          gif: "image/gif",
          webp: "image/webp",
        };
        const mimeType = mimeTypeMap[fileExtension] || "image/jpeg";
        clientFormData.append("mainImage", {
          uri: currentImageUri,
          name: fileName,
          type: mimeType,
        } as any);
      } else {
        console.log("Same Image");
      }
    }
    console.log(clientFormData);
    updateClient(
      // Pass the FormData object directly
      clientFormData,
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
  if (isGetLoading) {
    return <LoadingSpinner />;
  }
  // if (isGetError || isUpdateError) {
  //   return <IsError error={getError} />;
  // }

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
                <></>
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
            {editable ? (
              <InfoUpdate onCancel={exitEditing} save={saveChanges} />
            ) : (
              <>
                <InfoArea editable={editable} />
                <QuickAccessArea editable={editable} />
              </>
            )}
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
