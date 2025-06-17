import { Text } from "react-native";
import { font } from "../constants/Font";
const renderTextWithBold = (text) => {
  const formattedText = text.replace(/(\d+\.)/g, "\n$1");
  const parts = formattedText.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <Text key={index} style={{ ...font.title }}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    return <Text key={index}>{part}</Text>;
  });
};
export default renderTextWithBold;
