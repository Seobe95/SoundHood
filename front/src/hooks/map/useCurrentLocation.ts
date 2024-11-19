import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import useKakaoRestAPI from '@/hooks/queries/useKakaoRestAPI.ts';
import { LatLng } from '@/hooks/map/useLocation.ts';

function useCurrentLocation() {
  const { getAddressFromCoordinateQuery } = useKakaoRestAPI();
  const [location, setLocation] = useState<LatLng | null>(null);
  const { setCurrentLocation, data, isSuccess } = getAddressFromCoordinateQuery;
  const [addressName, setAddressName] = useState<string | null>(null);

  useEffect(() => {
    async function changeCurrentLocationToAddressName() {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setCurrentLocation({ latitude, longitude });
          setLocation({ latitude, longitude });
          if (data) {
            const arr = data.documents[1].address_name.split(' ');
            setAddressName(arr[arr.length - 1]);
          }
        },
        error => {
          console.log(error.message, error.code);
        },
      );
    }
    changeCurrentLocationToAddressName();
  }, [setCurrentLocation, data, isSuccess]);

  return { addressName, location };
}

export default useCurrentLocation;
