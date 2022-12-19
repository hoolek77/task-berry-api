import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsIn,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Clean the house',
  })
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Clean the house and wash the dishes',
  })
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Home',
  })
  @IsOptional()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    example: '#000000',
  })
  @IsOptional()
  @MinLength(7)
  @MaxLength(7)
  @IsNotEmpty()
  color: string;
}
