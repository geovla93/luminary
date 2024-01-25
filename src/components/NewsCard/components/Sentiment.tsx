import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

const Sentiment = ({
  sentiment,
}: {
  sentiment: 'Positive' | 'Negative' | 'Neutral';
}) => {
  return (
    <Icon
      name={
        sentiment === 'Positive'
          ? 'emoji-happy'
          : sentiment === 'Negative'
          ? 'emoji-sad'
          : 'emoji-neutral'
      }
      size={15}
      color={
        sentiment === 'Positive'
          ? '#00C853'
          : sentiment === 'Negative'
          ? '#D50000'
          : '#2196F3'
      }
    />
  );
};

export default Sentiment;
