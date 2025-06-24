import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

const AdminScreen = ({ navigation }) => {
  const data = [
    { id: 1, title: "طلبات انضمام المحامين", notifications: 0, icon: "🔔" },
    { id: 2, title: "البلاغات المتواجدة", notifications: 0, icon: "📢" },
    { id: 3, title: "تعديل المقالات", notifications: 0, icon: "📝" },
  ];
  function navigationHandler(id) {
    if (id === 1) navigation.navigate("Applications" as never);
    if (id === 2) navigation.navigate("Report List" as never);
    if (id === 3) navigation.navigate("Article" as never);
  }
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => navigationHandler(item.id)}
        >
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.title}>{item.title}</Text>
          {item.notifications > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.notifications}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: Colors.mainColor,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
    elevation: 5, // for shadow on Android
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    position: "relative",
  },
  icon: {
    fontSize: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: font.headline.fontSize,
    color: "#fff",
    fontFamily: font.headline.fontFamily,
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#FF4D4D",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
