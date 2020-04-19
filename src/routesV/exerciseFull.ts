import * as express from "express";
import { ExerciseFullController } from "../controller/ExerciseFullController";

const exerciseFullRouter = express.Router()


exerciseFullRouter
  .get('/', ExerciseFullController.all)
  .get('/:id', ExerciseFullController.one)
  .get('/workoutsession/:workoutSessionId', ExerciseFullController.allByWorkoutSession)
  .post('/', ExerciseFullController.save)
  .delete('/:id', ExerciseFullController.remove)


export default exerciseFullRouter