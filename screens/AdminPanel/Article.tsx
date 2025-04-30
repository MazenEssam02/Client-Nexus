import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

const Article = ({ navigation }) => {
  const [articleId, setArticleId] = useState("");

  const handleEditArticle = () => {
    if (articleId) {
      console.log("Navigating to edit article with ID:", articleId);
      navigation.navigate("AdminEditArticleScreen", { articleId });
    } else {
      alert("Please enter an Article ID to edit.");
    }
  };

  const handleDeleteArticle = () => {
    if (articleId) {
      console.log("Initiating deletion of article with ID:", articleId);
      alert(`Confirming deletion of article with ID: ${articleId}`);
    } else {
      alert("Please enter an Article ID to delete.");
    }
  };

  const handleAddArticle = () => {
    console.log("Navigating to add new article screen");
    navigation.navigate("AdminEditArticleScreen"); // Assuming the same screen can handle both add and edit
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>مقال رقم:</Text>
            <TextInput
              style={styles.input}
              value={articleId}
              onChangeText={setArticleId}
              placeholder="أدخل رقم المقال"
              textAlign="right"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonArea}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEditArticle}
              >
                <Text style={styles.editButtonText}>تعديل المقال</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteArticle}
              >
                <Text style={styles.deleteButtonText}>حذف المقال</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddArticle}
            >
              <Text style={styles.addButtonText}>اضافة مقال</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    marginTop: 30,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: font.Caption.fontSize,
    fontFamily: font.Caption.fontFamily,
    color: Colors.SecondaryColor,
    marginBottom: 5,
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: font.body.fontSize,
    fontFamily: font.body.fontFamily,
    textAlign: "right",
  },
  buttonArea: {
    justifyContent: "center",
    marginTop: 50,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  editButton: {
    backgroundColor: Colors.SecondaryColor,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontSize: font.Button.fontSize,
    fontFamily: font.Button.fontFamily,
  },
  deleteButton: {
    backgroundColor: Colors.invalidColor600,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: font.Button.fontSize,
    fontFamily: font.Button.fontFamily,
  },
  addButton: {
    backgroundColor: Colors.mainColor,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: font.Button.fontSize,
    fontFamily: font.Button.fontFamily,
  },
});

export default Article;
