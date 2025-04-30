import QuickAccess from "./QuickAccess";
const QuickAccessArea = ({ editable }) => {
  if (editable) {
    return;
  }
  return (
    <>
      <QuickAccess icon="favourite" title="المفضلة" />
      <QuickAccess icon="Payment History" title="معاملاتي" />
      <QuickAccess icon="questions" title="اسئلتي" />
      <QuickAccess icon="schedule" title="مواعيدي" />
      <QuickAccess icon="search" title="البحث عن محامي" />
      <QuickAccess icon="conditions" title="الشروط و الاحكام" />
      <QuickAccess icon="Exit" title="الخروج" />
    </>
  );
};

export default QuickAccessArea;
