import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

type MainButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  width?: string;
  height?: string;
};

export const MainButton: React.FC<MainButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        disabled ? [styles.button, styles.disabledButton] : styles.button,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, disabled ? styles.disabledText : null]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.mainColor,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    lineHeight: 28,
    ...font.Button,
  },
  disabledButton: {
    backgroundColor: Colors.gray500 || "#cccccc",
    opacity: 0.6,
  },
  disabledText: {
    color: Colors.SecondaryColor,
  },
});
