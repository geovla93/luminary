import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const MicrophoneIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#000"
      d="M14.01 17.5a4.667 4.667 0 0 0 4.667-4.667v-7a4.667 4.667 0 0 0-9.334 0v7A4.667 4.667 0 0 0 14.01 17.5ZM11.677 5.833a2.333 2.333 0 1 1 4.666 0v7a2.333 2.333 0 1 1-4.666 0v-7Zm11.666 7a1.167 1.167 0 1 0-2.333 0 7 7 0 0 1-14 0 1.167 1.167 0 0 0-2.333 0 9.333 9.333 0 0 0 8.166 9.252V24.5H10.51a1.167 1.167 0 1 0 0 2.333h7a1.166 1.166 0 1 0 0-2.333h-2.333v-2.415a9.333 9.333 0 0 0 8.166-9.252Z"
    />
  </Svg>
);
export default MicrophoneIcon;
