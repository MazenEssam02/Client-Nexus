import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { Colors } from "../constants/Color";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Appointments, Client, Payment } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useAuthStore } from "../store/auth";

export default function SubscriptionWebView({ navigation, route }) {
  const { url } = route.params;
  const { setIsSubscribed } = useAuthStore();
  const [referenceKey, setReferenceKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState({
    clientSecret: "",
    publicKey: "",
  });
  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    if (url.includes("google.com")) {
      setIsSubscribed(true);
      navigation.goBack();
    }
    if (url.includes("payment_failed")) {
      // Handle failure
      navigation.goBack();
    }
  };

  const {
    data: ClientData,
    isLoading: isGetLoading,
    isError: isGetError,
    error: getError,
  } = useQuery({
    queryKey: ["Client"],
    queryFn: Client.get,
  });
  const { mutate: bookAppointment, reset: resetBookMutation } = useMutation({
    mutationFn: Appointments.bookAppointment,
    onSuccess: () => {
      resetBookMutation();
      // refetch();
      console.log(referenceKey);
      console.log("Hello");
      // if (statusData.data?.status === "APPROVED") {
      navigation.goBack();
      Alert.alert(
        "نجحت العملية",
        "تم حجز الموعد بنجاح!",
        [
          {
            text: "العودة إلى الصفحة الرئيسية",
            onPress: () => {
              resetBookMutation();
              navigation.popToTop();
            },
          },
        ],
        { cancelable: false }
      );
      // }
    },
    onError: (err) => {
      Alert.alert("خطأ", "برجاء المحاولة مره اخري.");
      console.error("book error 2:", err);
    },
  });

  const showLoading = isGetLoading || isSubmitting;
  if (showLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: url.includes("http") ? url : `https://${url}`,
        }}
        style={styles.webview}
        renderLoading={() => <LoadingSpinner />}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url.includes("exit")) {
            navigation.goBack();
            return false;
          }
          return true;
        }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  webview: {
    flex: 1,
    marginTop: "-20%",
  },
});
