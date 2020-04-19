import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { WorkoutProgram } from "../entity/WorkoutProgram";
import { User } from "../entity/User";
import { WorkoutSession } from "../entity/WorkoutSession";



export class WorkoutProgramController {


  private workoutProgramRepository = getRepository(WorkoutProgram);


  static all = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(WorkoutProgram).find({ relations: ["trainer", "workoutSessions"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static one = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(WorkoutProgram).findOne(request.params.id, { relations: ["trainer"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }


  static allByTrainer = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(WorkoutProgram).find({ relations: ["trainer"], where: { trainer: request.params.trainerId } });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static save = async (request: Request, response: Response, next: NextFunction) => {

    let { title, trainerId, type, workoutSessions } = request.body;
    let workoutProgram = new WorkoutProgram();

    workoutProgram.title = title
    workoutProgram.trainer = trainerId
    workoutProgram.type = type

    const workoutProgramRepository = getRepository(WorkoutProgram)
    const workoutSessionRepository = getRepository(WorkoutSession)

    try {
      await workoutProgramRepository.save(workoutProgram)

      let result = await getRepository(WorkoutSession).findByIds(workoutSessions);

      result.forEach(async ws => {
        try {
          ws.workoutProgram = workoutProgram
          //await workoutSessionRepository.update(ws, { workoutProgramId: workoutProgram.id })
          await workoutSessionRepository.save(ws)
        } catch (e) {
          console.log(e)
          return;
        }
      });

    } catch (e) {
      console.log(e)
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("WorkoutProgram - created");
  }

  static update = async (request: Request, response: Response, next: NextFunction) => {


    let { workoutProgramId, title, type, workoutSessions } = request.body;
    let workoutProgram = await getRepository(WorkoutProgram).findOne(workoutProgramId, { relations: ["trainer"] });

    workoutProgram.title = title
    workoutProgram.type = type

    let oldWorkoutSessions = await getRepository(WorkoutSession).find({ relations: ["trainer", "workoutProgram"], where: { workoutProgram: workoutProgramId } });

    const workoutProgramRepository = getRepository(WorkoutProgram)
    const workoutSessionRepository = getRepository(WorkoutSession)

    try {
      await workoutProgramRepository.save(workoutProgram)


      //update all old sessions and remove deleted sessions
      oldWorkoutSessions.forEach(async oldWorkoutSession => {
        console.log('WS  remove from WP')
        oldWorkoutSession.workoutProgram = null
        await workoutSessionRepository.save(oldWorkoutSession)
      });


      //update all new to this WP
      workoutSessions.forEach(async newWorkoutSession => {
        console.log('WS  added from WP')
        newWorkoutSession.workoutProgram = workoutProgramId
        await workoutSessionRepository.save(newWorkoutSession)
      });

      // workoutSessions.forEach(async newWorkoutSession => {
      //   if (newWorkoutSession.workoutProgram === null) {
      //     console.log('WS added to WP')
      //     newWorkoutSession.workoutProgram = workoutProgramId
      //     await workoutSessionRepository.save(newWorkoutSession)
      //   }
      // });

    } catch (e) {
      console.log(e)
      return;
    }
    response.status(201).send("WorkoutProgram - update");
  }

  static remove = async (request: Request, response: Response, next: NextFunction) => {
    let workoutProgramToRemove = await getRepository(WorkoutProgram).findOne(request.params.id);

    await getRepository(WorkoutProgram).remove(workoutProgramToRemove);

    //After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }

}