import * as React from 'react';
import {colors} from '@ui/core/theme';
import Svg, {SvgProps, Path} from 'react-native-svg';

const ArrowAngleRight = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 37 37" fill="none" {...props}>
    <Path
      fill={colors.primary}
      d="M24.161 17.0974L15.671 8.62241C15.5315 8.48182 15.3656 8.37022 15.1828 8.29407C15.0001 8.21792 14.804 8.17871 14.606 8.17871C14.408 8.17871 14.2119 8.21792 14.0291 8.29407C13.8463 8.37022 13.6804 8.48182 13.541 8.62241C13.2616 8.90345 13.1048 9.28363 13.1048 9.67991C13.1048 10.0762 13.2616 10.4564 13.541 10.7374L20.966 18.2374L13.541 25.6624C13.2616 25.9435 13.1048 26.3236 13.1048 26.7199C13.1048 27.1162 13.2616 27.4964 13.541 27.7774C13.6799 27.9191 13.8456 28.0319 14.0284 28.1091C14.2112 28.1864 14.4075 28.2266 14.606 28.2274C14.8044 28.2266 15.0008 28.1864 15.1836 28.1091C15.3664 28.0319 15.5321 27.9191 15.671 27.7774L24.161 19.3024C24.3132 19.1619 24.4348 18.9915 24.5179 18.8017C24.601 18.612 24.6439 18.4071 24.6439 18.1999C24.6439 17.9928 24.601 17.7878 24.5179 17.5981C24.4348 17.4084 24.3132 17.2379 24.161 17.0974V17.0974Z"
    />
  </Svg>
);
export default ArrowAngleRight;
