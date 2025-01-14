import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  patchProfile,
  postSignin,
  postSignup,
  ResponseToken,
  UserInfo,
} from '../../api/auth';
import {
  ResponseError,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../types/common';
import { removeEncryptedStorage, storeEncryptedStorage } from '@/utils';
import { authQueryKeys, storageKeys, toastMessages } from '@/constants';
import { removeHeader, setHeader } from '@/utils';
import { useContext, useEffect } from 'react';
import { queryClient } from '@/api';
import { ToastContext } from '@/context/ToastContext.tsx';
import { timeToMilliseconds } from '@/utils/timeToMilliseconds.ts';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  const { show } = useContext(ToastContext);
  return useMutation({
    mutationFn: postSignin,
    onSuccess: ({ accessToken, refreshToken }) => {
      storeEncryptedStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
      show({ time: 'short', message: toastMessages.LOGIN.SUCCESS });
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [authQueryKeys.AUTH, authQueryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [authQueryKeys.AUTH, authQueryKeys.GET_PROFILE],
      });
    },
    onError: error => {
      console.log('LOGIN ERROR', error.name, error.cause, error.message);
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const { data, isSuccess, isError } = useQuery<ResponseToken>({
    queryKey: [authQueryKeys.AUTH, authQueryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: timeToMilliseconds({ days: 30 }),
    refetchInterval: timeToMilliseconds({ days: 27 }),
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

function useGetProfile(queryOptions?: UseQueryCustomOptions<UserInfo>) {
  return useQuery<UserInfo, ResponseError>({
    queryKey: [authQueryKeys.AUTH, authQueryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function usePatchProfile(mutationOptions?: UseMutationCustomOptions) {
  const { show } = useContext(ToastContext);

  return useMutation({
    mutationFn: patchProfile,
    onSuccess: () => {
      show({ message: toastMessages.PATCH_PROFILE.SUCCESS, time: 'short' });
    },
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  const { show } = useContext(ToastContext);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
      show({ message: toastMessages.LOGOUT.SUCCESS, time: 'short' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [authQueryKeys.AUTH] });
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
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const patchProfileMutation = usePatchProfile();
  return {
    signupMutation,
    loginMutation,
    getProfileQuery,
    logoutMutation,
    patchProfileMutation,
  };
}

export default useAuth;
