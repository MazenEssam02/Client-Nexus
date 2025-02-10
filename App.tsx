import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, I18nManager } from "react-native";
import { Colors } from "./constants/Color";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import { font, useLoadFonts } from "./constants/Font";
import SearchScreen from "./screens/SearchScreen";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function UserTabs() {
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="Home"
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
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          title: "مواعيدى",
          tabBarLabel: "مواعيدى",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

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
    </Tab.Navigator>
  );
}
function AuthenticatedStack() {
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
        name="UserTabs"
        component={UserTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "اختر التخصص" }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AuthenticatedStack />
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
