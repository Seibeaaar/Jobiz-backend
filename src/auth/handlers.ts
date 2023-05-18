import Database from "../database";
import {UserRecord} from "firebase-admin/auth";

export const createUserDoc = async (user: UserRecord) => {
  const newDoc = await Database.create("users", {
    email: user.email,
    createdAt: new Date().toISOString(),
  });
  return newDoc;
};

export const deleteUserDoc = async (user: UserRecord) => {
  await Database.delete("users", user.uid);
};
