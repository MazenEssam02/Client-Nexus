import * as Clipboard from "expo-clipboard";
import { Colors } from "../constants/Color";
import Bot from "../components/Icons/Bot";
import SendIcon from "../components/Icons/SendIcon";
import { font } from "../constants/Font";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  Alert,
  Linking,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import TypingIndicator from "../components/Icons/AnimatedTyping";
import ResultLawyerCard from "../components/LawyerCard/LawyerCard";
import formatBotText from "../utils/formatBotText";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "typing";
  sources?: string[];
  suggestion?: any;
}
// const suggestion = {
//   text: "نظرًا لأن الاستفسار يتعلق بإجراءات قانونية قد تتطلب متابعة قانونية، يُوصى بالتواصل مع محامٍ متخصص في القانون المدني.",
//   lawyers: [
//     {
//       id: 42,
//       firstName: "مصطفى",
//       lastName: "حسن",
//       description: "محامى عام و مدنى ذات خبرة",
//       mainImage:
//         "https://clientnexus.s3.amazonaws.com/images/5848f538-d622-4375-9891-4b2704434492.png",
//       city: "التجمع",
//       state: "القاهرة",
//       yearsOfExperience: 5,
//       office_consultation_price: 200,
//       telephone_consultation_price: 75,
//     },
//   ],
// };
const ChatBotScreen = ({ navigation }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "مرحبا كيف يمكننى مساعدتك؟", sender: "bot" },
  ]);
  const [text, setText] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const controller = new AbortController(); // controller to use to stop fetching when back button pressed
  const signal = controller.signal;
  const { mutate: sendMessage, isPending: isTyping } = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch(
        "https://legalrag-app.happyforest-adceda20.uaenorth.azurecontainerapps.io/agentic/answer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: message,
          }),
          signal,
        }
      );

      const responseClone = response.clone();
      if (!response.ok) {
        const errorData = await responseClone.json();
        throw new Error(
          `API Error: ${response.status} - ${JSON.stringify(errorData)}`
        );
      }
      return response.json();
    },
    onMutate: (message) => {
      const newMessage: Message = {
        id: Math.random().toString(36).substring(7),
        text: message,
        sender: "user",
      };
      setMessages((prev) => [...prev, newMessage]);

      const typingMessage: Message = {
        id: "typing-" + Math.random().toString(36).substring(7),
        text: "...",
        sender: "typing",
      };
      setMessages((prev) => [...prev, typingMessage]);
    },
    onSuccess: (data) => {
      setMessages((prev) => prev.filter((msg) => msg.sender !== "typing"));
      const botResponse: Message = {
        id: Math.random().toString(36).substring(7),
        text: data.refined_answer?.answer,
        sources: data.refined_answer.sources,
        suggestion: data.suggestion,
        sender: "bot",
      };
      console.log(data.refined_answer?.answer);

      setMessages((prev) => [...prev, botResponse]);
    },
    onError: (error) => {
      setMessages((prev) => prev.filter((msg) => msg.sender !== "typing"));
      const errorResponse: Message = {
        id: Math.random().toString(36).substring(7),
        text: "عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorResponse]);
    },
  });

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text);
      setText("");
    }
  };
  // stop fetch before closing screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      controller.abort();
    });

    return unsubscribe;
  }, [navigation]);

  // Render individual chat message
  const renderMessage = ({ item }: { item: Message }) => {
    const copyToClipboard = () => {
      Clipboard.setStringAsync(item.text);
      Alert.alert("تم النسخ");
    };
    if (item.sender === "typing") {
      return (
        <View
          style={[styles.messageOuterContainer, { alignSelf: "flex-start" }]}
        >
          <Bot style={styles.botIcon} />
          <View style={[styles.messageContainer, styles.botMessage]}>
            <TypingIndicator color={Colors.SecondaryColor} />
          </View>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageOuterContainer,
          item.sender === "user"
            ? { alignSelf: "flex-end" }
            : { alignSelf: "flex-start" },
        ]}
      >
        {item.sender === "bot" && <Bot style={styles.botIcon} />}
        <View style={styles.messageInnerContainer}>
          {item.text && (
            <Pressable
              style={[
                styles.messageContainer,
                item.sender === "user" ? styles.userMessage : styles.botMessage,
              ]}
              onLongPress={copyToClipboard}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender === "user" ? { color: "white" } : {},
                ]}
              >
                {formatBotText(item.text)}
              </Text>
              {item.sources &&
                item.sources.map((source, idx) => (
                  <Text
                    key={idx}
                    style={[
                      styles.messageText,
                      { textDecorationLine: "underline" },
                    ]}
                    onPress={() => Linking.openURL(source)}
                  >
                    {source}
                  </Text>
                ))}
            </Pressable>
          )}
          {item.sender === "bot" &&
            Array.isArray(item.suggestion?.lawyers) &&
            item.suggestion.lawyers.length > 0 && (
              <Pressable
                style={[
                  { marginTop: 10, flex: 1 },
                  styles.messageContainer,
                  styles.botMessage,
                ]}
              >
                <Text style={styles.messageText}>{item.suggestion.text}</Text>
                {item.suggestion.lawyers.map((lawyer, index) => (
                  <View key={index} style={{ flex: 1 }}>
                    <ResultLawyerCard
                      name={lawyer.firstName + " " + lawyer.lastName}
                      rate={lawyer.rate}
                      speciality={lawyer.main_Specialization}
                      gender={lawyer.gender}
                      vezita={lawyer.office_consultation_price}
                      address={lawyer.city}
                      imageURL={lawyer.mainImage}
                      onPress={() => {
                        navigation.navigate("UserTabs", {
                          screen: "HomeStack",
                          params: {
                            screen: "LawyerDetails",
                            params: {
                              lawyer: lawyer,
                            },
                          },
                        });
                      }}
                    />
                  </View>
                ))}
              </Pressable>
            )}
        </View>
      </View>
    );
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      scrollToBottom
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "android" ? 80 : 90}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="اكتب رسالتك..."
            placeholderTextColor={Colors.SecondaryColorLight}
            editable={!isTyping}
            multiline={true}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={styles.sendButton}
            disabled={isTyping}
          >
            {isTyping ? <TypingIndicator /> : <SendIcon />}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  chatContainer: {
    padding: 5,
  },
  messageOuterContainer: {
    maxWidth: "90%",
    padding: 5,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  messageInnerContainer: {
    flex: 1,
    flexDirection: "column",
  },
  messageContainer: {
    padding: 12,
    borderRadius: 30,
  },
  userMessage: {
    backgroundColor: Colors.mainColor,
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  botMessage: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    ...font.body,
    color: Colors.SecondaryColor,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.SecondaryColorLight,
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: "right",
    backgroundColor: "white",
    overflow: "hidden",
    textAlignVertical: "top",
    includeFontPadding: false,
    maxHeight: 100,
  },
  sendButton: {
    paddingRight: 5,
    paddingLeft: 2,
    justifyContent: "center",
  },
  botIcon: {
    marginRight: 8,
    alignSelf: "flex-end",
  },
});

export default ChatBotScreen;
