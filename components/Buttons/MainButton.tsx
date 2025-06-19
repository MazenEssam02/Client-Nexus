import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator, // Added for loading state
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import React from "react";

type MainButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean; // New loading prop
  width?: string; // This prop is not used by the styles, consider removing or using it
  height?: string; // This prop is not used by the styles, consider removing or using it
} & React.ComponentProps<typeof TouchableOpacity>;

export const MainButton: React.FC<MainButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false, // Added loading prop with default
  ...rest
}) => {
  // Determine if the button should be in a "non-interactive" state
  const isEffectivelyDisabled = disabled || loading;

  return (
    <TouchableOpacity
      {...rest}
      style={[
        // Apply base style, and if effectively disabled, add disabledButton style
        // This maintains the original structure of how styles were applied
        isEffectivelyDisabled
          ? [styles.button, styles.disabledButton]
          : styles.button,
      ]}
      onPress={onPress}
      disabled={isEffectivelyDisabled} // Disable touch interaction if disabled or loading
      activeOpacity={isEffectivelyDisabled ? 1 : 0.8} // Prevent opacity change if disabled or loading
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" /> // Show loader if loading
      ) : (
        <Text
          style={[
            styles.text,
            // Apply disabledText style if effectively disabled (and not loading, as text is hidden)
            // This condition primarily affects the 'disabled' prop, not 'loading' for the text itself
            isEffectivelyDisabled ? styles.disabledText : null,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// --- STYLES (Unchanged as per request) ---
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
    backgroundColor: Colors.gray500 || "#cccccc", // Fallback if Colors.gray500 is undefined
    opacity: 0.6,
  },
  disabledText: {
    color: Colors.SecondaryColor, // Ensure Colors.SecondaryColor is defined
  },
});
