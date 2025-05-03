import * as React from "react";
import Svg, { Path } from "react-native-svg";
const QuestionIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill="#B47947"
      d="M18.672 16.5h-13a2 2 0 0 1-2-2V5.44l-2.77-3.3A1 1 0 0 1 1.672.5h17a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Zm-11.5-13a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5h-10Zm0 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5h-10Zm0 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-5Z"
    />
  </Svg>
);
export default QuestionIcon;
