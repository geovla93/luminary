import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const LightningIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#ECC248"
      d="M19.89 9.55A1 1 0 0 0 19 9h-5V3a1 1 0 0 0-1.309-1.002 1 1 0 0 0-.501.362l-8 11a1 1 0 0 0-.08 1A1 1 0 0 0 5 15h5v6a1 1 0 0 0 1.81.59l8-11a1 1 0 0 0 .08-1.04ZM12 17.92V14a1 1 0 0 0-1-1H7l5-6.92V10a1 1 0 0 0 1 1h4l-5 6.92Z"
    />
  </Svg>
);
export default LightningIcon;
