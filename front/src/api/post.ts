import { apiInstance } from '@/api/axios.ts';

export type Post = {
  id: number;
  author: {
    id: string;
    nickname: string;
    profileUri: string;
  };
  latitude: number;
  longitude: number;
  likeCount: number;
  title: string;
  description: string;
  artist: string;
  date: string;
  albumCover: string;
  hasLiked: boolean;
  isMyPost: boolean;
};

async function readPosts() {
  const { data } = await apiInstance.get<Post[]>('/posts');
  return data;
}

export type PostByIdParams = {
  id: string;
};

async function readPostById({ id }: PostByIdParams) {
  const { data } = await apiInstance.get<Post>(`/posts/${id}`);
  return data;
}

export type CreatePostParams = {
  post: Omit<Post, 'date' | 'id'>;
};

async function createPost({ post }: CreatePostParams) {
  const { data } = await apiInstance.post<Post>('/posts', {
    ...post,
    date: new Date(),
  });
  return data;
}

export type UpdatePostParams = {
  id: number;
  post: Omit<Post, 'latitude' | 'longitude'>;
};

async function updatePost({ id, post }: UpdatePostParams) {
  const { data } = await apiInstance.patch<Post>(`/posts/${id}`, {
    ...post,
  });
  return data;
}

async function deletePost({ id }: PostByIdParams) {
  const { data } = await apiInstance.delete<{ id: number }>(`/posts/${id}`);
  return data;
}

async function updateLikePost({ id }: PostByIdParams) {
  const { data } = await apiInstance.patch(`/posts/${id}/like`);
  return data;
}

export {
  readPosts,
  readPostById,
  createPost,
  updatePost,
  deletePost,
  updateLikePost,
};
