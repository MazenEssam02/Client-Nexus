import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import EmergencyForm from "./EmergencyScreens/EmergencyForm";
import EmergencyRequests from "./EmergencyScreens/EmergencyRequests";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export default function EmergencyScreens() {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={EmergencyForm}
        options={{ title: "محامى عاجل" }}
      />
      <Stack.Screen
        name="Search"
        component={EmergencyRequests}
        options={{ title: "محامى عاجل" }}
      />
    </Stack.Navigator>
  );
}
