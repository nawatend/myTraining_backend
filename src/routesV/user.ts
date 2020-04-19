import * as express from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const userRouter = express.Router()
//const userController = new UserController()

userRouter
    .get('/', UserController.all)
    .get('/:id', UserController.one)
    .post('/', UserController.save)
    .post('/update', UserController.update)
    .delete('/:id', UserController.remove)

// export const userRoueter = [{
//     method: "get",
//     route: "/users",
//     controller: UserController,
//     action: "all"
// }, {
//     method: "get",
//     route: "/users/:id",
//     controller: UserController,
//     action: "one"
// }, {
//     method: "post",
//     route: "/users",
//     controller: UserController,
//     action: "save"
// }, {
//     method: "delete",
//     route: "/users/:id",
//     controller: UserController,
//     action: "remove"
// }];

export default userRouter