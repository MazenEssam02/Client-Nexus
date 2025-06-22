import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import EmergencyForm from "./EmergencyScreens/EmergencyForm";
import EmergencyRequests from "./EmergencyScreens/EmergencyRequests";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import EmergencyLawyerDetails from "./EmergencyLawyerDetails";
import { Pressable } from "react-native";
const Stack = createStackNavigator();
export default function EmergencyScreens({ navigation }) {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        // headerBackButtonMenuEnabled: false,
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
          gestureEnabled: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons
                style={{ marginLeft: 10 }}
                name="close-outline"
                size={30}
                color="white"
              />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen
        name="Requests"
        component={EmergencyRequests}
        options={{
          title: "اختر محامى",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="EmergencyDetails"
        component={EmergencyLawyerDetails}
        options={{
          title: "تفاصيل الطلب",
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
