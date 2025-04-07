import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Pin = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#B47947"
      d="M8.75 12.38v6.121l.86 1.29a.469.469 0 0 0 .78 0l.86-1.29v-6.12c-.406.075-.823.119-1.25.119-.427 0-.844-.044-1.25-.12ZM10 0a5.625 5.625 0 1 0 0 11.25A5.625 5.625 0 0 0 10 0Zm0 2.969a2.659 2.659 0 0 0-2.656 2.656.47.47 0 0 1-.938 0A3.598 3.598 0 0 1 10 2.031a.47.47 0 0 1 0 .938Z"
    />
  </Svg>
);
export default Pin;
