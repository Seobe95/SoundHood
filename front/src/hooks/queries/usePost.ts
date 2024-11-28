import {
  ResponseError,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '@/types';
import {
  createPost,
  CreatePostParams,
  deletePost,
  Post,
  PostByIdParams,
  readPostById,
  readPosts,
  updateLikePost,
  updatePost,
  UpdatePostParams,
} from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postQueryKeys } from '@/constants';

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
    staleTime: 60 * 1000,
    ...queryOptions,
  });
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
    ...mutationOptions,
  });
}

type UseUpdateLikePostParams = Pick<QueryCustomType, 'mutationOptions'>;

function useUpdateLikePost({ mutationOptions }: UseUpdateLikePostParams) {
  return useMutation({
    mutationFn: updateLikePost,
    ...mutationOptions,
  });
}

export {
  useReadPostById,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
  useUpdateLikePost,
};
