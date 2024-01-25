import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
interface Props extends SvgProps {
  size?: number;
}
const SearchIcon = ({size, color, ...props}: Props) => (
  <Svg width={size} height={size} fill={color} {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        {...props}
        d="m19.585 18.29-3.71-3.68a9 9 0 1 0-1.39 1.39l3.68 3.68a1.002 1.002 0 0 0 1.42 0 1 1 0 0 0 0-1.39ZM8.875 16a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

SearchIcon.defaultProps = {
  size: 20,
  color: '#FFFFFF',
};
export default SearchIcon;
