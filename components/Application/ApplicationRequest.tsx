import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or use any icon library
import { Colors } from "../../constants/Color";
import { useNavigation } from "@react-navigation/core";
import { font } from "../../constants/Font";
export const ApplicationRequest = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        (navigation as any).navigate("Application Details", {
          requestItem: item,
        });
      }}
    >
      <Text style={styles.name}>
        طلب من: {item.firstName} {item.lastName}
      </Text>
      <Ionicons name="chevron-forward" size={24} color="#fff" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.mainColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  name: {
    fontSize: font.headline.fontSize,
    color: "#FFF",
    fontFamily: font.headline.fontFamily,
  },
});
