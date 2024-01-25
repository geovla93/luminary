import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
interface Props extends SvgProps {
  size?: number;
}
const CheckIcon = ({size, color = '#000', ...props}: Props) => (
  <Svg width={size} height={size} fill="none" {...props}>
    <Path
      fill={color}
      d="M13.7 1.2c-.4-.4-1-.4-1.4 0L4.8 8.7 1.7 5.6c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l3.8 3.8c.2.2.4.3.7.3.3 0 .5-.1.7-.3l8.2-8.2c.4-.4.4-1 0-1.4Z"
    />
  </Svg>
);
export default CheckIcon;
