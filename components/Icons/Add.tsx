import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Add = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      fill="#F0EDEA"
      fillRule="evenodd"
      d="M10.62.177c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10Zm1 5v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2Zm7 5c0 4.41-3.59 8-8 8s-8-3.59-8-8 3.59-8 8-8 8 3.59 8 8Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default Add;
