import * as functions from "firebase-functions";
import Database from "../database";

export const createUserDoc = functions.auth.user().onCreate(async (user) => {
  const newDoc = await Database.create("users", {
    email: user.email,
    createdAt: new Date().toISOString(),
  });
  return newDoc;
});

export const deleteUserDoc = functions.auth.user().onDelete(async (user) => {
  await Database.delete("users", user.uid);
});
