import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const ArrowDown = (props: SvgProps) => (
  <Svg width={36} height={36} fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="M25.5 24H14.115l12.45-12.435a1.506 1.506 0 1 0-2.13-2.13L12 21.885V10.5a1.5 1.5 0 1 0-3 0v15a1.5 1.5 0 0 0 .12.57 1.5 1.5 0 0 0 .81.81 1.5 1.5 0 0 0 .57.12h15a1.5 1.5 0 1 0 0-3Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={10.125}
        x2={29.725}
        y1={8.994}
        y2={15.941}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#ECC248" />
        <Stop offset={0.5} stopColor="#F7E696" />
        <Stop offset={1} stopColor="#ECC248" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default ArrowDown;
