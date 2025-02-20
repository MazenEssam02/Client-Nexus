import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import ArticleItem from "../ArticleItem/ArticleItem";
import { useEffect, useRef } from "react";
import Data from "../../api-mock/articles.json";
export default function ArticlesSection({ navigation }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={[font.headline, styles.titleText]}>مقالات</Text>
      <FlatList
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={Data}
        keyExtractor={(item) => item.article_id}
        renderItem={({ item }) => (
          <ArticleItem
            title={item.title}
            imageLink={item.image_url}
            onPress={() => {
              navigation.navigate("Articles", { data: item });
            }}
          />
        )}
      />
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
