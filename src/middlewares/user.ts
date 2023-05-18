import {EmployeeSchema, EmployerSchema} from "../schemas/User";
import * as admin from "firebase-admin";
import {Request, Response, NextFunction} from "express";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const idToken = authHeader.split(" ")[1];
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      res.locals = decodedToken.uid as unknown as Record<string, any>;
      next();
    } else {
      res.status(401).send("No token provided");
    }
  } catch (e) {
    res.status(403).send("Invalid token");
  }
};

export const validateEmployerSetup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await EmployerSchema.validate(req.body);
    await admin.auth().setCustomUserClaims(req.body.id, {
      employer: true,
    });
    next();
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const validateEmployeeSetup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await EmployeeSchema.validate(req.body);
    await admin.auth().setCustomUserClaims(req.body.id, {
      employer: false,
    });
    next();
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
