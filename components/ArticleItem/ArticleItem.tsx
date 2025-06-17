import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

export default function ArticleItem({ articleItem, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: articleItem.imageUrl,
        }}
        style={styles.imagecontainer}
      />
      <Text numberOfLines={2} style={[font.Caption, styles.titleText]}>
        {articleItem.title}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    borderRadius: 15,
    height: 210,
    width: 210,
    backgroundColor: "white",
    // justifyContent: "space-between",
    marginHorizontal: 7,
  },
  imagecontainer: {
    width: "100%",
    height: "75%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  titleText: {
    color: Colors.SecondaryColor,
    textAlign: "right",
    // textAlignVertical: "bottom",
    padding: 5,
  },
});
