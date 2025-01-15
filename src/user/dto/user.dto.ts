import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: false })
  firstName: string;
  @ApiProperty({
    default: 'Lviv',
    required: false,
    description: 'User city',
    example: 'Poltava',
  })
  city: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  age: number;
}

export class AccountResponseDto {
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: false })
  firstName: string;
  @ApiProperty({
    default: 'Lviv',
    required: false,
    description: 'User city',
    example: 'Poltava',
  })
  city: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
    status: boolean;
}

export class UserQueryDto {
  @ApiProperty()
  limit: string;
  @ApiProperty()
  sort: string;
  page: string;
}
