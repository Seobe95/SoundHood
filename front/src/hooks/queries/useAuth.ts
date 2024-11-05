import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postSignin,
  postSignup,
  ResponseToken,
} from '../../api/auth';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../types/common';
import { removeEncryptedStorage, storeEncryptedStorage } from '@/utils';
import { queryKeys, storageKeys } from '@/constants';
import { removeHeader, setHeader } from '@/utils';
import { useEffect } from 'react';
import queryClient from '@/api/queryClient';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignin,
    onSuccess: ({ accessToken, refreshToken }) => {
      storeEncryptedStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    onError: error => {
      console.log(error.name, error.cause, error.message);
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const { data, isSuccess, isError } = useQuery<ResponseToken>({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess && data.accessToken) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      storeEncryptedStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return { isSuccess, isError };
}

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH] });
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
}

export default useAuth;
