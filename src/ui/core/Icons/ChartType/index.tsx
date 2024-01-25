import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
interface Props extends SvgProps {
  size?: number;
}
const ChartType = ({size, color, ...props}: Props) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={color}
      d="M20 8.18V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2C18.7348 2 18.4804 2.10536 18.2929 2.29289C18.1054 2.48043 18 2.73478 18 3V8.18C17.4209 8.3902 16.9205 8.77363 16.5668 9.27816C16.2132 9.7827 16.0235 10.3839 16.0235 11C16.0235 11.6161 16.2132 12.2173 16.5668 12.7218C16.9205 13.2264 17.4209 13.6098 18 13.82V21C18 21.2652 18.1054 21.5196 18.2929 21.7071C18.4804 21.8946 18.7348 22 19 22C19.2652 22 19.5196 21.8946 19.7071 21.7071C19.8946 21.5196 20 21.2652 20 21V13.82C20.5792 13.6098 21.0795 13.2264 21.4332 12.7218C21.7868 12.2173 21.9765 11.6161 21.9765 11C21.9765 10.3839 21.7868 9.7827 21.4332 9.27816C21.0795 8.77363 20.5792 8.3902 20 8.18ZM19 12C18.8022 12 18.6089 11.9414 18.4444 11.8315C18.28 11.7216 18.1518 11.5654 18.0761 11.3827C18.0004 11.2 17.9806 10.9989 18.0192 10.8049C18.0578 10.6109 18.153 10.4327 18.2929 10.2929C18.4328 10.153 18.6109 10.0578 18.8049 10.0192C18.9989 9.98063 19.2 10.0004 19.3827 10.0761C19.5654 10.1518 19.7216 10.28 19.8315 10.4444C19.9414 10.6089 20 10.8022 20 11C20 11.2652 19.8946 11.5196 19.7071 11.7071C19.5196 11.8946 19.2652 12 19 12ZM13 14.18V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V14.18C10.4209 14.3902 9.92047 14.7736 9.56685 15.2782C9.21323 15.7827 9.02353 16.3839 9.02353 17C9.02353 17.6161 9.21323 18.2173 9.56685 18.7218C9.92047 19.2264 10.4209 19.6098 11 19.82V21C11 21.2652 11.1054 21.5196 11.2929 21.7071C11.4804 21.8946 11.7348 22 12 22C12.2652 22 12.5196 21.8946 12.7071 21.7071C12.8946 21.5196 13 21.2652 13 21V19.82C13.5792 19.6098 14.0795 19.2264 14.4332 18.7218C14.7868 18.2173 14.9765 17.6161 14.9765 17C14.9765 16.3839 14.7868 15.7827 14.4332 15.2782C14.0795 14.7736 13.5792 14.3902 13 14.18ZM12 18C11.8022 18 11.6089 17.9414 11.4444 17.8315C11.28 17.7216 11.1518 17.5654 11.0761 17.3827C11.0004 17.2 10.9806 16.9989 11.0192 16.8049C11.0578 16.6109 11.153 16.4327 11.2929 16.2929C11.4328 16.153 11.6109 16.0578 11.8049 16.0192C11.9989 15.9806 12.2 16.0004 12.3827 16.0761C12.5654 16.1518 12.7216 16.28 12.8315 16.4444C12.9414 16.6089 13 16.8022 13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18ZM6.00001 6.18V3C6.00001 2.73478 5.89465 2.48043 5.70711 2.29289C5.51958 2.10536 5.26522 2 5.00001 2C4.73479 2 4.48044 2.10536 4.2929 2.29289C4.10536 2.48043 4.00001 2.73478 4.00001 3V6.18C3.42085 6.3902 2.92047 6.77363 2.56685 7.27817C2.21323 7.7827 2.02353 8.38388 2.02353 9C2.02353 9.61612 2.21323 10.2173 2.56685 10.7218C2.92047 11.2264 3.42085 11.6098 4.00001 11.82V21C4.00001 21.2652 4.10536 21.5196 4.2929 21.7071C4.48044 21.8946 4.73479 22 5.00001 22C5.26522 22 5.51958 21.8946 5.70711 21.7071C5.89465 21.5196 6.00001 21.2652 6.00001 21V11.82C6.57916 11.6098 7.07955 11.2264 7.43316 10.7218C7.78678 10.2173 7.97648 9.61612 7.97648 9C7.97648 8.38388 7.78678 7.7827 7.43316 7.27817C7.07955 6.77363 6.57916 6.3902 6.00001 6.18ZM5.00001 10C4.80222 10 4.60888 9.94135 4.44444 9.83147C4.27999 9.72159 4.15181 9.56541 4.07613 9.38268C4.00044 9.19996 3.98064 8.99889 4.01922 8.80491C4.05781 8.61093 4.15305 8.43275 4.2929 8.29289C4.43275 8.15304 4.61093 8.0578 4.80492 8.01921C4.9989 7.98063 5.19996 8.00043 5.38269 8.07612C5.56542 8.15181 5.72159 8.27998 5.83148 8.44443C5.94136 8.60888 6.00001 8.80222 6.00001 9C6.00001 9.26522 5.89465 9.51957 5.70711 9.70711C5.51958 9.89464 5.26522 10 5.00001 10Z"
    />
  </Svg>
);

ChartType.defaultProps = {
  size: 24,
  color: '#ECC248',
};
export default ChartType;
