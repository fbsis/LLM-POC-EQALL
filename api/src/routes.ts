import { Router, Request, Response } from 'express';
import { CalendarController } from './controller/calendarController';

const router = Router();

router.get('/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from API route!' });
});


const calendarController = new CalendarController();

router.get("/calendar", calendarController.getAll);


export default router;
