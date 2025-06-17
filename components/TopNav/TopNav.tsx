import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

interface QuestionsHeaderProps {
  leftText: string;
  rightText: string;
  activeTab: "left" | "right";
  onLeftTabPress?: () => void; // Optional: Add onPress handlers for tabs
  onRightTabPress?: () => void; // Optional: Add onPress handlers for tabs
}

export default function TopNav({
  leftText,
  rightText,
  activeTab,
  onLeftTabPress,
  onRightTabPress,
}: QuestionsHeaderProps) {
  return (
    <View style={styles.containerWrapper}>
      <View style={styles.contentArea}>
        <View style={styles.section}>
          <Text
            style={[styles.text, activeTab === "left" && styles.activeText]}
            onPress={onLeftTabPress} // Add onPress handler
          >
            {leftText}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text
            style={[styles.text, activeTab === "right" && styles.activeText]}
            onPress={onRightTabPress} // Add onPress handler
          >
            {rightText}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.SecondaryColor,
  },
  contentArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mainColor,
    height: 50,
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  text: {
    ...font.title,
    color: "white",
    textAlign: "center",
  },
  activeText: {
    textDecorationLine: "underline",
    textDecorationColor: "white",
  },
  separator: {
    width: 1.5,
    height: "75%",
    backgroundColor: Colors.SecondaryColor,
  },
});
