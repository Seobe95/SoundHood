const authQueryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
} as const;

const spotifyQueryKeys = {
  SPOTIFY: 'spotify',
  GET_SEARCH_RESULT: 'getSearchResult',
  GET_ACCESS_TOKEN: 'getAccessToken',
} as const;

const kakaoQueryKeys = {
  KAKAO: 'kakao',
  SEARCH_ADDRESS: 'searchAddress',
  GET_ADDRESS_FROM_COORDINATE: 'getAddressFromCoordinate',
} as const;

const postQueryKeys = {
  POST: 'post',
  READ_POST_BY_ID: 'readPostById',
  READ_POST: 'readPost',
  READ_POST_LIKE_COUNT: 'readPostLikeCount',
} as const;

const storageKeys = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  SPOTIFY_TOKEN: 'spotifyToken',
  LOCATION: 'location',
} as const;

export {
  authQueryKeys,
  storageKeys,
  spotifyQueryKeys,
  kakaoQueryKeys,
  postQueryKeys,
};
