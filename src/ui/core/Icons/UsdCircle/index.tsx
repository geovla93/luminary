import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const UsdCircle = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}>
    <Path
      fill="url(#a)"
      d="M16.5 13.5h6a1.5 1.5 0 1 0 0-3h-3V9a1.5 1.5 0 1 0-3 0v1.5a4.5 4.5 0 1 0 0 9h3a1.5 1.5 0 1 1 0 3h-6a1.5 1.5 0 0 0 0 3h3V27a1.5 1.5 0 1 0 3 0v-1.5a4.5 4.5 0 1 0 0-9h-3a1.5 1.5 0 0 1 0-3Zm1.5-12a16.5 16.5 0 1 0 0 33 16.5 16.5 0 0 0 0-33Zm0 30a13.5 13.5 0 1 1 0-27 13.5 13.5 0 0 1 0 27Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={3.563}
        x2={39.484}
        y1={1.5}
        y2={14.231}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#ECC248" />
        <Stop offset={0.5} stopColor="#F7E696" />
        <Stop offset={1} stopColor="#ECC248" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default UsdCircle;
