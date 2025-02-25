import { spotifyInstance } from '@/api/axios';
import {
  getSearchResults,
  getSpotifyAccessToken,
  SpotifyResponseToken,
  TrackItems,
} from '@/api/spotify';
import { useSearchSpotifyStore } from '@/stores/useSpotifySearchStore';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { ResponseError, UseQueryCustomOptions } from '@/types';
import { spotifyQueryKeys } from '@/constants';

function useGetSpotifyAccessToken(
  queryOptions?: UseQueryCustomOptions<SpotifyResponseToken>,
) {
  const { data, isSuccess, isError } = useQuery<
    SpotifyResponseToken,
    ResponseError
  >({
    queryKey: [spotifyQueryKeys.SPOTIFY, spotifyQueryKeys.GET_ACCESS_TOKEN],
    queryFn: getSpotifyAccessToken,
    staleTime: 3540 * 1000,
    refetchInterval: 3540 * 1000,
    ...queryOptions,
  });
  useEffect(() => {
    if (isSuccess && data?.access_token) {
      console.log(data.access_token);
      spotifyInstance.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
    }
  }, [isSuccess, data]);

  return { isSuccess, isError };
}

function useSearchSongs(
  query: string,
  limit = 10,
  queryOptions?: UseQueryCustomOptions<TrackItems[]>,
) {
  const { setSearchSongs } = useSearchSpotifyStore();
  const { isError, isSuccess, data, error } = useQuery<
    TrackItems[],
    ResponseError
  >({
    queryKey: [
      spotifyQueryKeys.SPOTIFY,
      spotifyQueryKeys.GET_SEARCH_RESULT,
      { query, limit },
    ],
    queryFn: () => getSearchResults({ query, limit }),
    enabled: query === '' ? false : true,
    ...queryOptions,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setSearchSongs(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log('ERROR', error);
    }
  }, [isError, error]);

  return { data, isError, isSuccess };
}

function useSpotify(limit = 10) {
  const [searchParams, setSearchParams] = useState('');
  const { setSearchSongs } = useSearchSpotifyStore();
  const debounceSearch = useMemo(
    () =>
      debounce((param: string) => {
        setSearchParams(param);
      }, 1000),
    [],
  );
  const onChangeText = (text: string) => {
    if (text === '') {
      setSearchSongs(null);
      setSearchParams('');
      debounceSearch.cancel();
    } else {
      debounceSearch(text);
    }
  };
  const spotifySearchQuery = useSearchSongs(searchParams, limit);

  return { spotifySearchQuery, onChangeText };
}

export { useGetSpotifyAccessToken, useSpotify };
