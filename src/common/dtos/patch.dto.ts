import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum PatchOps {
  Add = 'add',
  Remove = 'remove',
  Replace = 'replace',
}

export class PatchDTO {
  @IsEnum(PatchOps)
  @IsString()
  @IsNotEmpty()
  op: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  value: any;
}
