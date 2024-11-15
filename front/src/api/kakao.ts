import { kakaoAPIInstance } from '@/api/axios.ts';
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

  const { data } = await kakaoAPIInstance.get<KakaoSearchAddressResponse>(
    `/search/address.json?${params}`,
  );
  return data;
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
  const { data } =
    await kakaoAPIInstance.get<KakaoAddressFromCoordinateResponse>(
      `/geo/coord2regioncode?${params}`,
    );
  return data;
};

export { getSearchAddress, getAddressFromCoordinate };
