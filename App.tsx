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
import NotificationScreen from "./screens/NotificationScreen";
import SearchScreen from "./screens/SearchScreen";
import SearchResultScreen from "./screens/SearchResultScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function HomeStack() {
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
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "اختر التخصص" }}
        />
        <Stack.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{ title: "نتائج البحث" }}
      />
    </Stack.Navigator>
  );
}
function UserTabs() {
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="HomeStack"
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
        name="HomeStack"
        component={HomeStack}
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
        contentStyle: { backgroundColor: "#282c34" },
      }}
    >
      <Stack.Screen
        name="UserTabs"
        component={UserTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ title: "التنبيهات" }}
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
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AuthenticatedStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
