import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const FlameIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#ECC248"
      d="m8.468 8.395-.002.001-.003.002.005-.003Zm9.954-.187a1.24 1.24 0 0 0-.23-.175 1 1 0 0 0-1.4.411 5.783 5.783 0 0 1-1.398 1.778 8.714 8.714 0 0 0-4.267-9.092 1 1 0 0 0-1.49.806 7.017 7.017 0 0 1-2.472 4.942l-.23.187a8.513 8.513 0 0 0-1.988 1.863 8.984 8.984 0 0 0 3.656 13.908.998.998 0 0 0 1.327-1.238 6.977 6.977 0 0 1-.19-2.581 9.004 9.004 0 0 0 4.313 4.016c.225.101.48.115.715.038a8.994 8.994 0 0 0 3.654-14.863Zm-3.905 12.831a6.965 6.965 0 0 1-3.577-4.402 8.926 8.926 0 0 1-.18-.964 1 1 0 0 0-1.857-.362 8.958 8.958 0 0 0-1.205 4.717 6.985 6.985 0 0 1-1.176-9.868 6.554 6.554 0 0 1 1.562-1.458.745.745 0 0 0 .075-.055s.296-.245.306-.25a8.967 8.967 0 0 0 2.9-4.633 6.736 6.736 0 0 1 1.386 8.088.999.999 0 0 0 1.183 1.418 7.856 7.856 0 0 0 3.862-2.688 7.002 7.002 0 0 1-3.279 10.457Z"
    />
  </Svg>
);
export default FlameIcon;
