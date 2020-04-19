import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Trainer } from "../entity/Trainer";
import { User } from "../entity/User";


export class TrainerController {


  private trainerRepository = getRepository(Trainer);


  static all = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Trainer).find({ relations: ["user"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static one = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Trainer).findOne(request.params.id, { relations: ["user"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static oneByUser = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Trainer).findOne(request.params.id, { relations: ["user"], where: { user: request.params.userId } });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }


  static save = async (request: Request, response: Response, next: NextFunction) => {


    let { email, password, role, age, fullName, imageName, focus, description } = request.body;
    let user = new User();
    let trainer = new Trainer();

    //assigned value to new user
    user.email = email
    user.password = password
    user.age = age
    user.fullName = fullName
    user.role = role
    user.imageName = imageName


    trainer.description = description
    trainer.focus = focus

    //encrytped password to db
    user.hashPassword();

    const userRepository = getRepository(User);
    const trainerRepo = getRepository(Trainer)
    try {
      await userRepository.save(user);
      trainer.user = user
      await trainerRepo.save(trainer)
    } catch (e) {
      response.status(409).send("email already in use");
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("Trainer - User created");
  }

  static update = async (request: Request, response: Response, next: NextFunction) => {


    let { trainerId, userId, email, gender, password, role, age, fullName, imageName, focus, description } = request.body;
    let user = new User();
    let trainer = new Trainer();

    //assigned value to new user
    user.email = email
    user.password = password
    user.age = age
    user.fullName = fullName
    user.role = role
    user.imageName = imageName


    trainer.description = description
    trainer.focus = focus

    //encrytped password to db
    user.hashPassword();

    const userRepository = getRepository(User);
    const trainerRepo = getRepository(Trainer)
    try {
      await userRepository.save(user);
      trainer.user = user
      await trainerRepo.save(trainer)
    } catch (e) {
      response.status(409).send("email already in use");
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("Trainer - User created");
  }

  static remove = async (request: Request, response: Response, next: NextFunction) => {
    let trainerToRemove = await getRepository(Trainer).findOne(request.params.id);
    let userToRemove = await getRepository(User).findOne(trainerToRemove.user);
    await getRepository(Trainer).remove(trainerToRemove);
    await getRepository(User).remove(userToRemove);

    //After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }

}