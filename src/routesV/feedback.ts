import * as express from "express";
import { FeedbackController } from "../controller/FeedbackController";

const feedbackRouter = express.Router()


feedbackRouter
  .get('/', FeedbackController.all)
  .get('/:id', FeedbackController.one)
  .post('/', FeedbackController.save)
  .delete('/:id', FeedbackController.remove)


export default feedbackRouter