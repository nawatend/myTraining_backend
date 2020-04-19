import * as express from "express";
import { TrainerController } from "../controller/trainerController";

const trainerRouter = express.Router()


trainerRouter
  .get('/', TrainerController.all)
  .get('/:id', TrainerController.one)
  .get('/user/:userId', TrainerController.oneByUser)
  .post('/', TrainerController.save)
  .delete('/:id', TrainerController.remove)


export default trainerRouter