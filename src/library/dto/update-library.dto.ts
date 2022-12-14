import { PickType } from '@nestjs/mapped-types';
import { CreateLibraryDto } from './create-library.dto';

export class UpdateLibraryDto extends PickType(CreateLibraryDto, [
  'id',
] as const) {}
