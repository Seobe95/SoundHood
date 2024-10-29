interface Profile {
  id: number;
  email: string;
  nickname: string;
  imageUri: string | null;
  kakaoImageUri: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

export type { Profile };
