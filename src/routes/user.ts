import {Router} from "express";
import Database from "../database";
import {
  validateEmployeeSetup,
  validateEmployerSetup,
  verifyToken,
} from "../middlewares/user";

const users = Router();

users.put(
  "/setupEmployee",
  verifyToken,
  validateEmployeeSetup,
  async (req, res) => {
    try {
      const newDoc = await Database.update(
        "users",
        req.body,
        res.locals as unknown as string
      );
      res.status(200).send(newDoc);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

users.put(
  "/setupEmployer",
  verifyToken,
  validateEmployerSetup,
  async (req, res) => {
    try {
      const newDoc = await Database.update(
        "users",
        req.body,
        res.locals as unknown as string
      );
      res.status(200).send(newDoc);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

export default users;
