import React from 'react';
import { PressableProps } from 'react-native';
import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import { Markers } from '@/api';

interface CustomMarkerProps extends PressableProps {
  marker: Markers;
  markerState: string | null;
  onTap?: () => void;
}

const CustomMarker = React.memo(
  ({ marker, markerState, onTap }: CustomMarkerProps) => {
    const width = 28;
    const height = 33.29;
    const { latitude, longitude, id } = marker;
    const props = { width, height, latitude, longitude };
    const image =
      markerState === id
        ? require('@/assets/common/marker.png')
        : require('@/assets/common/selectMarker.png');

    return (
      <NaverMapMarkerOverlay
        isHideCollidedSymbols={true}
        image={image}
        onTap={onTap}
        {...props}
      />
    );
  },
);

export default CustomMarker;
