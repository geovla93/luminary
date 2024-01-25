import React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
}

const IluminaryIcon = ({size}: Props) => (
  <Svg width={size} height={size} viewBox="0 0 32 40" fill="none">
    <G id="Asset_1_1">
      <Path
        id="Vector"
        d="M31.418 20.6988L16 0L0.582007 20.6988L0.106384 21.3566L7.25173 30.0413L7.4767 30.6086L11.053 39.5965L11.2132 40H20.7868L20.947 39.5965L24.5233 30.6086L24.7483 30.0413L31.8936 21.3566L31.418 20.6988ZM16.4539 27.3842H15.4636V22.7992L15.7325 22.1499L15.7387 22.134C15.7387 22.134 15.5056 4.40662 15.9587 4.40395C16.4539 4.40103 16.1654 22.134 16.1654 22.134L16.1874 22.1793L16.4539 22.7258V27.3842ZM22.5658 31.4816L21.5583 32.6761L17.7057 37.249L17.8316 39.5965H17.1823L17.1004 37.1939L17.4795 36.7477L22.8825 30.3848L30.4154 21.5131L23.934 12.6071L23.8325 12.4677L16 1.70564L8.16752 12.4677L8.06604 12.6071L1.58461 21.5131L9.11754 30.3848L14.5206 36.7477L14.8996 37.1939L14.8177 39.5965H14.1684L14.2944 37.249L10.4417 32.6761L9.43422 31.4816L1.0344 21.5131L16 0.88033L30.9656 21.5131L22.5658 31.4816ZM23.2627 12.5997L24.0318 16.0868L25.0234 20.5777L22.0523 30.8666L17.4795 35.6546L17.3755 35.7634V27.4003L23.7579 21.5681L23.2627 12.5997ZM8.2421 21.5681L14.6245 27.4003V35.7634L9.94774 30.8666L6.97663 20.5777L7.96822 16.0868L8.73729 12.5997L8.2421 21.5681Z"
        fill="url(#paint0_linear_341_49)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_341_49"
        x1="2.09309"
        y1="1.84269e-06"
        x2="38.178"
        y2="10.1634"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#ECC248" />
        <Stop offset="0.5" stopColor="#F7E696" />
        <Stop offset="1" stopColor="#ECC248" />
      </LinearGradient>
    </Defs>
  </Svg>
);

IluminaryIcon.defaultProps = {
  size: 32,
};

export default IluminaryIcon;