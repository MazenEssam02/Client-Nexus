import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const StarIcon = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      fill="#B47947"
      fillRule="evenodd"
      d="M10.553.795C9.94.827 9.33 1.308 8.86 2.237L7.072 5.81c-.241.494-.888.976-1.433 1.065l-3.232.532c-2.066.355-2.547 1.85-1.064 3.334l2.522 2.522c.418.418.659 1.242.545 1.85l-.723 3.119c-.57 2.458.748 3.409 2.916 2.129l3.029-1.8c.252-.153.584-.235.921-.246V.796Z"
      clipRule="evenodd"
    />
    <Path
      fill="#B47947"
      fillRule="evenodd"
      d="M10.553 18.318c.39-.013.79.069 1.082.246l3.029 1.8c2.167 1.292 3.486.329 2.915-2.13l-.722-3.118c-.14-.596.101-1.42.52-1.838l2.522-2.522c1.483-1.496 1.001-2.991-1.065-3.334l-3.232-.532c-.545-.101-1.191-.57-1.432-1.065l-1.787-3.574c-.506-1.004-1.17-1.488-1.83-1.454v17.52Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default StarIcon;
