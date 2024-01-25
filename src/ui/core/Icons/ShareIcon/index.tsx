import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
interface Props extends SvgProps {
  size?: number;
}
const ShareIcon = ({size = 24, color, ...props}: Props) => (
  <Svg width={size} height={size} fill="none" {...props}>
    <Path
      fill={color || '#ECC248'}
      d="M16 13a4 4 0 0 0-3.08 1.48l-5.1-2.35a3.64 3.64 0 0 0 0-2.26l5.1-2.35a4 4 0 1 0-.85-1.81L6.79 8.14a4 4 0 1 0 0 5.72l5.28 2.43A4.177 4.177 0 0 0 12 17a4 4 0 1 0 4-4Zm0-10a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM4 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm12 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
    />
  </Svg>
);
export default ShareIcon;
