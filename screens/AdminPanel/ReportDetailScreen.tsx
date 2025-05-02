import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";

const ReportDetailsScreen = ({ route }) => {
  const { report } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>بلاغ من:</Text>
          <Text style={styles.detailValue}>{report.reportedBy}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>رقم البلاغ:</Text>
          <Text style={styles.detailValue}>{report.reportId}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>نوع البلاغ:</Text>
          <Text style={styles.detailValue}>{report.reportType}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>تاريخ البلاغ:</Text>
          <Text style={styles.detailValue}>2024-07-15</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>الوقت:</Text>
          <Text style={styles.detailValue}>10:30 AM</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>الرسالةالمصاحبة للبلاغ:</Text>
          <View style={styles.message}>
            <Text style={styles.detailValue}>
              ككانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانكانان
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>تم التحقق</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>جاري التحقيق</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  detailsContainer: {
    marginTop: 10,
    rowGap: 3,
    padding: 25,
  },
  detailRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: font.body.fontSize,
    fontFamily: font.body.fontFamily,
    color: Colors.SecondaryColor,
  },
  detailValue: {
    fontSize: font.body.fontSize,
    fontFamily: font.body.fontFamily,
    color: Colors.mainColor,
    textAlign: "right",
  },
  message: {
    flex: 1,
    // padding: 10,
  },
  emptySpace: {
    flex: 1,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#eee",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  primaryButton: {
    backgroundColor: Colors.invalidColor600, // Crimson red
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontFamily: font.Button.fontFamily,
    fontSize: font.Button.fontSize,
  },
  secondaryButton: {
    backgroundColor: Colors.mainColor, // Gray
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: "#fff",
    fontFamily: font.Button.fontFamily,
    fontSize: font.Button.fontSize,
  },
});

export default ReportDetailsScreen;
