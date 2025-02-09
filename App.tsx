import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Test from "./components/Test1";
import { Colors } from "./constants/Color";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import { font } from "./constants/Font";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpenseTrackerTabs() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={() => ({
        headerStyle: { backgroundColor: Colors.mainColor },
        headerTitleStyle: font.headline,
        headerTitleAlign: "center",
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: Colors.mainColor,
        tabBarInactiveTintColor: Colors.SecondaryColor,
        tabBarLabelStyle: [font.Caption],
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "الرئيسية",
          tabBarLabel: "الرئيسية",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          title: "معاملاتى",
          tabBarLabel: "معاملاتى",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: "حسابى",
          tabBarLabel: "حسابى",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <ExpenseTrackerTabs />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
