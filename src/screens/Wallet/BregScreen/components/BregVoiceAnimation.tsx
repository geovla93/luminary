import React from 'react';
import {View} from 'react-native';
import Thinking from './VoiceAnimations/Thinking';
import Speaking from './VoiceAnimations/Speaking';
import Listening from './VoiceAnimations/Listening';
import Paused from './VoiceAnimations/Paused';

const BregVoiceAnimation = ({
  state,
  setState,
}: {
  state: 'thinking' | 'speaking' | 'listening' | 'paused';
  setState: (state: 'thinking' | 'speaking' | 'listening' | 'paused') => void;
}) => {
  const renderStateComponent = () => {
    switch (state) {
      case 'thinking':
        return <Thinking />;
      case 'speaking':
        return <Speaking />;
      case 'listening':
        return <Listening />;
      case 'paused':
        return <Paused onPress={() => setState('listening')} />;
      default:
        return <View />; // Default empty view or some default component
    }
  };

  return <View style={{flex: 1}}>{renderStateComponent()}</View>;
};

export default BregVoiceAnimation;
