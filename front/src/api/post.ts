import { apiInstance } from '@/api/axios.ts';

export type Post = {
  id: string;
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
  spotifyURL: string;
};

async function readPosts() {
  const { data } = await apiInstance.get<Post[]>('/posts');
  return data;
}

export interface Markers {
  id: string;
  latitude: number;
  longitude: number;
  albumCover: string;
  title: string;
  artist: string;
}

async function getMarkers() {
  const { data } = await apiInstance.get<Markers[]>('/markers');
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
  post: Omit<
    Post,
    'date' | 'id' | 'hasLiked' | 'isMyPost' | 'author' | 'likeCount'
  >;
};

async function createPost({ post }: CreatePostParams) {
  const { data } = await apiInstance.post<Post>('/posts', {
    ...post,
    date: new Date(),
  });
  return data;
}

export type UpdatePostParams = {
  id: string;
  description: string;
};

async function updatePost({ id, description }: UpdatePostParams) {
  const { data } = await apiInstance.patch<Post>(`/posts/${id}`, {
    description,
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

async function getUsersLikePosts() {
  const { data } = await apiInstance.get('/my/like');
  return data;
}

async function getMyPosts() {
  const { data } = await apiInstance.get('/my/posts');
  return data;
}

export {
  readPosts,
  readPostById,
  createPost,
  updatePost,
  deletePost,
  updateLikePost,
  getMarkers,
  getUsersLikePosts,
  getMyPosts,
};
