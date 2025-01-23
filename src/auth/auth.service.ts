import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ForgotPassword, SingUpDto, UserDto } from '../user/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async singUpUser(data: UserDto): Promise<SingUpDto> {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (findUser) {
      throw new BadRequestException('User with this email already exist.');
    }
    const password = await bcrypt.hash(data.password, 10);
    const user: User = await this.userRepository.save(
      this.userRepository.create({ ...data, password }),
    );
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  create(data: ForgotPassword) {
    if (data.password !== data.repeatPassword) {
    }
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
