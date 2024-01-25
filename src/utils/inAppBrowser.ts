import {colors} from '@ui/core/theme';
import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

interface IOpenLinkOptions {
  readerMode?: boolean;
}

export const openLink = async (
  url: string,
  options: IOpenLinkOptions = {
    readerMode: false,
  },
) => {
  if (await InAppBrowser.isAvailable()) {
    return await InAppBrowser.open(url, {
      // iOS Properties
      dismissButtonStyle: 'done',
      preferredBarTintColor: colors.background,
      preferredControlTintColor: 'white',
      readerMode: options.readerMode,
      animated: true,
      modalPresentationStyle: 'fullScreen',
      modalTransitionStyle: 'coverVertical',
      modalEnabled: true,
      enableBarCollapsing: false,
      // Android Properties
      showTitle: false,
      toolbarColor: colors.surface,
      secondaryToolbarColor: colors.secondary,
      enableUrlBarHiding: true,
      enableDefaultShare: false,
      forceCloseOnRedirection: true,
      animations: {
        startEnter: 'fade_in',
        startExit: 'slide_out_left',
        endEnter: 'slide_in_left',
        endExit: 'slide_out_right',
      },
    });
  } else {
    Linking.openURL(url);
  }
};
