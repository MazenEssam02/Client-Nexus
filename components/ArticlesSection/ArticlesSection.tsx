import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import ArticleItem from "../ArticleItem/ArticleItem";
import { useEffect, useRef } from "react";

export default function ArticlesSection() {
  const scrollViewRef = useRef(null);
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false }); // Scroll to the end on mount
  }, []);
  return (
    <View style={styles.container}>
      <Text style={[font.headline, styles.titleText]}>مقالات</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <ArticleItem
          title={
            "الآثار المترتبة على تعديل قانون المحاكم الاقتصادية وقانون المرافعات"
          }
          imageLink={"../../assets/BalaneImage.png"}
        />
        <ArticleItem
          title={
            "الآثار المترتبة على تعديل قانون المحاكم الاقتصادية وقانون المرافعات"
          }
          imageLink={"../../assets/BalaneImage.png"}
        />
        <ArticleItem
          title={
            "الآثار المترتبة على تعديل قانون المحاكم الاقتصادية وقانون المرافعات"
          }
          imageLink={"../../assets/BalaneImage.png"}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 11,
    alignItems: "flex-end",
  },

  titleText: {
    color: Colors.SecondaryColor,
    marginRight: 10,
    marginBottom: 5,
  },
});
