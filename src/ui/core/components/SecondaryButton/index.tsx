import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@ui/core/theme';
import {Typography} from '@ui/core/components';
import React from 'react';

const SecondaryButton = ({
  action,
  icon,
  children,
}: {
  action: () => void;
  icon?: string;
  children: React.ReactNode | string;
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={{
        borderRadius: 40,
        paddingVertical: 9,
        paddingHorizontal: 10,
        borderColor: '#989080',
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        width: 50,
        flexGrow: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
      }}>
      {!!icon && (
        <Icon
          name={icon}
          size={16}
          color={colors.primary}
          style={{marginRight: 0}}
        />
      )}

      <Typography
        variant="bodySmall"
        sx={{
          color: colors.primary,
          fontFamily: 'Roboto-Medium',
          paddingLeft: 5,
        }}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
