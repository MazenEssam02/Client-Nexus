import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import { Colors } from "../constants/Color";
import NotificationItem from "../components/NotificationItem/NotificationItem";
// import notifications from "../api-mock/notifications.json";
import { useQuery } from "@tanstack/react-query";
import { Notifications } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import IsError from "../components/IsError/IsError";
import { font } from "../constants/Font";
import { useCallback, useState } from "react";
export default function NotificationScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: notifications,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: Notifications.getAll,
  });
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationItem
              title={item.title}
              text={item.body}
              date={item.createdAt}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.mainColor]} // Android
              tintColor={Colors.mainColor}
            />
          }
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
