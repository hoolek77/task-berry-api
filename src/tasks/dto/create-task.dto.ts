import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Clean the house',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Clean the house and wash the dishes',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Home',
  })
  @IsOptional()
  label: string;

  @ApiProperty({
    example: '#000000',
  })
  @MinLength(7)
  @MaxLength(7)
  @IsNotEmpty()
  color: string;
}
