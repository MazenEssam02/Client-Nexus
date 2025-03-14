import { StyleSheet, View, Text, FlatList, Alert } from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import EmergencyForm from "./EmergencyScreens/EmergencyForm";
import EmergencyRequests from "./EmergencyScreens/EmergencyRequests";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
export default function EmergencyScreens({ navigation }) {
  const handleBack = () => {
    Alert.alert(
      "الرجوع",
      "هل انت متأكد انك تريد الرجوع و الغاء الطلب",
      [
        {
          text: "الغاء",
          onPress: () => navigation.goBack(),
          style: "destructive",
        },
        {
          text: "البقاء",

          style: "cancel",
        },
      ],
      { cancelable: true, userInterfaceStyle: "light" }
    );
  };

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerBackButtonMenuEnabled: false,
        headerBackButtonDisplayMode: "minimal",
        headerStyle: { backgroundColor: Colors.mainColor },
        headerTitleStyle: font.headline,
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Form"
        component={EmergencyForm}
        options={{
          title: "محامى عاجل",
        }}
      />
      <Stack.Screen
        name="Requests"
        component={EmergencyRequests}
        options={{
          title: "اختر محامى",
          headerLeft: () => (
            <Ionicons
              name="close-outline"
              size={30}
              color="white"
              onPress={handleBack}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
