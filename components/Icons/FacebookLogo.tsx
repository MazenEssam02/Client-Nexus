import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

export const FacebookLogo = (props: SvgProps) => (
  <Svg width={31} height={30} fill="none" {...props}>
    <Path
      fill="#1977F3"
      d="M15.172 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15Z"
    />
    <Path
      fill="#fff"
      d="M21.01 19.337 21.676 15h-4.16v-2.814c0-1.185.58-2.344 2.445-2.344h1.892V6.151s-1.717-.293-3.358-.293c-3.425 0-5.666 2.075-5.666 5.837V15h-3.81v4.337h3.81v10.482a15.312 15.312 0 0 0 4.687 0V19.337h3.496Z"
    />
  </Svg>
);
