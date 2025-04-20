import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/Color";
import { BookingPicker } from "../BookingPicker/BookingPicker";
import { font } from "../../constants/Font";
import { MainButton } from "../Buttons/MainButton";
import Pin from "../Icons/Pin";
import Wallet from "../Icons/Wallet";
import { useNavigation } from "@react-navigation/native";
export default function BookingBlock({ type, onChange, lawyer }) {
  const navigation = useNavigation();
  // const [showWebView, setShowWebView] = useState(false);

  const onSubmitHandler = () => {
    navigation.navigate("WebView" as never);
  };

  return (
    <View style={styles.bookingContainer}>
      <View style={styles.pickerContainer}>
        <BookingPicker value={type} onChange={onChange} />
      </View>
      <View style={{ width: "100%" }}>
        <View style={styles.bookInfoOuterContainer}>
          <View style={styles.bookInfoInnerContainer}>
            <Wallet />
            <Text style={[font.subtitle, styles.Text]}>
              سعر الاستشارة : {lawyer.vezita}ج
            </Text>
          </View>
        </View>
        {type ? (
          <View style={styles.bookInfoOuterContainer}>
            <View style={styles.bookInfoInnerContainer}>
              <Pin />
              <Text style={[font.subtitle, styles.Text]}>
                العنوان : {lawyer.address}
              </Text>
            </View>
          </View>
        ) : (
          ""
        )}
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          title="حجز استشارة"
          onPress={() => {
            onSubmitHandler();
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  bookingContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    // height: 110,
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    width: "90%",
    height: 50,
    justifyContent: "center",
  },
  bookInfoOuterContainer: {
    height: 50,
    width: "100%",
    borderBottomColor: Colors.SecondaryColor,
    borderBottomWidth: 0.5,
    justifyContent: "center",
  },
  bookInfoInnerContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  Text: {
    paddingRight: 10,
    color: Colors.SecondaryColor,
  },
  buttonContainer: {
    marginTop: 20,
    // marginBottom: 10,
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
});
