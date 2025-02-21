import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import ScreensWrapper from "./ScreensWrapper/ScreensWrapper";
import InfoArea from "../components/InfoProfile/InfoArea";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { useState } from "react";
import QuickAccessArea from "../components/QuickAccessProfile/QuickAccessArea";
export default function ProfileScreen() {
  const [editable, setEditable] = useState(false);
  function editableHandler() {
    setEditable((editable) => !editable);
  }
  return (
    <ScreensWrapper>
      <ScrollView>
        <View style={styles.container}>
          <Pressable
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={editableHandler}
          >
            <Text style={styles.editText}>{editable ? "حفظ" : "تعديل"}</Text>
          </Pressable>
          <View style={styles.imageContainer}>
            <Image source={require("../assets/ProfilePic/profile.png")} />
          </View>
          <InfoArea editable={editable} />
          <QuickAccessArea editable={editable} />
        </View>
      </ScrollView>
    </ScreensWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginInline: 30,
  },
  pressed: {
    opacity: 0.3,
  },
  editText: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.mainColor,
  },
  imageContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
