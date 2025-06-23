import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or use any icon library
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useQuery } from "@tanstack/react-query";
import { ServiceProvider } from "../../API/https";
type Application = {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  description: string;
  gender: 70 | 77;
  imageIDUrl: string;
  addresses: [{any}];
  
};
const ApplicationsScreen = ({ navigation }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const {
    data: Applications,
    isLoading: isGetLoading,
    isError: isGetError,
    error: getError,
  } = useQuery({
    queryKey: ["Applications"],
    queryFn: ServiceProvider.getApplications,
  });
  useEffect(() => {
    if (Applications?.data) {
      console.log(Applications.data.data);
      Applications.data.data.map(Application => setApplications(prev=> [...prev , {id : Application.id , name: `${Application.firstName} ${Application.}`}]));
    }
  }, [applications]);
  const requests = [
    { id: "1", name: "عبدالكريم محمود" },
    { id: "2", name: "عبدالكريم محمود" },
    { id: "3", name: "عبدالكريم محمود" },
  ];

  const renderRequest = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("Application Details", { requestId: item.id });
      }}
    >
      <Text style={styles.name}>طلب من: {item.name}</Text>
      <Ionicons name="chevron-forward" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequest}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ApplicationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
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
