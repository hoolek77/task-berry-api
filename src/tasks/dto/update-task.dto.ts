import {
  IsOptional,
  IsIn,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  label: string;

  @IsOptional()
  @MinLength(7)
  @MaxLength(7)
  @IsNotEmpty()
  color: string;
}
