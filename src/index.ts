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

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Simple TypeScript Express Rate Limit!');
});

app.get("/specific-route", specificLimiter, (req: Request, res: Response) => {
    res.send('Specific route, Simple TypeScript Express Rate Limit!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});