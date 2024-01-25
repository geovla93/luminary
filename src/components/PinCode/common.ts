import {StyleSheet} from 'react-native';
import {PinCodeT} from './types';
import {colors} from '@ui/core/theme';

const EnterSet: PinCodeT.EnterSetStyles = {
  header: {justifyContent: 'flex-start', alignItems: 'center', minHeight: 100},
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  pin: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  enteredPin: {width: 12, height: 12, borderRadius: 6},
  content: {justifyContent: 'flex-start', alignItems: 'center'},
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  button: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  buttonText: {fontSize: 20},
  footer: {justifyContent: 'center', alignItems: 'center'},
  footerText: {marginTop: 50, padding: 5, color: 'white'},
};

export const DEFAULT = {
  Options: {
    pinLength: 6,
    allowReset: true,
    disableLock: false,
    lockDuration: 60000,
    maxAttempt: 3,
    retryLockDuration: 1000,
  } as PinCodeT.Options,
  TextOptions: {
    enter: {
      subTitle: 'Enter {{pinLength}}-digit PIN to access.',
      error: 'Wrong PIN! Try again.',
      backSpace: 'Delete',
      footerText: 'Forgot PIN?',
    },
    set: {
      title: 'Set up a new PIN',
      subTitle: 'Enter {{pinLength}} digits.',
      repeat: 'Enter new PIN again.',
      error: "PIN don't match. Start the process again.",
      cancel: 'Cancel',
    },
    locked: {
      title: 'Locked',
      subTitle:
        'Your have entered wrong PIN {{maxAttempt}} times.\nThe app is temporarily locked in {{lockDuration}}.',
      lockedText: 'Time remaining until unlock:',
    },
    reset: {
      title: 'Forgot PIN?',
      subTitle: 'Remove the PIN may wipe out the app data and settings.',
      resetButton: 'Remove',
      confirm: 'Are you sure you want remove the PIN?',
      confirmButton: 'Confirm',
      footerText: 'Back',
    },
  } as PinCodeT.TextOptions,
  Styles: {
    main: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    enter: {
      ...EnterSet,
      buttonTextDisabled: {color: '#ccc'},
    },
    set: EnterSet,
    locked: {
      header: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: 100,
        textAlign: 'center',
        color: 'white',
      },
      title: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
      },
      subTitle: {textAlign: 'center', marginTop: 20, color: 'white'},
      content: {justifyContent: 'center', alignItems: 'center', padding: 10},
      lock: {
        color: 'white',
        fontWeight: 'bold',
      },
      countdown: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginTop: 20,
      },
      countdownText: {fontSize: 40, color: colors.primary},
      footer: {alignItems: 'center'},
    },
    reset: {
      header: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: 100,
        textAlign: 'center',
        color: 'white',
      },
      title: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
      },
      subTitle: {textAlign: 'center', marginTop: 20, color: 'white'},
      content: {justifyContent: 'flex-start', alignItems: 'center'},
      confirmText: {
        color: 'white',
        marginBottom: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
      resetButton: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        overflow: 'hidden',
        fontSize: 14,
      },
      footerText: {
        fontSize: 14,
        paddingHorizontal: 40,
        paddingVertical: 20,
        color: 'white',
      },
    },
  } as PinCodeT.PinCodeStyles,
};

export function millisToMinutesAndSeconds(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
