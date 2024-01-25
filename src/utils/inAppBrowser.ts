import {colors} from '@ui/core/theme';
import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export const openLink = async (url: string) => {
  if (await InAppBrowser.isAvailable()) {
    return await InAppBrowser.open(url, {
      // iOS Properties
      dismissButtonStyle: 'cancel',
      preferredBarTintColor: colors.surface,
      preferredControlTintColor: 'white',
      readerMode: false,
      animated: true,
      modalPresentationStyle: 'fullScreen',
      modalTransitionStyle: 'coverVertical',
      modalEnabled: true,
      enableBarCollapsing: true,
      // Android Properties
      showTitle: true,
      toolbarColor: colors.surface,
      secondaryToolbarColor: colors.secondary,
      enableUrlBarHiding: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: true,
      // Specify full animation resource identifier(package:anim/name)
      // or only resource name(in case of animation bundled with app).
      animations: {
        startEnter: 'slide_in_right',
        startExit: 'slide_out_left',
        endEnter: 'slide_in_left',
        endExit: 'slide_out_right',
      },
    });
  } else {
    Linking.openURL(url);
  }
};
