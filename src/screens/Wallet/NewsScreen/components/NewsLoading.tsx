import React from 'react';

import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const NewsLoading = () => (
  <ContentLoader
    animate
    style={{width: '100%', height: 50}}
    viewBox="0 0 380 70">
    <Circle fill="red" cx="30" cy="30" r="30" />
    <Rect fill="red" x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);

export default NewsLoading;
