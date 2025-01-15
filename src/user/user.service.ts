import { Injectable } from '@nestjs/common';
import {UserDto, UserQueryDto} from './dto/user.dto';

@Injectable()
export class UserService {
  private usersList = [];
  async create(createUserDto: UserDto) {
    const index = new Date().valueOf();
    this.usersList.push({
      ...createUserDto,
      id: index,
    });
    return this.usersList[0];
  }

  findAll(data: UserQueryDto) {
    return this.usersList;
  }

  findOne(id: number) {
    return this.usersList.find((user) => user.id == id);
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
