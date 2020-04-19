import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Trainer } from "../entity/Trainer";
import { Sporter } from "../entity/Sporter";

export class UserController {

    private userRepository = getRepository(User);

    static all = async (request: Request, response: Response, next: NextFunction) => {

        const result = getRepository(User).find({
            select: ["id", "email", "role", "age", "fullName", "imageName", "createdAt"]
        });
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

        } else if (result !== null && result !== undefined) {
            response.json(result);
        }
    }

    static one = async (request: Request, response: Response, next: NextFunction) => {

        const result = getRepository(User).findOne(request.params.id, {
            select: ["id", "email", "role", "age", "fullName", "imageName", "createdAt"]
        });
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

        } else if (result !== null && result !== undefined) {
            response.json(result);
        }
    }

    static save = async (request: Request, response: Response, next: NextFunction) => {

        let { email, password, role, age, fullName, imageName, gender, goal, height, weight, description, focus } = request.body;
        let user = new User();

        //assigned value to new user
        user.email = email
        user.password = password
        user.age = age
        user.fullName = fullName
        user.role = role
        user.imageName = imageName
        user.gender = gender

        //encrytped password to db
        user.hashPassword();

        const userRepository = getRepository(User);
        const sporterRepository = getRepository(Sporter);
        const trainerRepo = getRepository(Trainer)
        try {
            await userRepository.save(user);

            if (role === "sporter") {
                let sporter = new Sporter();
                sporter.goal = goal
                sporter.height = height
                sporter.weight = weight
                sporter.user = user
                await sporterRepository.save(sporter)
            }
            if (role === "trainer") {
                let trainer = new Trainer()
                console.log('trainer')
                trainer.description = description
                trainer.focus = focus
                trainer.user = user
                await trainerRepo.save(trainer)
            }

        } catch (e) {
            response.status(409).send("email already in use");
            return;
        }

        //If everything is fine, send 201 = CREATED
        response.status(201).send("User created");
    }

    static update = async (request: Request, response: Response, next: NextFunction) => {

        let { userId, trainerId, sporterId, email, password, role, age, fullName, imageName, gender, goal, height, weight, description, focus } = request.body;
        let user = new User();

        //assigned value to old user
        user.id = userId
        user.email = email

        user.age = age
        user.fullName = fullName
        user.role = role
        user.imageName = imageName
        user.gender = gender

        //encrytped password to db
        if (password !== '') {
            user.password = password
            user.hashPassword();
        }


        const userRepository = getRepository(User);
        const sporterRepository = getRepository(Sporter);
        const trainerRepo = getRepository(Trainer)
        try {
            await userRepository.save(user);

            if (role === "sporter") {
                let sporter = new Sporter();
                sporter.id = sporterId
                sporter.goal = goal
                sporter.height = height
                sporter.weight = weight
                sporter.user = user
                await sporterRepository.save(sporter)
            }
            if (role === "trainer") {
                let trainer = new Trainer()
                trainer.id = trainerId
                console.log('trainer')
                trainer.description = description
                trainer.focus = focus
                trainer.user = user
                await trainerRepo.save(trainer)
            }

        } catch (e) {
            response.status(409).send("email already in use");
            return;
        }

        //If everything is fine, send 201 = CREATED
        response.status(201).send("User created");
    }

    static remove = async (request: Request, response: Response, next: NextFunction) => {
        let userToRemove = await getRepository(User).findOne(request.params.id);
        await getRepository(User).remove(userToRemove);

        //After all send a 204 (no content, but accepted) response
        response.status(204).send();
    }

}