import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query, UseGuards, Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, AccountResponseDto, UserItemDto } from './dto/user.dto';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseQueryDto } from '../common/validator/base.query.validator';
import {
  ApiPaginatedResponse,
  PaginatedDto,
} from '../common/interface/response.interface';
import {AuthGuard} from "@nestjs/passport";
import {Roles} from "../common/decorator/roles.decorator";
import {RoleGuard} from "../common/guards/role.guard";

// @UseGuards(AuthGuard())
@ApiTags('User')
@ApiExtraModels(UserItemDto, PaginatedDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: AccountResponseDto })
  @Post('/create')
  async createUser(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles('Admin', 'Manager')
  @UseGuards(AuthGuard(), RoleGuard)
  @ApiPaginatedResponse('entities', UserItemDto)
  @Get('/list')
  findAll(@Query() query: BaseQueryDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Roles('Admin')
  @UseGuards(AuthGuard(), RoleGuard)
  @Patch('/roles/:id')
  update(@Param('id') id: string) {
    return this.userService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
