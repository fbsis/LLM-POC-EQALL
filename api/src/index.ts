import express, { Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
