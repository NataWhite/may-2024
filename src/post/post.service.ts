import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../database/entities/post.entity';

@Injectable()
export class PostService {
  private logger: Logger;
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  async create(data: PostDto) {
    try {
      const post = await this.postRepository.save(
        this.postRepository.create({
          ...data,
          user_id: '31c3b9b1-934a-4bbb-8039-7241f4852f17',
        }),
      );
      return post;
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException('Creat post failed.');
    }
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: PostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
