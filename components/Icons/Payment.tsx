import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Payment = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      fill="#B47947"
      d="M20.672 4h-16c-1.11 0-1.99.89-1.99 2l-.01 12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2Zm-1 14h-14c-.55 0-1-.45-1-1v-5h16v5c0 .55-.45 1-1 1Zm1-10h-16V6h16v2Z"
    />
  </Svg>
);
export default Payment;
