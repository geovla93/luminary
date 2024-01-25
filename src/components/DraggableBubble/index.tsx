import React, {useRef} from 'react';
import {
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Alert,
  Text,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {colors} from '@ui/core/theme';
import Tooltip from 'react-native-walkthrough-tooltip';
import {Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DraggableBubble = ({
  hadUserInteraction,
  isPlaying,
  togglePause,
  pausedByUser,
  setHadUserInteraction,
  onLongPress,
}: {
  hadUserInteraction: boolean;
  isPlaying: boolean;
  setHadUserInteraction: (hadUserInteraction: boolean) => void;
  togglePause: (state: boolean) => void;
  pausedByUser: boolean;
  onLongPress: () => void;
}) => {
  const {formatMessage} = useIntl();
  const tabBarHeight = 70;
  const gridSize = 100;
  const bubbleSize = 80;

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const defaultPosition = {
    x: screenWidth - bubbleSize - 10,
    y: screenHeight - tabBarHeight - 100,
  };

  const pan = useRef(new Animated.ValueXY(defaultPosition)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();

        // Calculate the maximum allowed x-coordinate for snapping
        const maxX = screenWidth - bubbleSize;
        // Snap to the nearest grid point within screen bounds
        const snappedX = Math.min(
          Math.max(0, Math.round(pan.x._value / gridSize) * gridSize),
          maxX,
        );

        Animated.spring(pan, {
          toValue: {x: snappedX, y: pan.y._value},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  const handlePress = () => {
    togglePause(!pausedByUser);
  };

  const handleLongPress = () => {
    Alert.alert(formatMessage({id: 'guidance_close'}), '', [
      {
        text: formatMessage({id: 'guidance_close_ok'}),
        onPress: () => onLongPress(),
      },
      {text: formatMessage({id: 'guidance_close_cancel'}), onPress: () => {}},
    ]);
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [{translateX: pan.x}, {translateY: pan.y}],
        height: bubbleSize,
        width: bubbleSize,
        borderRadius: bubbleSize / 2,
        backgroundColor: colors.backdrop,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
        position: 'absolute',
      }}>
      {!hadUserInteraction && (
        <Tooltip
          isVisible={!hadUserInteraction}
          content={
            <Typography color="black" variant="bodySmall">
              {formatMessage({id: 'guidance_start'})}
            </Typography>
          }
          placement="top"
          onClose={() => setHadUserInteraction(true)}>
          <Image
            style={{width: 60, height: 60, objectFit: 'contain'}}
            source={require('@assets/logo.png')}
          />
        </Tooltip>
      )}
      {hadUserInteraction && (
        <TouchableOpacity
          style={{
            width: bubbleSize,
            height: bubbleSize,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handlePress}
          onLongPress={handleLongPress}>
          {isPlaying ? (
            <LottieView
              source={require('@assets/animations/speaking.json')}
              autoPlay
              loop
              style={{width: bubbleSize, height: bubbleSize}}
            />
          ) : (
            <Icon name="play" size={50} color={colors.primary} />
          )}
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default DraggableBubble;
