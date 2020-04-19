import * as express from "express";
import { SporterController } from "../controller/SporterController";

const sporterRouter = express.Router()


sporterRouter
  .get('/', SporterController.all)
  .get('/:id', SporterController.one)
  .get('/user/:userId', SporterController.oneByUser)
  .post('/trainer', SporterController.allByTrainer)
  .post('/', SporterController.save)
  .post('/update', SporterController.update)
  .post('/invite', SporterController.inviteByTrainer)
  .delete('/:id', SporterController.remove)

export default sporterRouter