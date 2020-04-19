import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { ExerciseFull } from "./ExerciseFull";
import { Sporter } from "./Sporter";


@Entity()
export class Progress {

  @PrimaryGeneratedColumn()
  id: number

  @Column("int")
  sets: number;

  @Column("int")
  reps: number;

  @Column("int")
  time: number;

  @Column("float")
  kg: number;

  @ManyToOne(type => Sporter)
  sporter: Sporter

  @ManyToOne(type => ExerciseFull)
  exerciseFull: ExerciseFull

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}