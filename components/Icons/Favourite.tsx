import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Favourite = (props: SvgProps) => (
  <Svg width={19} height={18} fill="none" {...props}>
    <Path
      stroke="#B47947"
      d="M10.746 2.1c1.61-1.898 4.142-2.155 5.83-.512 1.95 1.904 2.118 5.31.477 7.468l-.165.205-6.803 8.027c-.21.247-.504.278-.734.093l-.095-.093-6.803-8.027C.698 7.187.75 3.774 2.586 1.777l.183-.188C4.404-.003 6.833.188 8.444 1.927l.154.174.693.815.38.45.383-.45.692-.815Z"
    />
  </Svg>
);
export default Favourite;
