import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import { MainButton } from "../Buttons/MainButton";

type PrivacyPolicyModalProps = {
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  return (
    <ReactNativeModal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <ScrollView>
          <Text style={styles.modalTitle}>سياسة الاستخدام والخصوصية</Text>
          <Text style={styles.modalText}>
            {/* Add your policy text here. For example: */}
            هذا النص هو مثال على شروط الاستخدام وسياسة الخصوصية. من خلال
            استخدامك لهذا التطبيق فإنك توافق على الالتزام بجميع البنود والشروط
            المذكورة. الرجاء قراءة هذه الشروط بعناية قبل استخدام التطبيق...
          </Text>
          {/* More text as needed */}
        </ScrollView>

        <View style={styles.closeButton}>
          <MainButton title="إغلاق" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    marginHorizontal: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    maxHeight: "80%",
  },
  modalTitle: {
    ...font.headline,
    textAlign: "center",
    marginBottom: 12,
  },
  modalText: {
    ...font.subtitle,
    textAlign: "right",
    marginBottom: 16,
    lineHeight: 24,
  },
  closeButton: {
    height: 32,
    width: 80,
    alignSelf: "center",
  },
});
