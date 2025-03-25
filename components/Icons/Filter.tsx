import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Filter = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      fill="#361900"
      fillRule="evenodd"
      d="M12.328 2c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10Zm1 5v4h4v2h-4v4h-2v-4h-4v-2h4V7h2Zm7 5c0 4.41-3.59 8-8 8s-8-3.59-8-8 3.59-8 8-8 8 3.59 8 8Z"
      clipRule="evenodd"
    />
  </Svg>
);
