import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SecurityIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M19.63 3.65a1 1 0 0 0-.84-.2 8 8 0 0 1-6.22-1.27 1 1 0 0 0-1.14 0 8 8 0 0 1-6.22 1.27A1 1 0 0 0 4 4.43v7.45a9 9 0 0 0 3.77 7.33l3.65 2.6a1 1 0 0 0 1.16 0l3.65-2.6A9 9 0 0 0 20 11.88V4.43a1 1 0 0 0-.37-.78ZM18 11.88a7 7 0 0 1-2.93 5.7L12 19.77l-3.07-2.19A7 7 0 0 1 6 11.88v-6.3a10 10 0 0 0 6-1.39 10 10 0 0 0 6 1.39v6.3Zm-4.46-2.29-2.69 2.7-.89-.9a1.004 1.004 0 0 0-1.42 1.42l1.6 1.6a1.002 1.002 0 0 0 1.42 0L15 11a1.004 1.004 0 1 0-1.42-1.42l-.04.01Z"
    />
  </Svg>
);
export default SecurityIcon;
