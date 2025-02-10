import { StyleSheet, Pressable, Image } from "react-native";
import { Colors } from "../../constants/Color";

export default function ChatBotIcon() {
  return (
    <Pressable style={styles.container} onPress={() => {}}>
      <Image source={require("../../assets/icons/Icon_ChatBot.png")} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    height: 50,
    width: 50,
    backgroundColor: Colors.SecondaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
});
