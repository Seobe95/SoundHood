import { storageKeys } from '@/constants';
import { apiInstance } from './axios';
import { getEncryptedStorage } from '@/utils';
import { Profile } from '@/types/domain';

type RequestUser = {
  email: string;
  password: string;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

export type UserInfo = {
  id: number;
  nickname: string;
  imageUrl: string;
  loginType: 'email' | 'kakao' | 'apple';
  kakaoImageUri?: string;
};

type ResponseProfile = Profile;

const postSignup = async ({ email, password }: RequestUser) => {
  const { data } = await apiInstance.post('/auth/signup', {
    email,
    password,
  });
  return data;
};

const postSignin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const { data } = await apiInstance.post('/auth/signin', {
    email,
    password,
  });
  return data;
};

const postKakaoSignIn = async ({
  token,
}: {
  token: string;
}): Promise<ResponseToken> => {
  const { data } = await apiInstance.post('/auth/oauth/kakao', { token });
  return data;
};

const postAppleSignIn = async (appleIdentity: {
  identityToken: string;
  appId: string;
  authorizationCode: string;
}): Promise<ResponseToken> => {
  const { appId, identityToken, authorizationCode } = appleIdentity;
  const { data } = await apiInstance.post('/auth/oauth/apple', {
    appId,
    identityToken,
    authorizationCode,
  });

  return data;
};

const getProfile = async (): Promise<UserInfo> => {
  const { data } = await apiInstance.get('/auth/me');
  return data;
};

const getAccessToken = async () => {
  const refreshToken = await getEncryptedStorage(storageKeys.REFRESH_TOKEN);
  const { data } = await apiInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return data;
};

const patchProfile = async (nickname: string) => {
  const { data } = await apiInstance.patch('/auth/me', { nickname });
  return data;
};

const logout = async () => {
  await apiInstance.post('/auth/logout');
};

const deleteAccount = async () => {
  await apiInstance.delete('/auth/me');
};

export {
  postSignup,
  postSignin,
  postKakaoSignIn,
  postAppleSignIn,
  getProfile,
  getAccessToken,
  patchProfile,
  logout,
  deleteAccount,
};
export type { ResponseToken };
