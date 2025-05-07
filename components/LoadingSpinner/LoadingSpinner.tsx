import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import MainLogo from "../Icons/MainLogo";

const LoadingSpinner = () => {
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
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={{
          transform: [{ perspective: 1000 }, { rotateY: rotation }],
        }}
      >
        <MainLogo />
      </Animated.View>
    </View>
  );
};
export default LoadingSpinner;
