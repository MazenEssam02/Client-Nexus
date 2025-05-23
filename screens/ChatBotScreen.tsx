// import { useState, useCallback, useEffect } from "react";
// import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
// import { View, StyleSheet, SafeAreaView, Pressable } from "react-native";
// import { Colors } from "../constants/Color";
// import Bot from "../components/Icons/Bot";
// import SendIcon from "../components/Icons/SendIcon";

// export default function ChatBotScreen() {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState(""); // State to control the text input
//   // Initial bot welcome message
//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "مرحبا كيف يمكننى مساعدتك؟",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "Chatbot",
//         },
//       },
//     ]);
//   }, []);

//   // Handle sending a message
//   const onSend = useCallback((newMessages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, newMessages)
//     );

//     const userMessage = newMessages[0].text;

//     // Simulate bot response after delay
//     setTimeout(() => {
//       const botResponse = {
//         _id: Math.random().toString(36).substring(7),
//         text: generateBotReply(userMessage),
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "Chatbot",
//         },
//       };
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, [botResponse])
//       );
//     }, 1000);
//   }, []);
//   const renderAvatar = (props) => {
//     const { currentMessage } = props;
//     if (currentMessage.user._id === 2) {
//       return (
//         <View style={{ marginRight: 5 }}>
//           <Bot />
//         </View>
//       );
//     }
//     return null; // or default avatar
//   };
//   const renderInputToolbar = (props) => {
//     return (
//       <InputToolbar
//         {...props}
//         containerStyle={{
//           backgroundColor: "white",
//           borderWidth: 1,
//           borderTopWidth: 1,
//           borderColor: Colors.SecondaryColorLight,
//           borderTopColor: Colors.SecondaryColorLight,
//           paddingVertical: 4,
//           paddingHorizontal: 4,
//           borderRadius: 40,
//           marginHorizontal: 10,
//           marginBottom: 5,
//         }}
//       />
//     );
//   };
//   const renderSend = (props) => {
//     const handleSend = () => {
//       if (text.trim()) {
//         const newMessage = {
//           _id: Math.random().toString(36).substring(7),
//           text,
//           createdAt: new Date(),
//           user: {
//             _id: 1,
//           },
//         };
//         // Call the onSend function with the new message
//         onSend([newMessage]);
//         // Clear the text input after sending
//         setText("");
//       }
//     };
//     return (
//       <Pressable onPress={handleSend} style={{ marginRight: 15 }}>
//         <SendIcon />
//       </Pressable>
//     );
//   };
//   const renderBubble = (props) => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: Colors.mainColor, // user bubble (you)
//           },
//           left: {
//             backgroundColor: "white", // bot bubble
//           },
//         }}
//         textStyle={{
//           right: {
//             color: "#fff",
//             textAlign: "right",
//           },
//           left: {
//             color: Colors.SecondaryColor,
//             textAlign: "right",
//           },
//         }}
//       />
//     );
//   };
//   // Dummy bot logic
//   const generateBotReply = (text) => {
//     if (text.includes("مرحبا")) return "مرحبا بك 👋";
//     if (text.includes("مساعدة"))
//       return "بالتأكيد, انا هنا لمساعدتك, اخبرنى كيف اساعدك؟";
//     return "عفوا لا استطيع مساعدتك";
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <GiftedChat
//         messages={messages}
//         onSend={(messages) => onSend(messages)}
//         user={{
//           _id: 1,
//         }}
//         renderInputToolbar={renderInputToolbar}
//         renderBubble={renderBubble}
//         renderAvatar={renderAvatar}
//         renderSend={renderSend}
//         textInputProps={{
//           value: text, // Set the value of the input field
//           onChangeText: setText, // Update the state when typing
//           placeholder: "اكتب رسالتك....",
//           placeholderTextColor: Colors.SecondaryColor,
//           style: {
//             // borderRadius: 5,
//             flex: 1,
//             padding: 10,
//             textAlign: "right",
//           },
//         }}
//       />
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
// });
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
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import TypingIndicator from "../components/Icons/AnimatedTyping";
import ResultLawyerCard from "../components/LawyerCard/LawyerCard";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "typing";
  suggestion?: any; // Add this line to allow suggestion property (adjust type as needed)
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
  // const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

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
        }
      );

      const responseClone = response.clone();
      if (!response.ok) {
        const errorData = await responseClone.json();
        throw new Error(
          `API Error: ${response.status} - ${JSON.stringify(errorData)}`
        );
      }

      // Then parse the original response for success case
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
        text: data.refined_answer,
        suggestion: data.suggestion,
        sender: "bot",
      };
      console.log(data.suggestion.lawyers);

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

    // // Uncomment the following lines if you want to simulate a delay
    // if (text.trim()) {
    //   // Add user message
    //   const newMessage: Message = {
    //     id: Math.random().toString(36).substring(7),
    //     text,
    //     sender: "user",
    //   };
    //   setMessages((prev) => [...prev, newMessage]);
    //   setText("");

    //   // Show typing indicator
    //   setIsTyping(true);
    //   setMessages((prev) => [
    //     ...prev,
    //     { id: "typing", text: "...", sender: "typing" },
    //   ]);

    //   // Fake API delay (2-4 seconds)
    //   const delay = 4000 + Math.random() * 2000;

    //   setTimeout(() => {
    //     // Remove typing indicator
    //     setIsTyping(false);
    //     setMessages((prev) => prev.filter((msg) => msg.id !== "typing"));

    //     // Add bot response
    //     const botResponse: Message = {
    //       id: Math.random().toString(36).substring(7),
    //       text: "عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
    //       sender: "bot",
    //     };
    //     setMessages((prev) => [...prev, botResponse]);
    //     scrollToBottom();
    //   }, delay);
    // }
  };

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
              {item.text}
            </Text>
          </Pressable>
          {item.sender === "bot" &&
            Array.isArray(item.suggestion?.lawyers) &&
            item.suggestion.lawyers.length > 0 && (
              <Pressable
                // style={{ flex: 1, marginTop: 20 }}
                style={[
                  { marginTop: 10, flex: 1 },
                  styles.messageContainer,
                  styles.botMessage,
                ]}
                // onLongPress={copyToClipboard}
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
                {/* <FlatList
                data={item.suggestion.lawyers}
                keyExtractor={(lawyer) => lawyer.id.toString()}
                renderItem={({ item: lawyer }) => (
                  <ResultLawyerCard
                    name={lawyer.firstName + " " + lawyer.lastName}
                    rate={lawyer.rate}
                    speciality={lawyer.main_Specialization}
                    gender={lawyer.gender}
                    vezita={lawyer.office_consultation_price}
                    address={lawyer.city}
                    imageURL={lawyer.mainImage}
                    // onPress={() =>
                    //   navigation.navigate(
                    //     "UserTabs",{
                    //       screen:"HomeStack",{
                    //         "LawyerDetails"
                    //       }
                    //     }
                    //     "LawyerDetails" as never,
                    //     {
                    //       lawyer: lawyer,
                    //       type: route.params.type,
                    //     } as never
                    //   )
                    // }
                  />
                )}
              /> */}
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.select({ ios: 90, android: 0 })}
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
    // borderRadius: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  messageInnerContainer: {
    flex: 1,
    // padding: 5,
    // borderRadius: 20,
    // marginVertical: 10,
    flexDirection: "column",
    // alignItems: "center",
  },
  messageContainer: {
    // maxWidth: "90%",
    padding: 12,
    borderRadius: 30,
    // marginVertical: 10,
    // flexDirection: "row",
    // alignItems: "center",
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
