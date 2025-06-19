import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { Colors } from "../constants/Color";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Appointments, Client, Payment } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function WebViewScreen({ navigation, route }) {
  const { lawyer, amount, slot } = route.params;
  const [referenceKey, setReferenceKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState({
    clientSecret: "",
    publicKey: "",
  });
  // const { data: statusData, refetch } = useQuery({
  //   queryKey: ["status", referenceKey],
  //   queryFn: () =>
  //     Payment.getStatus({
  //       referenceKey,
  //     }),
  //   enabled: false, // Don't run automatically
  // });
  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    if (url.includes("google.com")) {
      bookAppointment(slot);
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
  const { mutate: payService } = useMutation({
    mutationFn: Payment.sevricePayment,
    onMutate: () => setIsSubmitting(true),
    onSuccess: (data) => {
      console.log(data.data);
      setPaymentResponse({
        clientSecret: data.data.clientSecret,
        publicKey: data.data.publicKey,
      });
      setReferenceKey(data.data.referenceNumber);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setIsSubmitting(false);
      if ("response" in err && (err as any).response?.data) {
        console.error("Full error:", (err as any).response?.data); // Server's validation messages
      } else {
        console.error("Error:", err);
      }
    },
  });
  useEffect(() => {
    if (!ClientData) return;
    payService({
      clientId: 4, //to be edited
      serviceProviderId: lawyer.id,
      serviceName: lawyer.firstName + " " + lawyer.lastName,
      amount: amount,
      email: ClientData.data.data.email,
      firstName: ClientData.data.data.firstName,
      lastName: ClientData.data.data.lastName,
      phone: ClientData.data.data.phoneNumber,
    });
  }, [ClientData]);

  const showLoading = isGetLoading || isSubmitting;
  if (showLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `https://accept.paymob.com/unifiedcheckout/?publicKey=${paymentResponse.publicKey}&clientSecret=${paymentResponse.clientSecret}`,
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
