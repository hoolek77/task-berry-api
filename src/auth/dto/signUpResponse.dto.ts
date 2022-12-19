import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({
    example: 'john.doe@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'John Doe',
  })
  name: string;
}
