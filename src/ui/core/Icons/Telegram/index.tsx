import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}>
    <Path
      fill="url(#a)"
      d="M33.397 3.642a3.073 3.073 0 0 0-3.117-.487L3.398 14.008a3.064 3.064 0 0 0 .157 5.728l5.438 1.891 3.03 10.022c.042.134.101.262.178.379.012.018.028.031.04.049a1.481 1.481 0 0 0 .422.398c.143.094.3.164.466.204l.018.002.01.004c.1.02.202.03.303.03.01 0 .019-.004.029-.004a1.49 1.49 0 0 0 .451-.078c.034-.012.063-.031.096-.045.109-.045.211-.103.306-.172l.229-.192 4.053-4.475 6.045 4.683c.533.414 1.188.64 1.862.64a3.081 3.081 0 0 0 3.012-2.45l4.894-24.024a3.044 3.044 0 0 0-1.04-2.956ZM14.055 22.105a1.49 1.49 0 0 0-.409.758l-.464 2.256-1.176-3.89 6.098-3.175-4.049 4.05Zm12.453 7.955-7.144-5.534a1.503 1.503 0 0 0-2.03.178l-1.299 1.433.46-2.23 10.624-10.624a1.5 1.5 0 0 0-1.754-2.39L10.117 18.83l-5.586-2.044L31.499 6 26.508 30.06Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={3.562}
        x2={38.703}
        y1={2.931}
        y2={16.567}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#ECC248" />
        <Stop offset={0.5} stopColor="#F7E696" />
        <Stop offset={1} stopColor="#ECC248" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgComponent;
