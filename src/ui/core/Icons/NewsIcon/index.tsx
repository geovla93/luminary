import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const NewsIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={props.color || '#fff'}
      d="M20.54 3.46A5 5 0 0 0 17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-1.46-3.54ZM20 17a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10ZM9.23 15h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2Zm3.34-3.95V8a1.78 1.78 0 0 0-1.78-1.78h-3.1A1.78 1.78 0 0 0 5.91 8v3.1a1.78 1.78 0 0 0 1.78 1.78h3.1a1.781 1.781 0 0 0 1.78-1.83Zm-1.66-.18a.31.31 0 0 1-.3.3H7.87a.31.31 0 0 1-.3-.3V8.13a.31.31 0 0 1 .3-.3h2.74a.31.31 0 0 1 .3.3v2.74Zm6.32.13H15a1 1 0 1 0 0 2h2.26a1 1 0 0 0 0-2h-.03Zm0 4h-5a1 1 0 1 0 0 2h5a1 1 0 0 0 0-2Zm0-8h-2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2Z"
    />
  </Svg>
);
export default NewsIcon;
