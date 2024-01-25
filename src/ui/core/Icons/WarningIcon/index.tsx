import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
interface Props extends SvgProps {
  size?: number;
}
const WarningIcon = ({size, color = '#000', ...props}: Props) => (
  <Svg width={size} height={size} fill="none" {...props}>
    <Path
      fill={color}
      d="M12 14C12.2652 14 12.5196 13.8946 12.7071 13.7071C12.8946 13.5196 13 13.2652 13 13V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V13C11 13.2652 11.1054 13.5196 11.2929 13.7071C11.4804 13.8946 11.7348 14 12 14ZM12 18C12.2472 18 12.4889 17.9267 12.6945 17.7893C12.9 17.652 13.0602 17.4568 13.1548 17.2284C13.2495 16.9999 13.2742 16.7486 13.226 16.5061C13.1778 16.2637 13.0587 16.0409 12.8839 15.8661C12.7091 15.6913 12.4863 15.5722 12.2439 15.524C12.0014 15.4758 11.7501 15.5005 11.5216 15.5952C11.2932 15.6898 11.098 15.85 10.9607 16.0555C10.8233 16.2611 10.75 16.5028 10.75 16.75C10.75 17.0815 10.8817 17.3995 11.1161 17.6339C11.3505 17.8683 11.6685 18 12 18Z"
    />
  </Svg>
);
export default WarningIcon;
