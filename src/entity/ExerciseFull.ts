import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Unique, CreateDateColumn, Column, OneToMany } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from "./User";
import { Trainer } from './Trainer'
import { ExerciseBase } from './ExerciseBase'
import { WorkoutSession } from './WorkoutSession'
import { Progress } from "./Progress";

export enum ExerciseType {
  REPS = "reps",
  TIME = "time",
  BOTH = "both"
}

@Entity()
export class ExerciseFull {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => ExerciseBase, exerciseBase => exerciseBase.exerciseFulls, { nullable: true })
  exerciseBase: ExerciseBase;

  @ManyToOne(type => WorkoutSession, workoutSession => workoutSession.exerciseFulls, { nullable: true })
  workoutSession: WorkoutSession;

  @Column("int")
  sets: number;

  @Column("int")
  reps: number;

  @Column("int")
  time: number;

  @Column("float")
  kg: number;

  @Column("int", { default: 3})
  restTimeInMinutes: number;

  @OneToMany(type => Progress, progress => progress.exerciseFull)
  progresses: Progress[]

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}