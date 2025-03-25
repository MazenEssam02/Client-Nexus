import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Calendar = (props: SvgProps) => (
  <Svg width={19} height={18} fill="none" {...props}>
    <Path
      stroke="#B47947"
      d="M14.315 2.25v.5h2.428c.854 0 1.429.593 1.429 1.188v1.187h-17V3.937c0-.594.575-1.187 1.428-1.187H5.03V.5H6.6v2.25h6.143V.5h1.572v1.75ZM1.172 16.313V7.25h17v9.063c0 .594-.575 1.187-1.429 1.187H2.6c-.853 0-1.428-.593-1.428-1.188Z"
    />
  </Svg>
);
