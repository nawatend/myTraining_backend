import * as express from "express";
import { RateController } from "../controller/RateController";

const rateRouter = express.Router()


rateRouter
  .get('/', RateController.all)
  .get('/:id', RateController.one)
  .post('/', RateController.save)
  .delete('/:id', RateController.remove)


export default rateRouter