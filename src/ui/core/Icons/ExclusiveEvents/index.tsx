import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

interface IProps extends SvgProps {
  width: number;
  height: number;
}
const ExclusiveEvents = (props: IProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="url(#paint0_linear_1438_3461)"
      d="M11 12.4V17.5C11 17.7652 11.1054 18.0196 11.2929 18.2071C11.4804 18.3946 11.7348 18.5 12 18.5C12.2652 18.5 12.5196 18.3946 12.7071 18.2071C12.8946 18.0196 13 17.7652 13 17.5V12.4C14.214 12.1522 15.2928 11.4624 16.0272 10.4644C16.7616 9.46641 17.0992 8.23128 16.9747 6.99848C16.8501 5.76568 16.2723 4.62303 15.3532 3.79207C14.434 2.9611 13.2391 2.50102 12 2.50102C10.7609 2.50102 9.56598 2.9611 8.64685 3.79207C7.72771 4.62303 7.14986 5.76568 7.02532 6.99848C6.90078 8.23128 7.23843 9.46641 7.9728 10.4644C8.70718 11.4624 9.78596 12.1522 11 12.4ZM12 4.5C12.5933 4.5 13.1734 4.67595 13.6667 5.00559C14.1601 5.33524 14.5446 5.80377 14.7716 6.35195C14.9987 6.90013 15.0581 7.50333 14.9424 8.08527C14.8266 8.66722 14.5409 9.20177 14.1213 9.62132C13.7018 10.0409 13.1672 10.3266 12.5853 10.4424C12.0033 10.5581 11.4001 10.4987 10.8519 10.2716C10.3038 10.0446 9.83524 9.66006 9.50559 9.16671C9.17595 8.67337 9 8.09335 9 7.5C9 6.70435 9.31607 5.94129 9.87868 5.37868C10.4413 4.81607 11.2044 4.5 12 4.5ZM16.21 14.92C16.0787 14.8924 15.9432 14.891 15.8113 14.9158C15.6795 14.9405 15.5537 14.991 15.4414 15.0644C15.329 15.1378 15.2322 15.2325 15.1565 15.3433C15.0808 15.4541 15.0276 15.5787 15 15.71C14.9724 15.8413 14.971 15.9768 14.9958 16.1087C15.0205 16.2405 15.071 16.3663 15.1444 16.4786C15.2178 16.591 15.3125 16.6878 15.4233 16.7635C15.5341 16.8393 15.6587 16.8924 15.79 16.92C18.06 17.37 19 18.18 19 18.5C19 19.08 16.55 20.5 12 20.5C7.45 20.5 5 19.08 5 18.5C5 18.18 5.94 17.37 8.21 16.88C8.34132 16.8524 8.46593 16.7993 8.5767 16.7235C8.68747 16.6478 8.78224 16.551 8.8556 16.4386C8.92896 16.3263 8.97947 16.2005 9.00424 16.0687C9.02902 15.9368 9.02758 15.8013 9 15.67C8.97242 15.5387 8.91925 15.4141 8.84352 15.3033C8.76778 15.1925 8.67097 15.0978 8.55861 15.0244C8.44626 14.951 8.32055 14.9005 8.18867 14.8758C8.05679 14.851 7.92132 14.8524 7.79 14.88C4.75 15.58 3 16.89 3 18.5C3 21.13 7.53 22.5 12 22.5C16.47 22.5 21 21.13 21 18.5C21 16.89 19.25 15.58 16.21 14.92Z"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1438_3461"
        x1={4.125}
        y1={2.50102}
        x2={24.1426}
        y2={8.88656}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#ECC248" />
        <Stop offset={0.5} stopColor="#F7E696" />
        <Stop offset={1} stopColor="#ECC248" />
      </LinearGradient>
    </Defs>
  </Svg>
);

ExclusiveEvents.defaultProps = {
  width: 44,
  height: 45,
};
export default ExclusiveEvents;
