import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  let token = <string>req.headers["authorization"];
  token = token.substring(7, token.length)
  console.log(token)
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
    console.log("JWT Confirmed")
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    console.log("JWT Not Confirmed")
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, role, email } = jwtPayload;
  const newToken = jwt.sign({ userId, role, email }, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};