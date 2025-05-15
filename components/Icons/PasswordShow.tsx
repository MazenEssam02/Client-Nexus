import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const PassowrdShow = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#B47947"
      fillRule="evenodd"
      d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm-8 5c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8-8 3.58-8 8Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default PassowrdShow;
