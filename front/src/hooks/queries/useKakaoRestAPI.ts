import {
  KakaoAddressFromCoordinateResponse,
  KakaoSearchAddressResponse,
  ResponseError,
  UseQueryCustomOptions,
} from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getAddressFromCoordinate, getSearchAddress } from '@/api';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { LatLng } from '@/hooks/map/useLocation.ts';
import { kakaoQueryKeys } from '@/constants';

function useKakaoSearchAddress(
  queryOptions?: UseQueryCustomOptions<KakaoSearchAddressResponse>,
) {
  const [searchParams, setSearchParams] = useState('');
  const { isSuccess, isError, data, error } = useQuery<
    KakaoSearchAddressResponse,
    ResponseError
  >({
    queryKey: [
      kakaoQueryKeys.KAKAO,
      kakaoQueryKeys.SEARCH_ADDRESS,
      { searchParams },
    ],
    queryFn: () => getSearchAddress({ query: searchParams }),
    enabled: searchParams === '' ? false : true,
    ...queryOptions,
  });

  const debounceSearch = useMemo(
    () =>
      debounce((param: string) => {
        setSearchParams(param);
      }, 1000),
    [],
  );

  const onChangeText = (text: string) => {
    if (text === '') {
      setSearchParams('');
      debounceSearch.cancel();
    } else {
      debounceSearch(text);
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      console.log('데이터 로드 성공', data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log('ERROR', error);
    }
  }, [isError, error]);

  return { data, isError, isSuccess, setSearchParams, onChangeText };
}

function useKakaoGetAddressFromCoordinate(
  queryOptions?: UseQueryCustomOptions<KakaoAddressFromCoordinateResponse>,
) {
  const [currentLocation, setCurrentLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  const { isSuccess, isError, data, error } = useQuery<
    KakaoAddressFromCoordinateResponse,
    ResponseError
  >({
    queryKey: [
      kakaoQueryKeys.KAKAO,
      kakaoQueryKeys.GET_ADDRESS_FROM_COORDINATE,
      currentLocation,
    ],
    queryFn: () =>
      getAddressFromCoordinate({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      }),
    enabled: currentLocation.latitude === 0 ? false : true,
    ...queryOptions,
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log('데이터 로드 성공', data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log('ERROR', error);
    }
  }, [isError, error]);

  return { data, isError, isSuccess, setCurrentLocation };
}

function useKakaoRestAPI() {
  const searchAddressQuery = useKakaoSearchAddress();
  const getAddressFromCoordinateQuery = useKakaoGetAddressFromCoordinate();

  return {
    searchAddressQuery,
    getAddressFromCoordinateQuery,
  };
}

export default useKakaoRestAPI;
