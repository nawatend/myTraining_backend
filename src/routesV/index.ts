import * as express from "express";
import userRouter from './user'
import authRouter from './auth'

import sporterRouter from './sporter'
import trainerRouter from './trainer'

import exerciseBaseRouter from './exerciseBase'
import exerciseFullRouter from './exerciseFull'

import workoutProgramRouter from './workoutProgram'
import workoutSessionRouter from './workoutSession'

import feedbackRouter from './feedback'
import rateRouter from './rate'

import progressRouter from './progress'
const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

router.use('/sporters', sporterRouter);
router.use('/trainers', trainerRouter);

router.use('/exercisebases', exerciseBaseRouter);
router.use('/exercisefulls', exerciseFullRouter)

router.use('/workoutprograms', workoutProgramRouter)
router.use('/workoutsessions', workoutSessionRouter)

router.use('/feedbacks', feedbackRouter)
router.use('/rates', rateRouter)

router.use('/progresses', progressRouter)
export default router