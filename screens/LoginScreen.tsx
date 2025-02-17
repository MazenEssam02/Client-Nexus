import { Button, StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../store/Auth";

export default function LoginScreen() {
  const { login } = useAuthStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>
      {/* add button to login */}
      <Button
        title="تسجيل الدخول"
        onPress={() => {
          login({
            name: "Ahmed",
            email: "",
            type: "user",
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
});