import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { WorkoutSession } from "../entity/WorkoutSession";
import { User } from "../entity/User";
import { ExerciseBase } from "../entity/ExerciseBase";
import { ExerciseFull } from "../entity/ExerciseFull";



export class WorkoutSessionController {


  private workoutProgramRepository = getRepository(WorkoutSession);


  static all = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(WorkoutSession).find({ relations: ["trainer"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }


  static allByAvailable = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(WorkoutSession).find({ relations: ["trainer", "workoutProgram"], where: { workoutProgram: null } });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }


  static one = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(WorkoutSession).findOne(request.params.id, { relations: ["trainer"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static allByTrainer = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(WorkoutSession).find({ relations: ["trainer", "workoutProgram"], where: { trainer: request.params.trainerId } });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static allByWorkoutProgram = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(WorkoutSession).find({ relations: ["trainer", "workoutProgram"], where: { workoutProgram: request.params.workoutProgramId } });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }


  static save = async (request: Request, response: Response, next: NextFunction) => {


    let { title, trainerId, type, muscleLevel, imageName, cardioLevel, exerciseBaseIds } = request.body;
    let workoutSession = new WorkoutSession();

    workoutSession.title = title
    workoutSession.trainer = trainerId
    workoutSession.type = type
    workoutSession.cardioLevel = cardioLevel
    workoutSession.muscleLevel = muscleLevel
    workoutSession.imageName = imageName

    const workoutSessionRepository = getRepository(WorkoutSession)
    const exerciseBaseRepository = getRepository(ExerciseBase)
    const exerciseFullRepo = getRepository(ExerciseFull)
    try {
      await workoutSessionRepository.save(workoutSession)

      //save all exerciseFull based on selected ExerciseBases
      exerciseBaseIds.forEach(async exerciseBase => {
        try {
          let newEF = new ExerciseFull

          newEF.sets = exerciseBase.sets
          newEF.reps = exerciseBase.reps
          newEF.kg = exerciseBase.kg
          newEF.exerciseBase = exerciseBase.exerciseBase.id
          newEF.time = exerciseBase.time
          newEF.workoutSession = workoutSession
          await exerciseFullRepo.save(newEF)
        } catch (e) {
          console.log(e)
          return;
        }

      })

    } catch (e) {
      console.log(e)
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("WorkoutSession - created");
  }

  static update = async (request: Request, response: Response, next: NextFunction) => {


    let { workoutSessionId, title, trainerId, type, muscleLevel, imageName, cardioLevel, exerciseBaseIds } = request.body;
    let workoutSession = await getRepository(WorkoutSession).findOne(workoutSessionId, { relations: ["trainer"] });

    //workoutSession.id = workoutSessionId
    workoutSession.title = title
    workoutSession.trainer = trainerId
    workoutSession.type = type
    //workoutSession.workoutProgram = workoutProgramId
    workoutSession.cardioLevel = cardioLevel
    workoutSession.muscleLevel = muscleLevel
    workoutSession.imageName = imageName

    const workoutSessionRepository = getRepository(WorkoutSession)
    const exerciseBaseRepository = getRepository(ExerciseBase)
    const exerciseFullRepo = getRepository(ExerciseFull)
    try {
      await workoutSessionRepository.save(workoutSession)

      //save all exerciseFull based on selected ExerciseBases
      exerciseBaseIds.forEach(async exerciseFull => {
        try {
          let newEF = new ExerciseFull
          //-1 is sent from frontend for new exercisefull
          //old exercisefull already have id
          if (exerciseFull.id !== -1) {
            newEF.id = exerciseFull.id
          }
          newEF.sets = exerciseFull.sets
          newEF.reps = exerciseFull.reps
          newEF.kg = exerciseFull.kg
          newEF.exerciseBase = exerciseFull.exerciseBase.id
          newEF.time = exerciseFull.time
          newEF.workoutSession = workoutSession
          await exerciseFullRepo.save(newEF)
        } catch (e) {
          console.log(e)
          return;
        }

      })

    } catch (e) {
      console.log(e)
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("WorkoutSession - created");
  }

  static remove = async (request: Request, response: Response, next: NextFunction) => {
    let workoutProgramToRemove = await getRepository(WorkoutSession).findOne(request.params.id);

    await getRepository(WorkoutSession).remove(workoutProgramToRemove);

    //After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }

}