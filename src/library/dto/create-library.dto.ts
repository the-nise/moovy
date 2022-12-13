import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateLibraryDto {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  movie: string;
}
