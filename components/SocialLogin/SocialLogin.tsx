import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { GoogleLogo } from "../Icons/GoogleLogo";
import { FacebookLogo } from "../Icons/FacebookLogo";
import { AppleLogo } from "../Icons/AppleLogo";
import { SocialAuth } from "../../store/auth";

type SocialLoginProps = {
  onPress: (authSource: SocialAuth) => void;
};

export const SocialLogin: React.FC<SocialLoginProps> = ({ onPress }) => {
  return (
    <View style={styles.socialLogin}>
      <View style={styles.orTextContainer}>
        <Image
          source={require("../../assets/social-login-line.png")}
          style={styles.line}
        />
        <Text style={styles.orText}>او سجل باستخدام</Text>
        <Image
          source={require("../../assets/social-login-line.png")}
          style={[styles.line, styles.mirroredLine]}
        />
      </View>

      <View style={styles.socialIcons}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => onPress("google")}
        >
          <GoogleLogo />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => onPress("facebook")}
        >
          <FacebookLogo />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => onPress("apple")}
        >
          <AppleLogo />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orTextContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  line: {
    width: 100,
    height: 2,
    resizeMode: "contain",
  },
  mirroredLine: {
    transform: [{ rotate: "180deg" }],
  },
  orText: {
    ...font.subtitle,
    marginHorizontal: 10,
    lineHeight: 22,
  },
  socialIcons: {
    flexDirection: "row",
    gap: 16,
  },
  iconContainer: {
    backgroundColor: Colors.gray200,
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F89AEE",
  },
  socialLogin: {
    width: "100%",
    alignItems: "center",
  },
});
