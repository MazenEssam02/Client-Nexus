import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Color";
export default function WebViewScreen() {
  // const [showWebView, setShowWebView] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <WebView
        source={{ uri: "https://example.com" }}
        style={styles.webview}
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
    // marginTop: 20,
  },
});
