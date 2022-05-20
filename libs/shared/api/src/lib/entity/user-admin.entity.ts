import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { User } from './user.entity';
  
  @Entity()
  export class UserAdmin extends BaseEntity {
    
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @PrimaryGeneratedColumn()
    id!: number;
  
    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

  
    
  }
  