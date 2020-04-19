import * as express from "express";
import { WorkoutSessionController } from "../controller/WorkoutSessionController";

const workoutSessionRouter = express.Router()

workoutSessionRouter
  .get('/', WorkoutSessionController.all)
  .get('/available', WorkoutSessionController.allByAvailable)
  .get('/:id', WorkoutSessionController.one)
  .get('/trainer/:trainerId', WorkoutSessionController.allByTrainer)
  .get('/workoutProgram/:workoutProgramId', WorkoutSessionController.allByWorkoutProgram)
  .post('/', WorkoutSessionController.save)
  .put('/update', WorkoutSessionController.update)
  .delete('/:id', WorkoutSessionController.remove)

export default workoutSessionRouter