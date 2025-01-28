import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  firstName: string;

  @Column('text', { nullable: true })
  lastName: string;

  @Column('text', { nullable: false, unique: true })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('text', { nullable: true, default: 'Lviv' })
  city: string;

  @Column('integer', { nullable: true })
  age: number;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true, default: null })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 'User' })
  role: string;

  @OneToMany(() => Post, (entity) => entity.user)
  posts?: Post[];
}
