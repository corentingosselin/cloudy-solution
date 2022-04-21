import { RegisterDto, User } from '@cloudy/shared/api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

Injectable()
type NewType = User;

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  async findUser(id: number) {
    return this.userRepository.findOne({where:{id}});
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: {email} });
  }


  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(createUserDto: RegisterDto) : Promise<User> {
    const user = User.create(createUserDto);
    await user.save();
    delete user.password;
    return user;
  }


}