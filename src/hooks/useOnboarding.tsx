import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {IOnboardingState, setCompleted} from '@redux/slices/onboarding.slice';
import DraggableBubble from '@components/DraggableBubble';
import Sound from 'react-native-sound';
import {getFilesByLocale} from '@assets/onaudio';

interface IOnboarding {
  onboarding: IOnboardingState;
  started: boolean;
  hadUserInteraction: boolean;
  playAudioFile: (fileName: string, paused?: boolean, isLast?: boolean) => void;
  setHadUserInteraction: (hadUserInteraction: boolean) => void;
  setOnboardingStarted: (started: boolean) => void;
  setOnboardingCompleted: () => void;
}

const OnboardingContext = createContext<IOnboarding>({} as IOnboarding);

const OnboardingProvider = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch();
  const {locale} = useAppSelector(state => state.application);
  const playingFile = useRef<Sound | null>(null);
  const audioFiles = useRef<Record<string, Sound>>({});
  const onboarding = useAppSelector(state => state.onboarding);
  const [started, setOnboardingStarted] = useState(false);
  const [hadUserInteraction, setHadUserInteraction] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingLast = useRef(false);

  useEffect(() => {
    if (!onboarding.completed) {
      loadAudioFiles();
      return () => {
        if (playingFile.current?.isPlaying()) {
          playingFile.current.stop();
        }
        try {
          for (const key in audioFiles.current) {
            audioFiles.current[key].release();
          }
        } catch (e) {
          console.log(e);
        }
      };
    }
  }, [onboarding.completed, locale]);

  const loadAudioFiles = () => {
    const files = getFilesByLocale(locale);

    audioFiles.current = {
      welcome: new Sound(files.welcome),
      create_wallet: new Sound(files.create_wallet),
      backup: new Sound(files.backup),
      recover: new Sound(files.recover),
      seedphrase: new Sound(files.seedphrase),
      selecthd: new Sound(files.selecthd),
      recoverypin: new Sound(files.recoverypin),
    };
  };

  const playAudioFile = (
    fileName: string,
    paused: boolean = false,
    isLast: boolean = false,
  ) => {
    if (onboarding.completed) {
      return;
    }
    if (isLast) {
      isPlayingLast.current = true;
    }
    if (playingFile.current !== null) {
      playingFile.current?.stop();
      playingFile.current?.setCurrentTime(0);
      playingFile.current = audioFiles.current[fileName];
      if (!pausedByUser && !paused) {
        playingFile.current?.play(playCallback);
      }
    } else {
      playingFile.current = audioFiles.current[fileName];
      if (!pausedByUser && !paused) {
        playingFile.current?.play(playCallback);
      }
    }
  };

  const togglePause = (state: boolean) => {
    if (state) {
      playingFile.current?.pause();
      setPausedByUser(true);
    } else {
      playingFile.current?.play(playCallback);
      setPausedByUser(false);
    }
  };

  const setOnboardingCompleted = () => {
    dispatch(setCompleted(true));
    setHadUserInteraction(false);
    if (playingFile.current?.isPlaying()) {
      playingFile.current.stop();
    }
  };

  const playCallback = (success: boolean) => {
    if (success) {
      // end of playback
      if (isPlayingLast.current) {
        setOnboardingCompleted();
      }
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  };

  useEffect(() => {
    const i = setInterval(() => {
      const _isPlaying = playingFile.current?.isPlaying();
      if (_isPlaying && !isPlaying) {
        setIsPlaying(true);
      } else if (!_isPlaying && isPlaying) {
        setIsPlaying(false);
      }
    }, 400);
    return () => clearInterval(i);
  }, [isPlaying]);

  const handleFirstInteraction = () => {
    if (!hadUserInteraction) {
      setHadUserInteraction(true);
      audioFiles.current.welcome?.play(playCallback);
      playAudioFile('welcome');
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        started,
        onboarding,
        hadUserInteraction,
        playAudioFile,
        setOnboardingStarted,
        setHadUserInteraction,
        setOnboardingCompleted,
      }}>
      {children}
      {started && !onboarding.completed && (
        <DraggableBubble
          hadUserInteraction={hadUserInteraction}
          setHadUserInteraction={handleFirstInteraction}
          onLongPress={setOnboardingCompleted}
          isPlaying={isPlaying}
          pausedByUser={pausedByUser}
          togglePause={togglePause}
        />
      )}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;

export const useOnboarding = (): IOnboarding => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within a OnboardingProvider');
  }
  return context;
};
