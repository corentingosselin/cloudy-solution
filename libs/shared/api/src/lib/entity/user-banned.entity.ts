import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { User } from './user.entity';
  
  @Entity()
  export class UserBanned extends BaseEntity {
    
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('boolean', {default: false})
    banned!: boolean;

    @Column('boolean', {default: true})
    view!: boolean;
  
    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

  
    
  }
  