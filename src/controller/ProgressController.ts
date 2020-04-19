import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Progress } from "../entity/Progress";
import { User } from "../entity/User";



export class ProgressController {


  private progressRepository = getRepository(Progress);


  static all = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Progress).find({ relations: ["exerciseFull"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static one = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Progress).findOne(request.params.id, { relations: ["exerciseFull"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static save = async (request: Request, response: Response, next: NextFunction) => {


    let { sporterId, exerciseFullId, sets, reps, kg, time } = request.body;
    let progress = new Progress();

    //assigned value to new progress
    progress.sporter = sporterId
    progress.exerciseFull = exerciseFullId
    progress.sets = sets
    progress.reps = reps
    progress.kg = kg
    progress.time = time

    const progressRepository = getRepository(Progress)
    try {
      await progressRepository.save(progress)
    } catch (e) {
      response.status(409).send("Progress Failed To Save");
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("Progress - created");
  }

  static remove = async (request: Request, response: Response, next: NextFunction) => {
    let progressToRemove = await getRepository(Progress).findOne(request.params.id);
    await getRepository(Progress).remove(progressToRemove);
    //After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }

}