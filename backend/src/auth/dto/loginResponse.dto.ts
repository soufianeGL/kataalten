import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'User details' })
  user: any;

  @ApiProperty({ description: 'JWT token' })
  token: string;
}
