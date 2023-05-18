import * as express from "express";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import users from "./routes/user";

import {createUserDoc, deleteUserDoc} from "./auth/handlers";

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

export const firestore = admin.firestore();

app.use("/users", users);

// Firebase functions
export const api = functions.https.onRequest(app);
export const handleUserCreate = functions.auth.user().onCreate(createUserDoc);
export const handleUserDelete = functions.auth.user().onDelete(deleteUserDoc);
