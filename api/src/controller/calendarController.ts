import { Request, Response } from "express";
import CalendarService from "../service/calendarService";

export class CalendarController {
  public getAll = async (req: Request, res: Response) => {

    const calendarService = new CalendarService();
    const data = await calendarService.getCalendarView();

    res.json([data]);
  };
}
