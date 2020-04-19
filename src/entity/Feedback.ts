import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, Unique, CreateDateColumn, Column, ManyToOne } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Sporter } from "./Sporter";
import { Trainer } from './Trainer'
import { WorkoutSession } from "./WorkoutSession";
import { Rate } from "./Rate";

@Entity()
export class Feedback {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string

  @OneToOne(type => Rate)
  @JoinColumn()
  rate: Rate

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}