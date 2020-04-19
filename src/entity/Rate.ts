import { Entity, OneToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, Unique, CreateDateColumn, Column, ManyToOne } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { User } from "./User";
import { ExerciseBase } from './ExerciseBase'
import { WorkoutProgram } from './WorkoutProgram'
import { WorkoutSession } from './WorkoutSession'
import { Feedback } from "./Feedback";
import { Sporter } from "./Sporter";

@Entity()
export class Rate {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  rate: number;

  @ManyToOne(type => Sporter)
  sporter: Sporter;

  @ManyToOne(type => WorkoutSession, workoutSession => workoutSession.rates)
  workoutSession: WorkoutSession;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
