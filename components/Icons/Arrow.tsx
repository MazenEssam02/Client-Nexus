import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Arrow = ({ fillColor, rotation = 0, ...props }: SvgProps & { fillColor?: string, rotation?: number }) => (
  <Svg 
    width={7} 
    height={12} 
    fill="none" 
    style={{ transform: [{ rotate: `${rotation}deg` }] }}
    {...props}
  >
    <Path
      fill={fillColor ? fillColor : "#9A8C80"}
      d="M6.582.71a.996.996 0 0 0-1.41 0L.582 5.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L2.702 6l3.88-3.88c.38-.39.38-1.03 0-1.41Z"
    />
  </Svg>
);
