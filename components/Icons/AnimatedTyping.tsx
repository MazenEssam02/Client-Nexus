import React from "react";
import { Animated, Easing } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Colors } from "../../constants/Color";

const TypingIndicator = ({ color = Colors.mainColor }) => {
  const dot1 = new Animated.Value(0);
  const dot2 = new Animated.Value(0);
  const dot3 = new Animated.Value(0);

  React.useEffect(() => {
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(200),
          Animated.timing(dot1, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(200),
        ])
      ).start();
    };

    animateDots();
    return () => {
      dot1.stopAnimation();
      dot2.stopAnimation();
      dot3.stopAnimation();
    };
  }, []);

  const dotSize = 8;
  const dotSpacing = 12;

  return (
    <Svg
      width={dotSpacing * 3}
      height={dotSize}
      viewBox={`0 0 ${dotSpacing * 4} ${dotSize}`}
    >
      <AnimatedCircle
        cx={dotSpacing}
        cy={dotSize / 2}
        r={dot1.interpolate({
          inputRange: [0, 1],
          outputRange: [dotSize / 4, dotSize / 2],
        })}
        fill={color}
      />
      <AnimatedCircle
        cx={dotSpacing * 2}
        cy={dotSize / 2}
        r={dot2.interpolate({
          inputRange: [0, 1],
          outputRange: [dotSize / 4, dotSize / 2],
        })}
        fill={color}
      />
      <AnimatedCircle
        cx={dotSpacing * 3}
        cy={dotSize / 2}
        r={dot3.interpolate({
          inputRange: [0, 1],
          outputRange: [dotSize / 4, dotSize / 2],
        })}
        fill={color}
      />
    </Svg>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default TypingIndicator;
