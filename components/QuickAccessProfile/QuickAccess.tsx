import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import { quickAccessIcons } from "../../constants/imageRequires";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useEffect, useState } from "react";
const QuickAccess = ({ icon, title }) => {
  const [exitHandler, setExitHandler] = useState(false);
  useEffect(() => {
    if (icon === "Exit") {
      setExitHandler(true);
    }
  }, [icon]);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.border,
        pressed && styles.pressed,
        exitHandler && styles.exitBorder,
      ]}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={quickAccessIcons[icon]} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={exitHandler ? styles.exitTitle : styles.title}>
            {title}
          </Text>
          <Image
            source={
              exitHandler
                ? require("../../assets/icons/exit_arrow.png")
                : require("../../assets/icons/Icon_Arrow.png")
            }
            style={{ margin: 0, padding: 0, width: 10 }}
          />
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  border: {
    marginBlock: 7,
    borderWidth: 1,
    borderColor: Colors.SecondaryColorLight,
    borderRadius: 8,
  },
  exitBorder: {
    borderColor: Colors.invalidColor200,
  },
  pressed: {
    backgroundColor: Colors.mainColor,
  },
  container: {
    padding: 7,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  imageContainer: {
    marginLeft: 5,
    minHeight: 15,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginInline: 5,
  },
  title: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.SecondaryColor,
  },
  exitTitle: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.invalidColor200,
  },
});
export default QuickAccess;
