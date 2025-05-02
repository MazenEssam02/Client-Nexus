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
} from "react-native";

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "مرحبا كيف يمكننى مساعدتك؟", sender: "bot" },
  ]);
  const [text, setText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (text.trim()) {
      const newMessage = {
        id: Math.random().toString(36).substring(7),
        text,
        sender: "user",
      };
      setMessages((prev) => [...prev, newMessage]);
      setText("");
      // Bot's reply logic
      const generateBotReply = (userMessage: string) => {
        if (userMessage.includes("مرحبا")) return "مرحبا بك 👋";
        if (userMessage.includes("مساعدة"))
          return "بالتأكيد, انا هنا لمساعدتك!";
        return "عفواً، لم أفهم رسالتك.";
      };
      setTimeout(() => {
        const botResponse = {
          id: Math.random().toString(36).substring(7),
          text: generateBotReply(text),
          sender: "bot",
        };
        setMessages((prev) => [...prev, botResponse]);
        scrollToBottom();
      }, 1000);
    }
  };
  // Render individual chat message
  const renderMessage = ({ item }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.sender === "user" ? styles.userMessage : styles.botMessage,
        ]}
      >
        {/* {item.sender === "bot" && <Bot />} */}
        <Text
          style={[
            styles.messageText,
            item.sender === "user" ? { color: "white" } : {},
          ]}
        >
          {item.text}
        </Text>
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
          // inverted
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="اكتب رسالتك..."
            placeholderTextColor={Colors.SecondaryColorLight}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <SendIcon />
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
    padding: 10,
  },
  messageContainer: {
    maxWidth: "90%",
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
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
    // backgroundColor: "#fff",
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
  },
  sendButton: {
    paddingHorizontal: 5,
    justifyContent: "center",
  },
});

export default ChatBotScreen;
