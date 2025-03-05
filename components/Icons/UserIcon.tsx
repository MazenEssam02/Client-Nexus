import Svg, { SvgProps, Path } from "react-native-svg";

export const UserIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      fill="#fff"
      stroke="#000"
      d="M20.75 8.75a5.75 5.75 0 1 1-11.5 0 5.75 5.75 0 0 1 11.5 0ZM4.137 27.5c0-4.813 4.782-8.875 10.863-8.875 6.08 0 10.863 4.062 10.863 8.875 0 .04-.015.07-.035.09a.123.123 0 0 1-.09.035H4.262a.123.123 0 0 1-.09-.035.123.123 0 0 1-.035-.09Z"
    />
  </Svg>
);
