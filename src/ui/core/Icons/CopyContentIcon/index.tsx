import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
}

const CopyContentIcon = ({size = 24, color, ...props}: Props) => (
  <Svg width={size} height={size} fill="none" {...props}>
    <Path
      fill={color || '#ECC248'}
      d="M16 13V3a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3ZM2 13V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Zm17-9a1 1 0 0 0-1 1v10a3 3 0 0 1-3 3H5a1 1 0 0 0 0 2h10a5 5 0 0 0 5-5V5a1 1 0 0 0-1-1Z"
    />
  </Svg>
);
export default CopyContentIcon;
