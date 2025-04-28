import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

const ReportItem = ({ report, onPress }) => (
  <TouchableOpacity style={styles.reportItem} onPress={() => onPress(report)}>
    <View style={styles.reportItemHeader}>
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.label}>بلاغ من:</Text>
          <Text style={styles.value}>{report.reportedBy}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>رقم البلاغ:</Text>
          <Text style={styles.value}>{report.reportId}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.label}>نوع البلاغ:</Text>
          <Text style={styles.value}>{report.reportType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>الحالة:</Text>
          <Text style={styles.value}>{report.status}</Text>
        </View>
      </View>
    </View>
    <View style={styles.reportItemFooter}>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => onPress(report)}
      >
        <Text style={styles.detailsButtonText}>تفاصيل البلاغ</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const ReportListScreen = ({ navigation }) => {
  const reportsData = [
    {
      id: "1",
      reportedBy: "user123456789",
      reportId: "812121",
      reportType: "Money Collection Issue",
      status: "جاري التحقق",
    },
    {
      id: "2",
      reportedBy: "anotherUser",
      reportId: "987654",
      reportType: "Payment Dispute",
      status: "تم التحقق",
    },
    {
      id: "3",
      reportedBy: "yetAnother",
      reportId: "112233",
      reportType: "Service Complaint",
      status: "جاري التحقق",
    },
  ];

  const handleReportPress = (report) => {
    console.log("Report pressed:", report);
    navigation.navigate("Report Detail", { report });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reportsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReportItem report={item} onPress={handleReportPress} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Light background
  },
  listContent: {
    padding: 15,
  },
  reportItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  reportItemHeader: {
    justifyContent: "space-between",
    rowGap: 3,
    marginBottom: 10,
  },
  info: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    columnGap: 4,
  },
  row: {
    flexDirection: "row-reverse",
    columnGap: 5,
  },
  reportItemFooter: {
    marginTop: 5,
    alignItems: "center",
  },
  label: {
    fontSize: font.body.fontSize,
    fontFamily: font.body.fontFamily,
    color: Colors.SecondaryColor,
  },
  value: {
    fontSize: font.body.fontSize,
    fontFamily: font.body.fontFamily,
    color: Colors.mainColor,
  },
  detailsButton: {
    backgroundColor: Colors.mainColor, // Darker brown button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: "#fff",
    fontFamily: font.Button.fontFamily,
    fontSize: font.Button.fontSize,
  },
});

export default ReportListScreen;
