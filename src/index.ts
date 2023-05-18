import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as bodyParser from "body-parser";
import helmet from 'helmet';

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(helmet());
main.use(bodyParser.urlencoded({ extended: false }));

export const api = functions.https.onRequest(main);