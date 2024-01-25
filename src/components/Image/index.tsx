import {checkIpfs} from '@utils/functions';
import React, {useState} from 'react';
import {Image as NativeImage, ImageProps} from 'react-native';

const defaultImage = require('@assets/loading.gif');

const Image: React.FC<ImageProps> = ({source, ...rest}) => {
  const [imageSource, setImageSource] =
    useState<ImageProps['source']>(defaultImage);
  // is uri
  return (
    <NativeImage
      source={imageSource}
      onLoad={() => {
        if (typeof source === 'object') {
          const uri = checkIpfs(source?.uri);
          setImageSource({uri});
        } else {
          setImageSource(source);
        }
      }}
      onError={() => setImageSource(defaultImage)}
      {...rest}
    />
  );
};

export default Image;
