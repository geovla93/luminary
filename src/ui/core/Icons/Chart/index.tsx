import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const ChartIcon = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}>
    <Path
      fill="url(#a)"
      d="M31.5 19.5A1.5 1.5 0 0 1 30 18v-3.885l-9.435 9.45a1.498 1.498 0 0 1-2.13 0l-4.935-4.95-7.935 7.95a1.506 1.506 0 1 1-2.13-2.13l9-9a1.498 1.498 0 0 1 2.13 0l4.935 4.95L27.885 12H24a1.5 1.5 0 1 1 0-3h7.5a1.5 1.5 0 0 1 .57.12 1.5 1.5 0 0 1 .81.81 1.5 1.5 0 0 1 .12.57V18a1.5 1.5 0 0 1-1.5 1.5Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={4.869}
        x2={32.126}
        y1={27.006}
        y2={10.908}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#ECC248" />
        <Stop offset={0.5} stopColor="#F7E696" />
        <Stop offset={1} stopColor="#ECC248" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default ChartIcon;
