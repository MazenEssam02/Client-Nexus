import { useNavigation } from "@react-navigation/native";
import QuickAccess from "./QuickAccess";
import { PrivacyPolicyModal } from "../PrivacyPolicyModal/PrivacyPolicyModal";
import { useState } from "react";
const QuickAccessArea = ({ editable }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  if (editable) {
    return;
  }
  return (
    <>
      <QuickAccess
        icon="edit"
        title="تعديل كلمة المرور"
        onPress={() => navigation.navigate("UpdatePassword" as never)}
      />
      <QuickAccess icon="favourite" title="المفضلة" />
      <QuickAccess icon="myQuestions" title="اسئلتي" />
      <QuickAccess icon="allQuestions" title="كل الاسئلة" />
      <QuickAccess icon="schedule" title="مواعيدي" />
      <QuickAccess icon="search" title="البحث عن محامي" />
      <QuickAccess
        icon="conditions"
        title="الشروط و الاحكام"
        onPress={() => setModalVisible(true)}
      />
      <QuickAccess icon="Exit" title="الخروج" />
      <PrivacyPolicyModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default QuickAccessArea;
