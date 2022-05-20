import { RegisterDto, User, UserAdmin, UserProfile } from '@cloudy/shared/api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserAdmin)
    private userAdminRepository: Repository<UserAdmin>
  ) {
  }

  async findUser(id: number) {
    return this.userRepository.findOne({where:{id}});
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: {email} });
  }

  //find users like by firstname or lastname or email
  async findUsers(input: string) : Promise<UserProfile[]> {
    const users = this.userRepository.find({
      where: [
        { firstname: Like(`%${input}%`) },
        { lastname: Like(`%${input}%`) },
        { email: Like(`%${input}%`) }
      ],
      select: ['id', 'firstname', 'lastname', 'email']
    });
    return users;
  }
   


  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async countUsers() {
    return this.userRepository.count();
  }

  //set user as admin
  async setAdmin(user: User) {
    const userAdmin = UserAdmin.create({user});
    await userAdmin.save(); 
  }

 async isAdmin(user: User) : Promise<boolean>{
    const userAdmin = await this.userAdminRepository.findOne({where: {user: { id: user.id }}});
    if(userAdmin) {
      return true;
    }
    return false;
  }

  async isAdminById(userId: number) : Promise<boolean>{
    const userAdmin = await this.userAdminRepository.findOne({where: {user: { id: userId}}});
    if(userAdmin) {
      return true;
    }
    return false;
  }

  async createUser(createUserDto: RegisterDto) : Promise<User> {
    //reformat firstname and lastname with uppercase first letter
    createUserDto.firstname = createUserDto.firstname.charAt(0).toUpperCase() + createUserDto.firstname.slice(1).toLocaleLowerCase();
    createUserDto.lastname = createUserDto.lastname.charAt(0).toUpperCase() + createUserDto.lastname.slice(1).toLocaleLowerCase();

    const user = User.create(createUserDto);
    await user.save();
    delete user.password;
    return user;
  }


}