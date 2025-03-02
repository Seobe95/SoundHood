import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsString()
  description: string;

  @IsString()
  spotifyURL: string;

  @IsDateString()
  date: Date;

  @IsString()
  albumCover: string;

  @IsString()
  nickname: string;
}
