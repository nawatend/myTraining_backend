import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import { Request, Response } from "express";
import { Routes } from "./routesOriginal";
import { User } from "./entity/User";

const api = require('./api');

createConnection().then(async connection => {

    // create express app
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // register express routes from defined application routes
    // Routes.forEach(route => {
    //     (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
    //         const result = (new (route.controller as any))[route.action](req, res, next);
    //         if (result instanceof Promise) {
    //             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

    //         } else if (result !== null && result !== undefined) {
    //             res.json(result);
    //         }
    //     });
    // });
    app.use("/api/", api);
    app.get("/", (req, res) => {
        res.send("Welcome to MyTraining API")
    })

    // setup express app here
    // ...


    // start express server
    app.listen(process.env.PORT || 4000, () => {
        console.log("Server started on port: " + process.env.PORT || 4000);
    });

    // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));



}).catch(error => console.log(error));
