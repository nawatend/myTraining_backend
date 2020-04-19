import { Entity, OneToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, Unique, CreateDateColumn, Column } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { User } from "./User";
import { ExerciseBase } from './ExerciseBase'
import { WorkoutProgram } from './WorkoutProgram'
import { WorkoutSession } from './WorkoutSession'
import { Sporter } from "./Sporter";
@Entity()
@Unique(["user"])
export class Trainer {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User, { nullable: false })
  @JoinColumn()
  user: User

  @Column()
  description: string

  @Column({ nullable: true })
  focus: string

  @OneToMany(type => Sporter, sporter => sporter.trainer, { cascade: true })
  sporters: Sporter[]

  @OneToMany(type => ExerciseBase, exerciseBase => exerciseBase.trainer, { cascade: true })
  exerciseBases: ExerciseBase[]

  @OneToMany(type => WorkoutProgram, workoutProgram => workoutProgram.trainer, { cascade: true })
  workoutPrograms: WorkoutProgram[]


  @OneToMany(type => WorkoutSession, workoutSession => workoutSession.trainer, { cascade: true })
  workoutSessions: WorkoutSession[]
}
