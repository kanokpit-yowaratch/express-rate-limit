import express, { Request, Response } from "express";
import cors from 'cors';
import { limiter, specificLimiter } from './middlewares/ratelimit';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(limiter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Simple TypeScript Express Rate Limit!');
});

app.get("/specific-route", specificLimiter, (req: Request, res: Response) => {
    res.send('Specific route, Simple TypeScript Express Rate Limit!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});