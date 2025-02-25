import { IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  targetPostId: string;

  @IsNotEmpty()
  reason: string;
}
