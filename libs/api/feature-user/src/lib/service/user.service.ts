import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { User } from '../model/user.entity';

Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  async findUser(id: string) {
    return this.userRepository.findOne(id);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }


  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(createUserDto: CreateUserDto) : Promise<User> {
    const user = User.create(createUserDto);
    await user.save();
    delete user.password;
    return user;
  }


}