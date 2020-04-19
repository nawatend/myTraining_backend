import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { ExerciseFull } from "../entity/ExerciseFull";
import { User } from "../entity/User";



export class ExerciseFullController {


  private exerciseFullRepository = getRepository(ExerciseFull);


  static all = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(ExerciseFull).find({ relations: ["exerciseBase"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static one = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(ExerciseFull).findOne(request.params.id, { relations: ["exerciseBase"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static allByWorkoutSession = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(ExerciseFull).find({ relations: ["exerciseBase"], where: { workoutSession: request.params.workoutSessionId } });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static save = async (request: Request, response: Response, next: NextFunction) => {


    let { id, exerciseBaseId, sets, reps, kg, restTimeInMinutes, time } = request.body;
    let exerciseFull = new ExerciseFull();

    //exerciseFull.id = id
    exerciseFull.exerciseBase = exerciseBaseId
    exerciseFull.sets = sets
    exerciseFull.reps = reps
    exerciseFull.kg = kg
    exerciseFull.restTimeInMinutes = restTimeInMinutes
    exerciseFull.time = time

    const exerciseFullRepository = getRepository(ExerciseFull)
    try {
      await exerciseFullRepository.save(exerciseFull)
    } catch (e) {
      console.log(e)
      return;
    }
    //If everything is fine, send 201 = CREATED
    response.status(201).send("ExerciseFull - created");
  }

  static remove = async (request: Request, response: Response, next: NextFunction) => {
    let exerciseFullToRemove = await getRepository(ExerciseFull).findOne(request.params.id);

    await getRepository(ExerciseFull).remove(exerciseFullToRemove);

    //After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }

}