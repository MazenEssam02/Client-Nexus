import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Wallet = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#B47947"
      d="M18.016 5H3.125a.625.625 0 1 1 0-1.25h15c.345 0 .625-.28.625-.625 0-1.036-.84-1.875-1.875-1.875H2.5A2.5 2.5 0 0 0 0 3.75v12.5a2.5 2.5 0 0 0 2.5 2.5h15.516c1.094 0 1.984-.841 1.984-1.875v-10C20 5.841 19.11 5 18.016 5Zm-1.766 8.125a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
    />
  </Svg>
);
export default Wallet;
