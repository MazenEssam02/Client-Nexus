import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import NotificationItem from "../components/NotificationItem/NotificationItem";
import notifications from "../api-mock/notifications.json";
export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={(item) => item.notification_id}
        renderItem={({ item }) => (
          <NotificationItem
            title={item.title}
            text={item.content}
            date={item.date}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  titleContainer: {
    height: 48,
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  titleText: {
    color: Colors.SecondaryColor,
    textAlign: "right",
    textAlignVertical: "center",
  },
});
