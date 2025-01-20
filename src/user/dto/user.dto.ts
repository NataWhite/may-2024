import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Match } from '../../common/decorator/password.decorator';
import { IsCityAllowed } from '../../common/decorator/city.decorator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  lastName: string;

  @ApiProperty({
    default: 'Lviv',
    required: false,
    description: 'User city',
    example: 'Poltava',
  })
  @IsOptional()
  @IsCityAllowed({
    groups: ['Lviv', 'Odessa', 'Kharkiv'],
    message: 'City is not allowed',
  })
  city: string;

  @IsString()
  @Matches(/^\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*[\d])\S*$/, {
    message: 'Password must have 1 upper case',
  })
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  age: number;
}

export class ForgotPassword {
  @IsString()
  // @IsStrongPassword()
  @Matches(/^\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*[\d])\S*$/, {
    message: 'Password must have 1 upper case',
  })
  password: string;

  @IsNotEmpty()
  @Match('password', { message: 'Password must match' })
  repeatPassword: string;
}

export class AccountResponseDto extends UserDto {
  @ApiProperty()
  status: boolean;
}

export class SingUpDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: Date;
}
