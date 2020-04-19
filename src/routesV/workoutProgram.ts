import * as express from "express";
import { WorkoutProgramController } from "../controller/WorkoutProgramController";

const workoutProgramRouter = express.Router()


workoutProgramRouter
  .get('/', WorkoutProgramController.all)
  .get('/:id', WorkoutProgramController.one)
  .get('/trainer/:trainerId', WorkoutProgramController.allByTrainer)
  .put('/update', WorkoutProgramController.update)
  .post('/', WorkoutProgramController.save)
  .delete('/:id', WorkoutProgramController.remove)


export default workoutProgramRouter