import {
  ResponseError,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '@/types';
import {
  createPost,
  CreatePostParams,
  deletePost,
  getMarkers,
  getMyPosts,
  getUsersLikePosts,
  Markers,
  Post,
  PostByIdParams,
  queryClient,
  readPostById,
  readPosts,
  updateLikePost,
  updatePost,
  UpdatePostParams,
} from '@/api';
import {
  QueryFunction,
  QueryKey,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { postQueryKeys, toastMessages } from '@/constants';
import { useContext, useEffect } from 'react';
import { ToastContext } from '@/context/ToastContext.tsx';

type QueryCustomType<T = {}> = {
  mutationOptions?: UseMutationCustomOptions;
  queryOptions?: UseQueryCustomOptions<T>;
};

type UseReadPostByIdParams = PostByIdParams &
  Pick<QueryCustomType<Post>, 'queryOptions'>;

function useReadPostById({ id, queryOptions }: UseReadPostByIdParams) {
  return useQuery<Post, ResponseError>({
    queryKey: [postQueryKeys.POST, postQueryKeys.READ_POST_BY_ID, { id }],
    queryFn: () => readPostById({ id }),
    refetchOnMount: 'always',
    ...queryOptions,
  });
}

function useReadMarkers(queryOptions?: UseQueryCustomOptions<Markers[]>) {
  const { show } = useContext(ToastContext);
  const { data, isSuccess, isError, isLoading, refetch } = useQuery<
    Markers[],
    ResponseError
  >({
    queryKey: [postQueryKeys.GET_MAKERS],
    queryFn: getMarkers,
    refetchOnMount: 'always',
    ...queryOptions,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log('SUCCESS');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      show({ message: toastMessages.MAP.ERROR, time: 'long' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return { data, isSuccess, isError, isLoading, refetch };
}

type UseReadPosts = Pick<QueryCustomType<Post[]>, 'queryOptions'>;

function useReadPosts({ queryOptions }: UseReadPosts) {
  return useQuery<Post[], ResponseError>({
    queryKey: [postQueryKeys.POST, postQueryKeys.READ_POST],
    queryFn: () => readPosts(),
    staleTime: 60 * 1000,
    ...queryOptions,
  });
}

type UseCreatePostParams = CreatePostParams &
  Pick<QueryCustomType, 'mutationOptions'>;

function useCreatePost(
  mutationOptions?: Pick<QueryCustomType, 'mutationOptions'>,
) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [postQueryKeys.GET_MAKERS] });
    },
    ...mutationOptions,
  });
}

type UseUpdatePostParams = UpdatePostParams &
  Pick<QueryCustomType, 'mutationOptions'>;

function useUpdatePost({
  mutationOptions,
}: Pick<QueryCustomType, 'mutationOptions'>) {
  return useMutation({
    mutationFn: updatePost,
    ...mutationOptions,
  });
}

type UseDeletePostParams = Pick<QueryCustomType, 'mutationOptions'>;

function useDeletePost({ mutationOptions }: UseDeletePostParams) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [postQueryKeys.GET_MAKERS] });
    },
    ...mutationOptions,
  });
}

type UseUpdateLikePostParams = Pick<QueryCustomType, 'mutationOptions'>;

function useUpdateLikePost({ mutationOptions }: UseUpdateLikePostParams) {
  return useMutation({
    mutationFn: updateLikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [postQueryKeys.GET_MAKERS] });
    },
    ...mutationOptions,
  });
}

function useGetPosts<T>(
  getPostApi: QueryFunction<T>,
  errorMessage: string,
  queryKey?: string,
  queryOptions?: UseQueryCustomOptions<T>,
) {
  const { show } = useContext(ToastContext);
  const { data, isSuccess, isError, isLoading, refetch } = useQuery<
    T,
    ResponseError
  >({
    queryKey: [queryKey],
    queryFn: getPostApi,
    refetchOnMount: 'always',
    ...queryOptions,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log('GET USER LIKE POSTS SUCCESS');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      show({ message: errorMessage, time: 'long' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return { data, isSuccess, isError, isLoading, refetch };
}

function useGetUsersLikePosts(queryOptions?: UseQueryCustomOptions<Post[]>) {
  return useGetPosts<Post[]>(
    getUsersLikePosts,
    toastMessages.LIKE.ERROR,
    postQueryKeys.READ_USERS_LIKE_POSTS,
    queryOptions,
  );
}

function useGetMyPosts(queryOptions?: UseQueryCustomOptions<Post[]>) {
  return useGetPosts<Post[]>(
    getMyPosts,
    toastMessages.GET_POST.ERROR,
    postQueryKeys.READ_MY_POST,
    queryOptions,
  );
}

export {
  useReadPostById,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
  useUpdateLikePost,
  useReadMarkers,
  useGetUsersLikePosts,
  useGetMyPosts,
};
