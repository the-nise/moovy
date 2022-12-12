import { IsNotEmpty, IsString } from 'class-validator';
export class CreateLibraryDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  movie: string;
}
