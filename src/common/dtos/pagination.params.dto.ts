import { IsNumber, Min, Max } from 'class-validator';

export class PaginationParams {
  @IsNumber()
  @Min(0)
  skip: number;
  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number;
}
