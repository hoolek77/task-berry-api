import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  label: string;

  @MinLength(7)
  @MaxLength(7)
  @IsNotEmpty()
  color: string;
}
