import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString, IsStrongPassword, Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {Match} from "../../common/decorator/password.decorator";
import {IsCityAllowed} from "../../common/decorator/city.decorator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsOptional()
  @ApiProperty({ required: false })
  firstName: string;

  @ApiProperty({
    default: 'Lviv',
    required: false,
    description: 'User city',
    example: 'Poltava',
  })
  @IsCityAllowed({
    groups: ['Lviv', 'Odessa', 'Kharkiv'],
    message: 'City is not allowed',
  })
  city: string;

  @ApiProperty()
  password: string;

  @IsNumberString()
  @ApiProperty()
  age: string;
}

export class PersonalDto {
  dateBirth: string;
  lang: string;
}

export class ForgotPassword {
  @IsString()
  // @IsStrongPassword()
  @Matches(/^\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*[\d])\S*$/, {
    message: 'Password must have 1 upper case1111',
  })
  password: string;

  @IsNotEmpty()
  @Match('password', { message: 'Password must match'})
  repeatPassword: string;
}

export class AccountResponseDto extends IntersectionType(UserDto, PersonalDto) {
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
