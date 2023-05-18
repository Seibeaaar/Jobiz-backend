import * as express from "express";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import users from "./routes/user";

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

export const firestore = admin.firestore();

app.use("/users", users);

export const api = functions.https.onRequest(app);
