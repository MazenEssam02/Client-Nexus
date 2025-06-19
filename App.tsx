import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text } from "react-native";
import { Colors } from "./constants/Color";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import { font, useLoadFonts } from "./constants/Font";
import NotificationScreen from "./screens/NotificationScreen";
import SearchScreen from "./screens/SearchScreen";
import SearchResultScreen from "./screens/SearchResultScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore } from "./store/auth";
import LoginScreen from "./screens/LoginScreen";
import ArticlesScreen from "./screens/ArticlesScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { ForgotPasswordScreen } from "./screens/PasswordReset/ForgotPasswordScreen";
import { OtpCodeEntryScreen } from "./screens/PasswordReset/OtpCodeEntryScreen";
import { NewPasswordScreen } from "./screens/PasswordReset/NewPasswordScreen";
import EmergencyScreens from "./screens/EmergencyScreens";
import FavouriteScreen from "./screens/FavouriteScreen";
import Questions from "./screens/Questions";
import QuestionForm from "./screens/QuestionForm";
import MyQuestion from "./screens/MyQuestion";
import QuestionDetails from "./screens/QuestionDetails";
import LawyerDetailsScreen from "./screens/LawyerDetailsScreen";
import WebViewScreen from "./screens/WebView";
import LawyerRatingsScreen from "./screens/LawyerRatingScreen";
import LawyerQAScreen from "./screens/LawyerQAScreen";
import ChatBotScreen from "./screens/ChatBotScreen";
import AdminScreen from "./screens/AdminPanel/AdminScreen";
import ApplicationsScreen from "./screens/AdminPanel/ApplicationsScreen";
import LawyerRequestScreen from "./screens/AdminPanel/LawyerRequestScreen";
import ReportListScreen from "./screens/AdminPanel/ReportListScreen";
import ReportDetailsScreen from "./screens/AdminPanel/ReportDetailScreen";
import PaymentHistoryScreen from "./screens/PaymentHistoryScreen";
import Article from "./screens/AdminPanel/Article";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import LawyerRegisterScreen from "./screens/LawyerRegisterScreen";
import BookingScreen from "./screens/BookingScreen";
import * as Notifications from "expo-notifications";
import EmergencyScheduleScreen from "./screens/EmergencyScheduleScreen";
import LawyerDashboard from "./screens/LawyerScreens/LawyerDashboard";
import QuestionsList from "./screens/LawyerScreens/QuestionsList";
import QuestionResponseScreen from "./screens/LawyerScreens/QuestionResponseScreen";
import QuestionsListPrev from "./screens/LawyerScreens/QuestionsListPrev";
import LawyerProfileScreen from "./screens/LawyerScreens/ProfileScreen";
import EmergencyRequests from "./screens/LawyerScreens/EmergencyRequests";
import LawyerScheduleScreen from "./screens/LawyerScreens/LawyerScheduleScreen";

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

SplashScreen.preventAutoHideAsync().catch(console.warn);
function ScheduleStack() {
  return (
    <TopTab.Navigator
      id={undefined}
      initialRouteName="MainSchedule"
      screenOptions={() => ({
        tabBarStyle: { backgroundColor: Colors.mainColor },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white" },
        tabBarLabelStyle: [font.Caption],
      })}
    >
      <TopTab.Screen
        name="EmergencySchedule"
        component={EmergencyScheduleScreen}
        options={{ title: "الطلبات العاجلة" }}
      />
      <TopTab.Screen
        name="MainSchedule"
        component={ScheduleScreen}
        options={{ title: "مواعيدى" }}
      />
    </TopTab.Navigator>
  );
}
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
      {/*<Stack.Screen
        name="Admin"
        component={AdminScreen}
        options={{ title: "صفحة المتحكم" }}
      />
      <Stack.Screen
        name="Applications"
        component={ApplicationsScreen}
        options={{ title: "طلبات الانضمام" }}
      />
      <Stack.Screen
        name="Application Details"
        component={LawyerRequestScreen}
        options={{ title: "طلب انضمام" }}
      />
      <Stack.Screen
        name="Report List"
        component={ReportListScreen}
        options={{ title: "البلاغات" }}
      />
      <Stack.Screen
        name="Report Detail"
        component={ReportDetailsScreen}
        options={{ title: "تفاصيل البلاغ" }}
      />
      <Stack.Screen
        name="Article"
        component={Article}
        options={{ title: "التحكم في المقالات" }}
      /> */}
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
      <Stack.Screen
        name="LawyerDetails"
        component={LawyerDetailsScreen}
        options={{ title: "تفاصيل المحامى" }}
      />
      <Stack.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={({ navigation }) => ({
          title: "ادخل بياناتك",
          presentation: "modal",
          headerLeft: () => (
            <Ionicons
              name="close-outline"
              size={30}
              color="white"
              onPress={navigation.goBack}
            />
          ),
        })}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={({ navigation }) => ({
          title: "اكمل عملية الدفع",
          presentation: "modal",
          headerLeft: () => (
            <Ionicons
              name="close-outline"
              size={30}
              color="white"
              onPress={navigation.goBack}
            />
          ),
        })}
      />
      <Stack.Screen
        name="LawyerRatingScreen"
        component={LawyerRatingsScreen}
        options={({ navigation }) => ({
          title: "تقييمات الزائريين",
          presentation: "modal",
          headerLeft: () => (
            <Ionicons
              name="close-outline"
              size={30}
              color="white"
              onPress={navigation.goBack}
            />
          ),
        })}
      />
      <Stack.Screen
        name="LawyerQAScreen"
        component={LawyerQAScreen}
        options={({ navigation }) => ({
          title: "اسئلة و اجابات المحامى",
          presentation: "modal",
          headerLeft: () => (
            <Ionicons
              name="close-outline"
              size={30}
              color="white"
              onPress={navigation.goBack}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
function UserQuickAccess() {
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
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{ title: "التفضيلات" }}
      />
      <Stack.Screen
        name="Questions"
        component={Questions}
        options={{
          title: "اسئلة و اجابات",
        }}
      />
      <Stack.Screen
        name="QuestionForm"
        component={QuestionForm}
        options={{ title: "اسأل محامي" }}
      />

      <Stack.Screen
        name="MyQuestion"
        component={MyQuestion}
        options={{ title: "اسئلتي" }}
      />
      <Stack.Screen
        name="QuestionDetails"
        component={QuestionDetails}
        options={{ title: "تفاصيل السؤال" }}
      />
      <Stack.Screen
        name="Payment History"
        component={PaymentHistoryScreen}
        options={{ title: "معاملاتي" }}
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
        name="QuickAccess"
        component={UserQuickAccess}
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
        component={ScheduleStack}
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
function AuthenticatedStackClient() {
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
        name="Articles"
        component={ArticlesScreen}
        options={{ title: "المقالات" }}
      />

      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ title: "التنبيهات" }}
      />
      <Stack.Screen
        name="ChatBotScreen"
        component={ChatBotScreen}
        options={{ title: "CLIENT NEXUS BOT" }}
      />
      <Stack.Screen
        name="EmergencyLawyer"
        component={EmergencyScreens}
        options={{
          title: "محامى عاجل",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
function LawyerScheduleStack() {
  return (
    <TopTab.Navigator
      id={undefined}
      initialRouteName="MainSchedule"
      screenOptions={() => ({
        tabBarStyle: { backgroundColor: Colors.mainColor },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white" },
        tabBarLabelStyle: [font.Caption],
      })}
    >
      <TopTab.Screen
        name="EmergencySchedule"
        component={EmergencyScheduleScreen}
        options={{ title: "الطلبات العاجلة" }}
      />
      <TopTab.Screen
        name="MainSchedule"
        component={LawyerScheduleScreen}
        options={{ title: "مواعيدى" }}
      />
    </TopTab.Navigator>
  );
}
function LawyerTabs() {
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="LawyerDashboard"
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
        name="LawyerProfileScreen"
        component={LawyerProfileScreen}
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
        component={LawyerScheduleStack}
        options={{
          title: "مواعيدى",
          tabBarLabel: "مواعيدى",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LawyerDashboard"
        component={LawyerDashboard}
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
function AuthenticatedStackLawyer() {
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
        name="LawyerTabs"
        component={LawyerTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LawyerQA"
        component={QuestionsList}
        options={{ title: "الاسئلة القانونية" }}
      />
      <Stack.Screen
        name="LawyerQAPrev"
        component={QuestionsListPrev}
        options={{ title: "الاسئلة القانونية" }}
      />
      <Stack.Screen
        name="LawyerQAResponse"
        component={QuestionResponseScreen}
      />
      <Stack.Screen
        name="EmergencyRequests"
        component={EmergencyRequests}
        options={{ title: "الطلبات العاجلة" }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ title: "التنبيهات" }}
      />
      <Stack.Screen
        name="LawyerRatingScreen"
        component={LawyerRatingsScreen}
        options={({ navigation }) => ({
          title: "تقييمات الزائريين",
          presentation: "modal",
          headerLeft: () => (
            <Ionicons
              name="close-outline"
              size={30}
              color="white"
              onPress={navigation.goBack}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
function UnAuthenticatedStack() {
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
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterLawyer"
        component={LawyerRegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpCodeEntry"
        component={OtpCodeEntryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
export default function App() {
  const { isInitialized, user } = useAuthStore();
  const fontsLoaded = useLoadFonts();
  const isAppReady = fontsLoaded && isInitialized;
  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);
  if (!isAppReady) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <NavigationContainer>
          {user ? (
            user.type === "client" ? (
              <AuthenticatedStackClient />
            ) : (
              <AuthenticatedStackLawyer />
            )
          ) : (
            <UnAuthenticatedStack />
          )}
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
