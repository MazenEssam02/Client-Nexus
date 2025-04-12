import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { Arrow } from "../Icons/Arrow";
import { useState } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import Data from "../../api-mock/Questions.json";
import { MainButton } from "../Buttons/MainButton";
export default function LawyerQA({ lawyer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <View style={styles.QAContainer}>
      <View style={styles.QAUpperContainer}>
        <Text style={styles.title}>أسئلة و اجابات المحامى</Text>
        <Pressable onPress={toggleExpand} style={styles.arrowContainer}>
          <Arrow
            fillColor={Colors.mainColor}
            rotation={isExpanded ? 90 : 270}
          />
        </Pressable>
      </View>
      {isExpanded ? (
        <View style={styles.list}>
          <FlatList
            data={Data.slice(0, 3)} // Only show first 3 items
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <QuestionCard {...item} />}
            scrollEnabled={false}
          />
          <View style={styles.buttonContainer}>
            <MainButton title="عرض المزيد" onPress={() => {}} />
          </View>
        </View>
      ) : (
        ""
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  QAContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    color: Colors.SecondaryColor,
    ...font.title,
    textAlign: "right",
  },
  QAUpperContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
  },
  arrowContainer: {
    padding: 5,
    marginHorizontal: 10,
  },
  list: {
    width: "100%",
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
});
