import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Favourite = (props: SvgProps) => (
  <Svg width={19} height={18} fill="none" {...props}>
    <Path
      stroke="#B47947"
      d="m10.746 2.1-.693.816-.38.45-.382-.45-.693-.815C6.99.2 4.456-.056 2.768 1.588l7.978.512Zm0 0c1.61-1.899 4.142-2.155 5.83-.511 2.013 1.964 2.127 5.53.312 7.671M10.746 2.1l6.142 7.16m0 0-6.803 8.028c-.24.283-.59.283-.83 0L2.453 9.26m14.435 0H2.453m0 0C.641 7.12.755 3.553 2.768 1.589l-.315 7.672Z"
    />
  </Svg>
);
