import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={41}
    height={47}
    fill="none"
    viewBox="0 0 41 47"
    {...props}
  >
    <Path
      fill="#B47947"
      d="M38.759 2.258 30.73.055c-.872-.238-1.768.303-2.123 1.276l-3.705 10.281c-.324.9-.108 1.956.532 2.57l4.678 4.554c-2.779 7.04-7.634 12.897-13.678 16.266l-3.829-5.563c-.525-.762-1.405-1.019-2.161-.633l-8.646 4.406c-.826.432-1.281 1.496-1.08 2.534l1.852 9.547c.193.991.934 1.707 1.806 1.707 19.77 0 35.818-19.048 35.818-42.594 0-1.028-.595-1.918-1.436-2.148Z"
    />
  </Svg>
);
export default SvgComponent;
