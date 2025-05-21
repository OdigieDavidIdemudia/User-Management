import { Transform } from "class-transformer";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class GetUsersQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  page: string = '1';

  @IsOptional()
  @IsString()
  limit: string = '10';
}
