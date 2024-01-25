import React from 'react';
import {useTheme} from 'react-native-paper';

import Typography from '@ui/core/components/Typography';
import {useIntl} from 'react-intl';
import {verticalScale} from 'react-native-size-matters';
interface Props {
  title?: string;
  subtitle?: string;
  info?: string;
}
const OnboardingHeader = ({title, subtitle, info}: Props) => {
  const {formatMessage} = useIntl();
  const theme = useTheme();
  return (
    <>
      {title && (
        <Typography
          sx={{marginTop: verticalScale(10), color: theme.colors.onSecondary}}
          variant="headlineMedium">
          {formatMessage({
            id: title,
          })}
        </Typography>
      )}
      {subtitle && (
        <Typography sx={{marginTop: verticalScale(10)}} variant="bodySmall">
          {formatMessage({
            id: subtitle,
          })}
        </Typography>
      )}
      {info && (
        <Typography
          sx={{
            marginTop: verticalScale(10),
            color: 'white',
            fontWeight: 'bold',
          }}
          variant="bodyMedium">
          {formatMessage({
            id: info,
          })}
        </Typography>
      )}
    </>
  );
};

OnboardingHeader.defaultProps = {
  showBack: true,
};

export default OnboardingHeader;
