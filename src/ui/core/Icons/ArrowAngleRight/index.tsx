import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const HelpIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M11.29 15.29a1.573 1.573 0 0 0-.12.15.762.762 0 0 0-.09.18.643.643 0 0 0-.06.18 1.362 1.362 0 0 0 0 .2.84.84 0 0 0 .08.38.9.9 0 0 0 .54.54.94.94 0 0 0 .76 0 .9.9 0 0 0 .54-.54A1 1 0 0 0 13 16a1 1 0 0 0-1.71-.71ZM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20Zm0-13a3 3 0 0 0-2.6 1.5 1 1 0 1 0 1.73 1A1 1 0 0 1 12 9a1 1 0 1 1 0 2 1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-.18A3 3 0 0 0 12 7Z"
    />
  </Svg>
);
export default HelpIcon;