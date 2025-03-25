import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Search = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      stroke="#B47947"
      strokeLinecap="round"
      d="M11.518 1c3.948 0 7.154 3.175 7.154 7.098s-3.206 7.097-7.154 7.097a7.161 7.161 0 0 1-3.978-1.198l-4.667 4.628c-.504.5-1.319.5-1.822 0a1.277 1.277 0 0 1 0-1.816l4.637-4.598a7.03 7.03 0 0 1-1.323-4.113C4.365 4.175 7.571 1 11.518 1Zm4.574 7.098c0-2.5-2.045-4.533-4.574-4.533-2.528 0-4.573 2.033-4.573 4.533 0 2.5 2.045 4.532 4.573 4.532 2.53 0 4.574-2.032 4.574-4.532Z"
      clipRule="evenodd"
    />
  </Svg>
);
