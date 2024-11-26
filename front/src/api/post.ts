import { apiInstance } from '@/api/axios.ts';
import { UserInfo } from '@/api/auth.ts';

export type Post = {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  artist: string;
  date: string;
  albumCover: string;
};

type Like = {
  id: number;
  post: Post;
  user: UserInfo;
};

export type PostResponse = {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  date: string;
  albumCover: string;
  user: UserInfo;
  likeCount: number;
  likes: Like[];
};

async function readPosts() {
  const { data } = await apiInstance.get<Post[]>('/posts');
  return data;
}

export type PostByIdParams = {
  id: string;
};

async function readPostById({ id }: PostByIdParams) {
  console.log(id);
  const { data } = await apiInstance.get<Post>(`/posts/${id}`);
  console.log(data);
  return data;
}

export type CreatePostParams = {
  post: Omit<Post, 'date' | 'id'>;
};

async function createPost({ post }: CreatePostParams) {
  const { data } = await apiInstance.post<PostResponse>('/posts', {
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

export { readPosts, readPostById, createPost, updatePost, deletePost };
