// import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";
// import QuestionCard from "../components/QuestionCard/QuestionCard";
// import { Colors } from "../constants/Color";

// import SearchBar from "../components/SearchBar/SearchBar";

// export default function ChatBotScreen() {
//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.innerContainer} >
//         <Text>hello</Text>
//         <View style={styles.chatInputContainer}>
//           <SearchBar placeHolder={"اكتب رسالتك"} backgroundColor={"white"} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.background,
//     flex: 1,
//   },
//   innerContainer: {
//     flex: 1,
//   },
//   chatInputContainer: {
//     padding: 15,
//     backgroundColor: Colors.background,
//   },
// });
import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
} from "react-native-gifted-chat";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
    ]);

    // Simulate last seen time
    setLastSeen(new Date(Date.now() - 5 * 60 * 1000)); // 5 minutes ago
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    setIsTyping(false);

    // Update last seen time when sending a message
    setLastSeen(new Date());
  }, []);

  const handleInputTextChanged = (text) => {
    if (text.length > 0) {
      setIsTyping(true);
      // Simulate the other user seeing the typing indicator
      setTimeout(() => setIsTyping(false), 2000);
    } else {
      setIsTyping(false);
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#0084ff",
          },
          left: {
            backgroundColor: "#f0f0f0",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.inputPrimary}
      />
    );
  };

  const renderComposer = (props) => {
    return (
      <Composer
        {...props}
        textInputStyle={styles.composer}
        onTextChanged={handleInputTextChanged}
      />
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        {isTyping && <Text style={styles.typingText}>User is typing...</Text>}
        {lastSeen && !isTyping && (
          <Text style={styles.lastSeenText}>Last seen</Text>
        )}
      </View>
    );
  };

  // const formatLastSeen = (date) => {
  //   const now = new Date();
  //   const diffInMinutes = Math.floor(
  //     (now.getTime() - date.getTime()) / (1000 * 60)
  //   );

  //   if (diffInMinutes < 1) return "just now";
  //   if (diffInMinutes < 60)
  //     return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;

  //   const diffInHours = Math.floor(diffInMinutes / 60);
  //   if (diffInHours < 24)
  //     return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;

  //   const diffInDays = Math.floor(diffInHours / 24);
  //   return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  // };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        extraHeight={100}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1, // Your user id
          }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderComposer={renderComposer}
          renderFooter={renderFooter}
          alwaysShowSend
          bottomOffset={20}
          minInputToolbarHeight={60}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    padding: 8,
    backgroundColor: "#fff",
  },
  inputPrimary: {
    alignItems: "center",
  },
  composer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 0,
    fontSize: 16,
  },
  footerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
  },
  typingText: {
    color: "#666",
    fontSize: 12,
    fontStyle: "italic",
  },
  lastSeenText: {
    color: "#999",
    fontSize: 12,
  },
});

export default ChatBotScreen;
