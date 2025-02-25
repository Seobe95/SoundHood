import encodeBase64 from '@/utils/base64';
import axios from 'axios';
import Config from 'react-native-config';
import { spotifyInstance } from './axios';

export type SpotifyResponseToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export interface SongType {
  tracks: Tracks;
}

export interface Tracks {
  items: TrackItems[];
}

export interface TrackItems {
  id: string;
  album: Album;
  artists: Artist[];
  name: string;
  disc_number: number;
  external_urls: {
    spotify: string;
  };
}

interface Album {
  images: CoverImage[];
  artists: Artist[];
  name: string;
  id: string;
}

interface CoverImage {
  url: string;
  height: number;
  width: number;
}

interface Artist {
  name: string;
}

export interface GetSearchResultsParams {
  query: string;
  limit?: number;
}

const getSpotifyAccessToken = async (): Promise<SpotifyResponseToken> => {
  const clientId = Config.SPOTIFY_CLIENT_ID;
  const clientSecret = Config.SPOTIFY_CLIENT_SECRET;
  const authorizationKey = encodeBase64(`${clientId}:${clientSecret}`);
  const { data } = await axios.post<SpotifyResponseToken>(
    'https://accounts.spotify.com/api/token',
    { grant_type: 'client_credentials' },
    {
      headers: {
        Authorization: `Basic ${authorizationKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return data;
};

const getSearchResults = async ({
  query,
  limit = 10,
}: GetSearchResultsParams): Promise<TrackItems[]> => {
  const params = new URLSearchParams({
    q: query,
    type: 'track',
    market: 'KR',
    limit: `${limit}`,
  }).toString();

  const { data } = await spotifyInstance.get<SongType>(
    `https://api.spotify.com/v1/search?${params}`,
  );
  return data.tracks.items;
};

export { getSpotifyAccessToken, getSearchResults };
