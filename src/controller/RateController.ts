import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Rate } from "../entity/Rate";

export class RateController {

  private rateRepository = getRepository(Rate);

  static all = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Rate).find({ relations: ["sporter", "workoutSession"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static one = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Rate).findOne(request.params.id, { relations: ["sporter", "workoutSession"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static save = async (request: Request, response: Response, next: NextFunction) => {

    let { rate, workoutSessionId, sporterId } = request.body;
    let newRate = new Rate();

    //assigned value to new rate
    newRate.rate = rate
    newRate.workoutSession = workoutSessionId
    newRate.sporter = sporterId


    const rateRepository = getRepository(Rate);
    try {
      await rateRepository.save(newRate);
    } catch (e) {
      response.status(409).send("Rate failed to created");
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("Rate created");
  }

  static remove = async (request: Request, response: Response, next: NextFunction) => {
    let rateToRemove = await getRepository(Rate).findOne(request.params.id);
    await getRepository(Rate).remove(rateToRemove);

    //After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }

}