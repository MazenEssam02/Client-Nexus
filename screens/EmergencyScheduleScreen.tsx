import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { useQuery } from "@tanstack/react-query";
import { EmeregencyCases } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import EmergencyScheduleCard from "../components/EmergencyLawyerCards/EmergencyScheduleCard";
export default function EmergencyScheduleScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: EmergencyAppointments,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["EmergencyAppointments"],
    queryFn: EmeregencyCases.getEmergencies,
  });
  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //   }, [refetch])
  // );
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {EmergencyAppointments.data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            لا توجد طلبات في حسابك {"\n"}يمكنك البدء بحجز طلبات من صفحة الطلبات
            العاجلة
          </Text>
        </View>
      ) : (
        <FlatList
          data={EmergencyAppointments.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EmergencyScheduleCard
              EmergencyData={item}
              navigation={navigation}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: font.headline.fontSize,
    fontFamily: font.headline.fontFamily,
    color: Colors.SecondaryColor,
    lineHeight: 28,
  },
  list: {
    padding: 10,
  },
});
