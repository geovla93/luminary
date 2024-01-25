import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const DappsIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={props.color || '#fff'}
      fillRule="evenodd"
      d="M4.778 3.674a4 4 0 1 1 4.444 6.652 4 4 0 0 1-4.444-6.652Zm1.049 5.071a2.1 2.1 0 1 0 2.306-3.51 2.1 2.1 0 0 0-2.306 3.51Zm-1.05 4.93a4 4 0 1 1 4.445 6.651 4 4 0 0 1-4.444-6.652Zm1.049 5.06c.348.229.757.349 1.174.345v.03A2.1 2.1 0 0 0 9.08 17a2.1 2.1 0 1 0-3.254 1.734ZM17 13a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.08A2.1 2.1 0 1 1 19.1 17a2.1 2.1 0 0 1-2.1 2.11v-.03ZM16 8h-2a1 1 0 0 1-1-1 1 1 0 0 1 .615-.921A1 1 0 0 1 14 6h2V4a1 1 0 0 1 .615-.921A1 1 0 0 1 18 4v2h2a1 1 0 0 1 .921 1.385A1 1 0 0 1 20 8h-2v2a1 1 0 0 1-.3.71 1 1 0 0 1-.7.29 1 1 0 0 1-1-1V8Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default DappsIcon;
