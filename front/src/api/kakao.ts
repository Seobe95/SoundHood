import { kakaoAPIInstance } from '@/api/axios.ts';
import Config from 'react-native-config';
import {
  KakaoAddressFromCoordinateResponse,
  KakaoSearchAddressResponse,
} from '@/types';

type GetSearchAddressParams = {
  query: string;
};

const getSearchAddress = async ({ query }: GetSearchAddressParams) => {
  const params = new URLSearchParams({
    query: query,
    analyze_type: 'similar',
  }).toString();

  const result = await kakaoAPIInstance.get<KakaoSearchAddressResponse>(
    `/search/address.json?${params}`,
    {
      headers: {
        Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
      },
    },
  );
  console.log(result);
  return result;
};

type GetAddressFromCoordinate = {
  latitude: number;
  longitude: number;
};

const getAddressFromCoordinate = async ({
  latitude,
  longitude,
}: GetAddressFromCoordinate) => {
  const params = new URLSearchParams({
    x: `${longitude}`,
    y: `${latitude}`,
  }).toString();
  const result = await kakaoAPIInstance.get<KakaoAddressFromCoordinateResponse>(
    `/geo/coord2regioncode?${params}`,
    {
      headers: {
        Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
      },
    },
  );
  console.log(result);
  return result;
};

export { getSearchAddress, getAddressFromCoordinate };
