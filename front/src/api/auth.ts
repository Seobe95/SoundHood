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

const logout = async () => {
  await apiInstance.post('/auth/logout');
};

export { postSignup, postSignin, getProfile, getAccessToken, logout };
export type { ResponseToken };
