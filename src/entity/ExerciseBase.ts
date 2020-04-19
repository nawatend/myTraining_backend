import { Entity, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, Unique, CreateDateColumn, Column } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from "./User";
import { Trainer } from './Trainer'
import { ExerciseFull } from './ExerciseFull'
export enum ExerciseType {
  REPS = "reps",
  TIME = "time",
  BOTH = "both"
}

@Entity()
export class ExerciseBase {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(type => Trainer, trainer => trainer.exerciseBases, { nullable: true })
  trainer: Trainer;

  @Column({
    type: "enum",
    enum: ["reps", "time", "both"]
  })
  @IsNotEmpty()
  type: ExerciseType;

  @Column("int")
  cardioLevel: number;

  @Column("int")
  muscleLevel: number;

  @Column()
  description: string;

  @Column()
  imageName: string;

  @Column()
  videoName: string;

  @OneToMany(type => ExerciseFull, exerciseFull => exerciseFull.exerciseBase)
  exerciseFulls: ExerciseFull[]

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}