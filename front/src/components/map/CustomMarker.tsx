import React, { useRef } from 'react';
import { PressableProps } from 'react-native';
import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import { Markers } from '@/api';

interface CustomMarkerProps extends PressableProps {
  marker: Markers;
  onTap?: () => void;
}

const CustomMarker = React.memo(({ marker, onTap }: CustomMarkerProps) => {
  const width = 35;
  const height = 35;
  const { latitude, longitude, id } = marker;
  const props = { width, height, latitude, longitude };

  return (
    <NaverMapMarkerOverlay
      isHideCollidedSymbols={true}
      image={{ httpUri: marker.albumCover }}
      onTap={onTap}
      {...props}
    />
  );
});

export default CustomMarker;
