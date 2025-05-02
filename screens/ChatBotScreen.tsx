// import { useState, useCallback, useEffect } from "react";
// // import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
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
//   // const onSend = useCallback((newMessages = []) => {
//   //   setMessages((previousMessages) =>
//   //     GiftedChat.append(previousMessages, newMessages)
//   //   );

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
