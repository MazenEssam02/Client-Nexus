// define types for react-native navigation routes

interface HomeStackParams {
  Home: undefined;
  Search: undefined;
  SearchResult: undefined;
}

interface UserTabsParams {
  HomeStack: undefined;
  Profile: undefined;
  Schedule: undefined;
  Notifications: undefined;
}

interface AuthStackParams {
  Login: undefined;
  Register: undefined;
}

type AuthNavigationType = StackNavigationProp<AuthStackParams>;