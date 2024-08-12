import express, { Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';

const app = express();

const limiter = rateLimit({
    // windowMs: 15 * 60 * 1000, // 15 = 15 minutes, 1 = 1 minute
    // windowMs: 1 * 60 * 1000, // 15 = 15 minutes, 1 = 1 minute
    windowMs: 1 * 5 * 1000, // 15 = 15 minutes, 1 = 1 minute => 60 => 5 = 5 seconds
    limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Simple TypeScript Express Rate Limit!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});