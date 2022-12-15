import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
export class CreateLibraryDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  movie: string;

  @IsBoolean()
  @IsNotEmpty()
  hasReview: boolean;
}
