import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, StyleSheet } from "react-native";
import MainLogo from "../Icons/MainLogo";
import { Colors } from "../../constants/Color";

const LoadingSpinner = ({ backgroundColor = Colors.background }) => {
  const rotateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateY, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotation = rotateY.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.innerConteiner}>
        <Animated.View
          style={{
            transform: [{ perspective: 1000 }, { rotateY: rotation }],
          }}
        >
          <MainLogo />
        </Animated.View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  innerConteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
});
export default LoadingSpinner;
