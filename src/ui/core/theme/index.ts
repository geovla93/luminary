import {
  adaptNavigationTheme,
  MD3DarkTheme as PaperDarkTheme,
  MD3Theme,
} from 'react-native-paper';

import {DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import merge from 'deepmerge';
import {moderateScale, scale} from 'react-native-size-matters';
import themeColors from './colors';

const {DarkTheme} = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
  materialDark: PaperDarkTheme,
});

const CombinedDefaultTheme = merge(DarkTheme, PaperDarkTheme);

const fonts = {
  ...CombinedDefaultTheme.fonts,
  displayLarge: {
    ...CombinedDefaultTheme.fonts.displayLarge,
    // fontFamily: font,
    fontSize: moderateScale(57),
  },
  displayMedium: {
    ...CombinedDefaultTheme.fonts.displayMedium,
    // fontFamily: font,
    fontSize: moderateScale(45),
  },
  displaySmall: {
    ...CombinedDefaultTheme.fonts.displaySmall,
    // fontFamily: font,
    fontSize: moderateScale(36),
  },
  headlineLarge: {
    ...CombinedDefaultTheme.fonts.headlineLarge,
    // fontFamily: font,
    fontSize: moderateScale(32),
  },
  headlineMedium: {
    ...CombinedDefaultTheme.fonts.headlineMedium,
    // fontFamily: font,
    fontSize: scale(28),
  },
  headlineSmall: {
    ...CombinedDefaultTheme.fonts.headlineSmall,
    // fontFamily: font,
    fontSize: moderateScale(24),
  },
  titleLarge: {
    ...CombinedDefaultTheme.fonts.titleLarge,
    // fontFamily: font,
    fontSize: moderateScale(22),
  },
  titleMedium: {
    ...CombinedDefaultTheme.fonts.titleMedium,
    // fontFamily: font,
    fontSize: moderateScale(16),
  },
  titleSmall: {
    ...CombinedDefaultTheme.fonts.titleSmall,
    // fontFamily: font,
    fontSize: moderateScale(14),
  },
  labelLarge: {
    ...CombinedDefaultTheme.fonts.labelLarge,
    // fontFamily: font,
    fontSize: moderateScale(14),
  },
  labelMedium: {
    ...CombinedDefaultTheme.fonts.labelMedium,
    // fontFamily: font,
    fontSize: moderateScale(12),
  },
  labelSmall: {
    ...CombinedDefaultTheme.fonts.labelSmall,
    // fontFamily: font,
    fontSize: moderateScale(12),
  },
  bodyLarge: {
    ...CombinedDefaultTheme.fonts.bodyLarge,
    // fontFamily: font,
    fontSize: moderateScale(16),
  },
  bodyMedium: {
    ...CombinedDefaultTheme.fonts.bodyMedium,
    // fontFamily: font,
    fontSize: moderateScale(14),
  },
  bodySmall: {
    ...CombinedDefaultTheme.fonts.bodySmall,
    // fontFamily: font,
    fontSize: scale(12),
  },
};

export const appTheme: MD3Theme = {
  ...CombinedDefaultTheme,
  roundness: 6,
  fonts: fonts,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: themeColors['P-80'],
    onPrimary: themeColors['P-20'],
    primaryContainer: themeColors['P-90'],
    onPrimaryContainer: themeColors['P-10'],

    secondary: themeColors['S-80'],
    onSecondary: themeColors['S-100'],
    secondaryContainer: themeColors['S-90'],
    onSecondaryContainer: themeColors['S-10'],

    tertiary: '#38342E',
    onTertiary: themeColors['T-100'],
    tertiaryContainer: themeColors['T-90'],
    onTertiaryContainer: themeColors['T-10'],

    error: themeColors['E-80'],
    onError: themeColors['E-100'],
    errorContainer: themeColors['E-90'],
    onErrorContainer: themeColors['E-10'],

    background: themeColors['N-6'],
    surface: themeColors['N-6'],
    surfaceVariant: '#221F1A',

    onSurface: themeColors['N-90'],
    backdrop: themeColors['N-20'],

    inverseSurface: themeColors['N-90'],
    inverseOnSurface: themeColors['N-20'],
  },
};

const getTheme = (): MD3Theme => {
  return appTheme;
};

export default getTheme;

export const colors = appTheme.colors;
