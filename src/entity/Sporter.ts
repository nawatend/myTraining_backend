import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, Unique, CreateDateColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { User } from "./User";
import { Trainer } from './Trainer'
import { Rate } from "./Rate";
import { Progress } from "./Progress";
import { WorkoutProgram } from "./WorkoutProgram";

@Entity()
@Unique(["user"])
export class Sporter {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User, { nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(type => Trainer, { nullable: true })
  @JoinColumn()
  trainer: Trainer;

  @Column({ default: false })
  acceptTrainer: boolean;

  @OneToOne(type => WorkoutProgram, { nullable: true })
  @JoinColumn()
  workoutProgram: WorkoutProgram;

  @Column("int", { default: 0 })
  daysTrained: number;

  @Column("int", { default: 1 })
  daysTrainedStreak: number;

  @Column("float")
  weight: number;

  @Column("float")
  height: number;

  @Column()
  goal: string;

  @OneToMany(type => Rate, rate => rate.sporter)
  rates: Rate[]

  @OneToMany(type => Progress, progress => progress.sporter)
  progresses: Progress[]
}