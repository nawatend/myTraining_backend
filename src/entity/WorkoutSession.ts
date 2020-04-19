import { Entity, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, Unique, CreateDateColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from "./User";
import { Trainer } from './Trainer'
import { ExerciseFull } from './ExerciseFull'
import { WorkoutProgram } from './WorkoutProgram'
import { Feedback } from "./Feedback";
import { Rate } from "./Rate";
export enum WorkoutSessionType {
  MUSCLE = "muscle",
  STRENGTH = "strength",
  FAT = 'fat',
  STAMINA = "stamina"
}

@Entity()
export class WorkoutSession {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(type => Trainer, trainer => trainer.workoutSessions, { nullable: true })
  trainer: Trainer;

  @Column({
    type: "enum",
    enum: ["muscle", "strength", "fat", "stamina"]
  })
  @IsNotEmpty()
  type: WorkoutSessionType;

  @ManyToOne(type => WorkoutProgram, workoutProgram => workoutProgram.workoutSessions)
  workoutProgram: WorkoutProgram;

  @Column("int")
  cardioLevel: number;

  @Column("int")
  muscleLevel: number;

  @Column()
  imageName: string;

  @OneToMany(type => ExerciseFull, exerciseFull => exerciseFull.workoutSession)
  exerciseFulls: ExerciseFull[]

  @OneToMany(type => Rate, rate => rate.workoutSession)
  rates: Rate[]

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}