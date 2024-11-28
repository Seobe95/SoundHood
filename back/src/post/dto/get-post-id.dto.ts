import { IsUUID } from 'class-validator';

export class GetPostIdDto {
  @IsUUID()
  id: string;
}
