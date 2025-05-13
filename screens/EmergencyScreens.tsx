import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import EmergencyForm from "./EmergencyScreens/EmergencyForm";
import EmergencyRequests from "./EmergencyScreens/EmergencyRequests";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import EmergencyLawyerDetails from "./EmergencyLawyerDetails";
const Stack = createNativeStackNavigator();
export default function EmergencyScreens({ navigation }) {
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
          gestureEnabled: false,
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              style={{ marginLeft: -10 }}
              size={30}
              color="white"
              onPress={() => {
                navigation.goBack();
              }}
            />
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
          title: "تفاصيل المحامى",
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
