import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../constants/Color";
import NotificationItem from "../components/NotificationItem/NotificationItem";
// import notifications from "../api-mock/notifications.json";
import { useQuery } from "@tanstack/react-query";
import { Notifications } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import IsError from "../components/IsError/IsError";
import { font } from "../constants/Font";
export default function NotificationScreen() {
  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: Notifications.getAll,
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <IsError error={error} />;
  }
  return (
    <View style={styles.container}>
      {notifications?.data.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notifications.data}
          keyExtractor={(item) => item.notification_id}
          renderItem={({ item }) => (
            <NotificationItem
              title={item.title}
              text={item.content}
              date={item.date}
            />
          )}
        />
      ) : (
        <View style={styles.unavaliableTextContainer}>
          <Text style={styles.unavaliableText}>لا يوجد تنبيهات</Text>
        </View>
      )}
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
  unavaliableTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  unavaliableText: {
    color: Colors.SecondaryColor,
    ...font.headline,
    width: "100%",
    // marginVertical: 10,
    textAlign: "center",
  },
});
