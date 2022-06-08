import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
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
  

    @Column('boolean', {default: false})
    banned!: boolean;

    @Column('boolean', {default: true})
    view!: boolean;

    @PrimaryColumn()
    userId!: number;
  
    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

  
    
  }
  