import {
  Entity, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn,
  Unique, CreateDateColumn, Column, ManyToMany, JoinTable
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from "./User";
import { Trainer } from './Trainer'
import { ExerciseFull } from './ExerciseFull'
import { WorkoutSession } from "./WorkoutSession";
export enum WorkoutProgramType {
  MUSCLE = "muscle",
  STRENGTH = "strength",
  FAT = 'fat',
  STAMINA = "stamina"
}

@Entity()
export class WorkoutProgram {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(type => Trainer, trainer => trainer.workoutPrograms, { nullable: true })
  trainer: Trainer;

  @Column({
    type: "enum",
    enum: ["muscle", "strength", "fat", "stamina"]
  })
  @IsNotEmpty()
  type: WorkoutProgramType;

  @OneToMany(type => WorkoutSession, workoutSession => workoutSession.workoutProgram)
  @JoinTable()
  workoutSessions: WorkoutSession[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}