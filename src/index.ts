import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors';
import mysql from 'mysql2/promise';
import { limiter, specificLimiter } from './middlewares/ratelimit';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apply the rate limiting middleware to all requests.
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