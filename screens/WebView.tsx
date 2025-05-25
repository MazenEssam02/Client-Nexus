import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { Colors } from "../constants/Color";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Client, Payment } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function WebViewScreen({ navigation, route }) {
  const { lawyer, amount } = route.params;
  // const [showWebView, setShowWebView] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState({
    clientSecret: "",
    publicKey: "",
  });

  const {
    data: ClientData,
    isLoading: isGetLoading,
    isError: isGetError,
    error: getError,
  } = useQuery({
    queryKey: ["Client"],
    queryFn: Client.get,
  });

  const { mutate: payService } = useMutation({
    mutationFn: Payment.sevricePayment,
    onMutate: () => setIsSubmitting(true),
    onSuccess: (data) => {
      // console.log(data.data);
      setPaymentResponse({
        clientSecret: data.data.clientSecret,
        publicKey: data.data.publicKey,
      });
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
