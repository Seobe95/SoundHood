import { MutationFunction, useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteAccount,
  getAccessToken,
  getProfile,
  logout,
  patchProfile,
  postAppleSignIn,
  postKakaoSignIn,
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

function useLogin<T>(
  loginApi: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  const { show } = useContext(ToastContext);
  return useMutation({
    mutationFn: loginApi,
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

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postSignin, mutationOptions);
}

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postKakaoSignIn, mutationOptions);
}

function useAppleLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postAppleSignIn, mutationOptions);
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
    ...mutationOptions,
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

function useDeleteAccount(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteAccount,
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const loginMutation = useEmailLogin();
  const logoutMutation = useLogout();
  const patchProfileMutation = usePatchProfile();
  const kakaoSignInMutation = useKakaoLogin();
  const appleSignInMutation = useAppleLogin();
  const deleteAccountMutation = useDeleteAccount();
  return {
    signupMutation,
    loginMutation,
    getProfileQuery,
    logoutMutation,
    patchProfileMutation,
    kakaoSignInMutation,
    appleSignInMutation,
    deleteAccountMutation,
  };
}

export default useAuth;
