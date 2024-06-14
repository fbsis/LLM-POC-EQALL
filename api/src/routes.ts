import { Router, Request, Response } from 'express';
import { CalendarController } from './controller/calendarController';
import { SumarizerController } from './controller/sumarizerController';

const router = Router();

router.get('/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from API route!' });
});


const calendarController = new CalendarController();
const sumarizeController = new SumarizerController();

router.get("/calendar", calendarController.getAll);
router.post("/calendar/sumarize", calendarController.sumarize);
router.post("/sumarizer/", sumarizeController.sumarize);


export default router;
