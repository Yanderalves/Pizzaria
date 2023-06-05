import { router } from './routes';
import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());

app.use(router);

app.listen(3030);