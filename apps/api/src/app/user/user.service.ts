import {
  RegisterDto,
  User,
  UserAdmin,
  UserBanned,
  UserProfile,
} from '@cloudy/shared/api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AuthService } from '../auth/service/auth.service';

Injectable();
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserAdmin)
    private userAdminRepository: Repository<UserAdmin>,
    @InjectRepository(UserBanned)
    private userBannedRepository: Repository<UserBanned>
  ) {}

  async findUser(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  //find users like by firstname or lastname or email
  async findUsers(input: string): Promise<UserProfile[]> {
    const users = await this.userRepository.find({
      where: [
        { firstname: Like(`%${input}%`) },
        { lastname: Like(`%${input}%`) },
        { email: Like(`%${input}%`) },
      ],
      select: ['id', 'firstname', 'lastname', 'email'],
    });
    //clear admin users
    for (const user of users) {
      if (await this.isAdminById(user.id)) {
        users.splice(users.indexOf(user), 1);
      }
    }
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
    const userAdmin = UserAdmin.create({ user });
    await userAdmin.save();
  }

  async isAdmin(user: User): Promise<boolean> {
    const userAdmin = await this.userAdminRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (userAdmin) {
      return true;
    }
    return false;
  }

  async isAdminById(userId: number): Promise<boolean> {
    const userAdmin = await this.userAdminRepository.findOne({
      where: { user: { id: userId } },
    });
    if (userAdmin) {
      return true;
    }
    return false;
  }

  async createUser(createUserDto: RegisterDto): Promise<User> {
    //reformat firstname and lastname with uppercase first letter
    createUserDto.firstname =
      createUserDto.firstname.charAt(0).toUpperCase() +
      createUserDto.firstname.slice(1).toLocaleLowerCase();
    createUserDto.lastname =
      createUserDto.lastname.charAt(0).toUpperCase() +
      createUserDto.lastname.slice(1).toLocaleLowerCase();

    const user = User.create(createUserDto);
    await user.save();
    delete user.password;
    return user;
  }

  async getBannedInfo(userId: number) {
    const userBanned = await this.userBannedRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!userBanned)
      return {
        banned: false,
        view: true,
      };
    return { banned: userBanned.banned, view: userBanned.view };
  }

  //check if user is banned
  async isBanned(userId: number): Promise<boolean> {
    const userBanned = await this.userBannedRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!userBanned) return false;
    return userBanned.banned;
  }

  async getBannedUser(user: User): Promise<UserBanned> {
    const userBanned = await this.userBannedRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (!userBanned) return null;
    return userBanned;
  }

  async isViewEnabled(userId: number) {
    const userBanned = await this.userBannedRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!userBanned) return true;
    return userBanned.view;
  }


  //ban user
  async banUser(user: User) {
      const userBanned = UserBanned.create({ user });
      userBanned.banned = true;
      const result = userBanned.save();
      if (result) return true;
      return false;

  }

  //unban user
  async unbanUser(user: User) {
    const userBanned = await this.getBannedUser(user);
    if (userBanned) {
      userBanned.banned = false;
      userBanned.save();
    }
  }

  //disable user view
  async disableView(user: User) {
    const userBanned = UserBanned.create({ user });
    userBanned.view = false;
    return userBanned.save();
  }

  //enable user view
  async enableView(user: User) {
    const userBanned = await this.getBannedUser(user);
    if (userBanned) {
      userBanned.view = true;
      userBanned.save();
    }
  }
}
