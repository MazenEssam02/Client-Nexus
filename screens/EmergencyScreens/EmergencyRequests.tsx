import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import Requests from "../../api-mock/requests.json";
import EmergencyCard from "../../components/EmergencyLawyer Card/EmergencyCard";
export default function EmergencyRequests() {
  return (
    <View style={styles.container}>
      {Requests.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EmergencyCard lawyer={item} />}
        />
      ) : (
        <Text style={styles.waitText}>فى انتظار قبول محامى للطلب ........</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,

    justifyContent: "center",
  },
  waitText: {
    ...font.headline,
    textAlign: "center",
  },
});
