import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../../constants/Color";
const SendIcon = ({ color = Colors.mainColor, ...props }) => (
  <Svg width={36} height={37} fill="none" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.778}
      d="m14.369 18.496 20.634.004m-20.805.753-2.34 7.02c-.565 1.697-.848 2.545-.644 3.052.178.441.555.77 1.016.887.53.135 1.333-.26 2.938-1.047l17.369-8.526c1.398-.687 2.098-1.03 2.32-1.497a1.489 1.489 0 0 0 0-1.284c-.222-.467-.922-.81-2.32-1.497L15.168 7.835c-1.605-.788-2.408-1.182-2.938-1.047-.46.116-.838.446-1.016.886-.204.508.079 1.357.644 3.053l2.34 7.02c.093.28.14.419.158.562a1.49 1.49 0 0 1 0 .382c-.018.143-.065.283-.158.562Z"
    />
  </Svg>
);
export default SendIcon;
