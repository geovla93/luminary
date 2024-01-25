import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SecurityPhraseIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M15 12.5a1 1 0 0 0-.91.6 4 4 0 1 0 .55 6.4 1.001 1.001 0 0 0-.981-1.714 1 1 0 0 0-.339.214 2 2 0 0 1-1.32.5 2 2 0 1 1 1-3.75h-.22a1 1 0 0 0 0 2H15a1 1 0 0 0 1-1V13.5a1 1 0 0 0-1-1Zm3.42-4.78A7 7 0 0 0 5.06 9.61a4 4 0 0 0-.38 7.66c.104.032.211.049.32.05a1.013 1.013 0 1 0 .32-2A2 2 0 0 1 4 13.5a2 2 0 0 1 2-2 1 1 0 0 0 1-1 5 5 0 0 1 9.73-1.61 1 1 0 0 0 .78.67 3 3 0 0 1 1 5.53 1.003 1.003 0 0 0 1 1.74A5 5 0 0 0 22 12.5a5 5 0 0 0-3.58-4.78Z"
    />
  </Svg>
);
export default SecurityPhraseIcon;
