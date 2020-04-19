import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { ExerciseBase } from "../entity/ExerciseBase";
import { User } from "../entity/User";



export class ExerciseBaseController {


  private userRepository = getRepository(ExerciseBase);


  static all = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(ExerciseBase).find({ relations: ["trainer"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static one = async (request: Request, response: Response, next: NextFunction) => {

    const result = await getRepository(ExerciseBase).findOne(request.params.id, { relations: ["trainer"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }

    if (result === undefined) {
      return response.status(404).json({
        message: `Could not find a exercise with id ${request.params.id}`
      })
    }
  }
  static allByTrainer = async (request: Request, response: Response, next: NextFunction) => {

    // const results = getRepository(ExerciseBase).
    // .createQueryBuilder("exercise_base")
    // .where("trainer")
    const result = await getRepository(ExerciseBase).find({ relations: ["trainer"], where: { trainer: request.params.trainerId } });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static save = async (request: Request, response: Response, next: NextFunction) => {


    let { title, trainerId, type, cardioLevel, muscleLevel, description, imageName, videoName, id } = request.body;
    let exerciseBase = new ExerciseBase();

    if (id !== '') {
      exerciseBase.id = id
    }
    exerciseBase.title = title
    exerciseBase.trainer = trainerId
    exerciseBase.type = type
    exerciseBase.cardioLevel = cardioLevel
    exerciseBase.muscleLevel = muscleLevel
    exerciseBase.description = description
    exerciseBase.imageName = imageName
    exerciseBase.videoName = videoName

    const exerciseBaseRepository = getRepository(ExerciseBase)
    try {
      await exerciseBaseRepository.save(exerciseBase)
    } catch (e) {
      console.log(e)
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("ExerciseBase - created");
  }

  static remove = async (request: Request, response: Response, next: NextFunction) => {
    let exerciseBaseToRemove = await getRepository(ExerciseBase).findOne(request.params.id);

    await getRepository(ExerciseBase).remove(exerciseBaseToRemove);

    //After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }

}