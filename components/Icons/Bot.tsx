import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { Colors } from "../../constants/Color";
const Bot = ({ width = 41, height = 41, ...props }) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 41 41" {...props}>
    <Circle cx={20.645} cy={20.77} r={20} fill={Colors.SecondaryColor} />
    <Path
      fill="#F0EDEA"
      d="M28.839 23.21c1.77 0 3.205 1.41 3.205 3.148v1.266c0 1.53-.68 2.984-1.862 3.98-2.23 1.88-5.42 2.8-9.537 2.8-4.115 0-7.304-.92-9.53-2.799a5.207 5.207 0 0 1-1.859-3.978v-1.269c0-1.738 1.435-3.147 3.205-3.147h16.378ZM20.501 6.437l.145-.01c.54 0 .988.395 1.058.907l.01.142-.001 1.048h4.985c1.77 0 3.205 1.41 3.205 3.148v6.301c0 1.738-1.435 3.147-3.205 3.147H14.592c-1.77 0-3.204-1.409-3.204-3.147v-6.301c0-1.738 1.434-3.147 3.204-3.147l4.984-.001.002-1.048c0-.531.402-.97.923-1.04ZM17.44 12.72c-.983 0-1.78.782-1.78 1.747 0 .966.797 1.748 1.78 1.748.982 0 1.78-.782 1.78-1.748 0-.965-.798-1.747-1.78-1.747Zm6.398 0c-.982 0-1.779.782-1.779 1.747 0 .966.797 1.748 1.78 1.748.982 0 1.779-.782 1.779-1.748 0-.965-.797-1.747-1.78-1.747Z"
    />
  </Svg>
);
export default Bot;
