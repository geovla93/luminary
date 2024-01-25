import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
interface Props extends SvgProps {
  size?: number;
}
const ScanQrIcon = ({size, color, ...props}: Props) => (
  <Svg width={size} height={size} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      fill={color}
      d="M6.66668 17.5H3.33334C3.11233 17.5 2.90037 17.4122 2.74409 17.2559C2.58781 17.0997 2.50001 16.8877 2.50001 16.6667V13.3333C2.50001 13.1123 2.41221 12.9004 2.25593 12.7441C2.09965 12.5878 1.88769 12.5 1.66668 12.5C1.44566 12.5 1.2337 12.5878 1.07742 12.7441C0.921141 12.9004 0.833344 13.1123 0.833344 13.3333V16.6667C0.833344 17.3297 1.09674 17.9656 1.56558 18.4344C2.03442 18.9033 2.6703 19.1667 3.33334 19.1667H6.66668C6.88769 19.1667 7.09965 19.0789 7.25593 18.9226C7.41221 18.7663 7.50001 18.5544 7.50001 18.3333C7.50001 18.1123 7.41221 17.9004 7.25593 17.7441C7.09965 17.5878 6.88769 17.5 6.66668 17.5ZM18.3333 12.5C18.1123 12.5 17.9004 12.5878 17.7441 12.7441C17.5878 12.9004 17.5 13.1123 17.5 13.3333V16.6667C17.5 16.8877 17.4122 17.0997 17.2559 17.2559C17.0997 17.4122 16.8877 17.5 16.6667 17.5H13.3333C13.1123 17.5 12.9004 17.5878 12.7441 17.7441C12.5878 17.9004 12.5 18.1123 12.5 18.3333C12.5 18.5544 12.5878 18.7663 12.7441 18.9226C12.9004 19.0789 13.1123 19.1667 13.3333 19.1667H16.6667C17.3297 19.1667 17.9656 18.9033 18.4344 18.4344C18.9033 17.9656 19.1667 17.3297 19.1667 16.6667V13.3333C19.1667 13.1123 19.0789 12.9004 18.9226 12.7441C18.7663 12.5878 18.5544 12.5 18.3333 12.5ZM16.6667 0.833344H13.3333C13.1123 0.833344 12.9004 0.921141 12.7441 1.07742C12.5878 1.2337 12.5 1.44566 12.5 1.66668C12.5 1.88769 12.5878 2.09965 12.7441 2.25593C12.9004 2.41221 13.1123 2.50001 13.3333 2.50001H16.6667C16.8877 2.50001 17.0997 2.58781 17.2559 2.74409C17.4122 2.90037 17.5 3.11233 17.5 3.33334V6.66668C17.5 6.88769 17.5878 7.09965 17.7441 7.25593C17.9004 7.41221 18.1123 7.50001 18.3333 7.50001C18.5544 7.50001 18.7663 7.41221 18.9226 7.25593C19.0789 7.09965 19.1667 6.88769 19.1667 6.66668V3.33334C19.1667 2.6703 18.9033 2.03442 18.4344 1.56558C17.9656 1.09674 17.3297 0.833344 16.6667 0.833344ZM1.66668 7.50001C1.88769 7.50001 2.09965 7.41221 2.25593 7.25593C2.41221 7.09965 2.50001 6.88769 2.50001 6.66668V3.33334C2.50001 3.11233 2.58781 2.90037 2.74409 2.74409C2.90037 2.58781 3.11233 2.50001 3.33334 2.50001H6.66668C6.88769 2.50001 7.09965 2.41221 7.25593 2.25593C7.41221 2.09965 7.50001 1.88769 7.50001 1.66668C7.50001 1.44566 7.41221 1.2337 7.25593 1.07742C7.09965 0.921141 6.88769 0.833344 6.66668 0.833344H3.33334C2.6703 0.833344 2.03442 1.09674 1.56558 1.56558C1.09674 2.03442 0.833344 2.6703 0.833344 3.33334V6.66668C0.833344 6.88769 0.921141 7.09965 1.07742 7.25593C1.2337 7.41221 1.44566 7.50001 1.66668 7.50001ZM8.33334 4.16668H5.00001C4.779 4.16668 4.56703 4.25447 4.41075 4.41075C4.25447 4.56703 4.16668 4.779 4.16668 5.00001V8.33334C4.16668 8.55436 4.25447 8.76632 4.41075 8.9226C4.56703 9.07888 4.779 9.16668 5.00001 9.16668H8.33334C8.55436 9.16668 8.76632 9.07888 8.9226 8.9226C9.07888 8.76632 9.16668 8.55436 9.16668 8.33334V5.00001C9.16668 4.779 9.07888 4.56703 8.9226 4.41075C8.76632 4.25447 8.55436 4.16668 8.33334 4.16668ZM7.50001 7.50001H5.83334V5.83334H7.50001V7.50001ZM11.6667 9.16668H15C15.221 9.16668 15.433 9.07888 15.5893 8.9226C15.7455 8.76632 15.8333 8.55436 15.8333 8.33334V5.00001C15.8333 4.779 15.7455 4.56703 15.5893 4.41075C15.433 4.25447 15.221 4.16668 15 4.16668H11.6667C11.4457 4.16668 11.2337 4.25447 11.0774 4.41075C10.9211 4.56703 10.8333 4.779 10.8333 5.00001V8.33334C10.8333 8.55436 10.9211 8.76632 11.0774 8.9226C11.2337 9.07888 11.4457 9.16668 11.6667 9.16668ZM12.5 5.83334H14.1667V7.50001H12.5V5.83334ZM8.33334 10.8333H5.00001C4.779 10.8333 4.56703 10.9211 4.41075 11.0774C4.25447 11.2337 4.16668 11.4457 4.16668 11.6667V15C4.16668 15.221 4.25447 15.433 4.41075 15.5893C4.56703 15.7455 4.779 15.8333 5.00001 15.8333H8.33334C8.55436 15.8333 8.76632 15.7455 8.9226 15.5893C9.07888 15.433 9.16668 15.221 9.16668 15V11.6667C9.16668 11.4457 9.07888 11.2337 8.9226 11.0774C8.76632 10.9211 8.55436 10.8333 8.33334 10.8333ZM7.50001 14.1667H5.83334V12.5H7.50001V14.1667ZM11.6667 13.3333C11.8877 13.3333 12.0997 13.2455 12.2559 13.0893C12.4122 12.933 12.5 12.721 12.5 12.5C12.721 12.5 12.933 12.4122 13.0893 12.2559C13.2455 12.0997 13.3333 11.8877 13.3333 11.6667C13.3333 11.4457 13.2455 11.2337 13.0893 11.0774C12.933 10.9211 12.721 10.8333 12.5 10.8333H11.6667C11.4457 10.8333 11.2337 10.9211 11.0774 11.0774C10.9211 11.2337 10.8333 11.4457 10.8333 11.6667V12.5C10.8333 12.721 10.9211 12.933 11.0774 13.0893C11.2337 13.2455 11.4457 13.3333 11.6667 13.3333ZM15 10.8333C14.779 10.8333 14.567 10.9211 14.4108 11.0774C14.2545 11.2337 14.1667 11.4457 14.1667 11.6667V14.1667C13.9457 14.1667 13.7337 14.2545 13.5774 14.4108C13.4211 14.567 13.3333 14.779 13.3333 15C13.3333 15.221 13.4211 15.433 13.5774 15.5893C13.7337 15.7455 13.9457 15.8333 14.1667 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V11.6667C15.8333 11.4457 15.7455 11.2337 15.5893 11.0774C15.433 10.9211 15.221 10.8333 15 10.8333ZM11.6667 14.1667C11.5019 14.1667 11.3407 14.2155 11.2037 14.3071C11.0667 14.3987 10.9598 14.5288 10.8968 14.6811C10.8337 14.8334 10.8172 15.0009 10.8494 15.1626C10.8815 15.3242 10.9609 15.4727 11.0774 15.5893C11.194 15.7058 11.3425 15.7852 11.5041 15.8173C11.6658 15.8495 11.8333 15.833 11.9856 15.7699C12.1379 15.7068 12.268 15.6 12.3596 15.463C12.4511 15.3259 12.5 15.1648 12.5 15C12.5 14.779 12.4122 14.567 12.2559 14.4108C12.0997 14.2545 11.8877 14.1667 11.6667 14.1667Z"
    />
  </Svg>
);

ScanQrIcon.defaultProps = {
  size: 24,
  color: '#FFFFFF',
};
export default ScanQrIcon;