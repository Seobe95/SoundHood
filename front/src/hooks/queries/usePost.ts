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
  updatePost,
  UpdatePostParams,
} from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';

type QueryCustomType<T = {}> = {
  mutationOptions?: UseMutationCustomOptions;
  queryOptions?: UseQueryCustomOptions<T>;
};

type UseReadPostByIdParams = PostByIdParams &
  Pick<QueryCustomType<Post>, 'queryOptions'>;

function useReadPostById({ id, queryOptions }: UseReadPostByIdParams) {
  return useQuery<Post, ResponseError>({
    queryKey: ['post', 'readPostById', { id }],
    queryFn: () => readPostById({ id }),
    staleTime: 60 * 1000,
    ...queryOptions,
  });
}

type UseReadPosts = Pick<QueryCustomType<Post[]>, 'queryOptions'>;

function useReadPosts({ queryOptions }: UseReadPosts) {
  return useQuery<Post[], ResponseError>({
    queryKey: ['post', 'readPost'],
    queryFn: () => readPosts(),
    staleTime: 60 * 1000,
    ...queryOptions,
  });
}

type UseCreatePostParams = CreatePostParams &
  Pick<QueryCustomType, 'mutationOptions'>;

function useCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    ...mutationOptions,
  });
}

type UseUpdatePostParams = UpdatePostParams &
  Pick<QueryCustomType, 'mutationOptions'>;

function useUpdatePost({ id, post, mutationOptions }: UseUpdatePostParams) {
  return useMutation({
    mutationFn: () => updatePost({ id, post }),
    ...mutationOptions,
  });
}

type UseDeletePostParams = PostByIdParams &
  Pick<QueryCustomType, 'mutationOptions'>;

function useDeletePost({ id, mutationOptions }: UseDeletePostParams) {
  return useMutation({
    mutationFn: () => deletePost({ id }),
    ...mutationOptions,
  });
}

export { useReadPostById, useCreatePost, useUpdatePost, useDeletePost };
