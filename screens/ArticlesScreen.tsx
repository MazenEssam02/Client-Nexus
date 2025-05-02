import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
} from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
const screenHeight = Dimensions.get("window").height;
export default function ArticlesScreen({ route }) {
  const data = route.params.data;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: data.imageUrl,
        }}
        style={styles.imagecontainer}
      />
      <ScrollView>
        <View style={styles.scrollContainer}>
          <View style={styles.textContainer}>
            <Text style={[font.headline, styles.titleText]}>{data.title}</Text>
            <Text style={[font.body, styles.contentText]}>{data.content}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imagecontainer: {
    height: screenHeight * 0.35,
    width: "100%",
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: screenHeight * 0.35,
  },
  textContainer: {
    backgroundColor: Colors.background,
    padding: 15,
    paddingBottom: 40,
  },
  titleText: {
    color: Colors.SecondaryColor,
    textAlign: "right",
    marginBottom: 15,
  },
  contentText: {
    color: Colors.SecondaryColor,
    textAlign: "right",
  },
});
