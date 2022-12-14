import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
export class CreateLibraryDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  movie: string;

  @IsBoolean()
  @IsNotEmpty()
  hasReview: boolean;
}
