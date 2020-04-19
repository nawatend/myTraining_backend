import * as express from "express";
import { ProgressController } from "../controller/ProgressController";

const progressRouter = express.Router()


progressRouter
  .get('/', ProgressController.all)
  .get('/:id', ProgressController.one)
  .post('/', ProgressController.save)
  .delete('/:id', ProgressController.remove)


export default progressRouter