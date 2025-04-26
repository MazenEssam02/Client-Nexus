import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Color";
import { Calendar } from "react-native-calendars";

export default function WebViewScreen() {
  // const [showWebView, setShowWebView] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Calendar
        current={"2025-04-21"}
        hideArrows={true}
        hideDayNames={false}
        disableMonthChange={true}
        theme={{
          textSectionTitleColor: "#000",
          dayTextColor: "#000",
          textDisabledColor: "#d9d9d9",
        }}
      />
      {/* <StatusBar style="light" />
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
      /> */}
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
