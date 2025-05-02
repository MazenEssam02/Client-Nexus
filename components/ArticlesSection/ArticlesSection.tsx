import { View, FlatList, StyleSheet } from "react-native";

import ArticleItem from "../ArticleItem/ArticleItem";
import { Colors } from "../../constants/Color";

const ArticlesSection = ({ navigation, documents }) => {
  return (
    <View style={styles.container}>
      <FlatList
        inverted
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleItem
            articleItem={item}
            onPress={() => {
              navigation.navigate("Articles", { data: item });
            }}
          />
        )}
      />
    </View>
  );
};
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
export default ArticlesSection;
