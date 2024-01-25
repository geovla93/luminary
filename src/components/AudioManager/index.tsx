import React, {
  createContext,
  useContext,
  ReactNode,
  useRef,
  useEffect,
} from 'react';
import Sound from 'react-native-sound';

interface AudioManagerContextProps {
  playRefreshSound: () => void;
  playBregSound: () => void;
  getAudioFile: (fileUri: string) => any;
}

const AudioManagerContext = createContext<AudioManagerContextProps>(
  {} as AudioManagerContextProps,
);

interface AudioManagerProps {
  children: ReactNode;
}

const AudioManager = ({children}: AudioManagerProps) => {
  const refreshSound = useRef<any>(null);
  const bregSound = useRef<any>(null);

  useEffect(() => {
    refreshSound.current = new Sound(
      require('../../assets/sounds/refresh.mp3'),
    );
    bregSound.current = new Sound(require('../../assets/sounds/breg.mp3'));
  }, []);

  const playRefreshSound = () => {
    try {
      refreshSound.current.setCurrentTime(0);
      refreshSound.current.play();
    } catch (error) {
      console.log(error);
    }
  };

  const playBregSound = () => {
    try {
      bregSound.current.setCurrentTime(0);
      bregSound.current.play();
    } catch (error) {
      console.log(error);
    }
  };

  const getAudioFile = (fileUri: string) => {
    try {
      const sound = new Sound(fileUri);
      sound.setCurrentTime(0);
      return sound;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AudioManagerContext.Provider
      value={{
        playRefreshSound,
        playBregSound,
        getAudioFile,
      }}>
      {children}
    </AudioManagerContext.Provider>
  );
};

export default AudioManager;

export const useAudioManager = () => useContext(AudioManagerContext);
