import express, { Request, Response } from 'express';
import { limiter, specificLimiter } from './middlewares/ratelimit';

const app = express();

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

const port = process.env.PORT || 3210;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});