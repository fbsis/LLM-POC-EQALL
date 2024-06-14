import { Request, Response } from "express";
import CalendarService from "../service/calendarService";
import { LLMService, Mode } from "../service/LLMService";

export class CalendarController {
  public getAll = async (req: Request, res: Response) => {

    const calendarService = new CalendarService();
    const data = await calendarService.getCalendarView();

    res.json(data);
  };

  public sumarize = async (req: Request, res: Response) => {
    const content = JSON.stringify(req.body);
    
    const llmService = new LLMService();
    const result = await llmService.send(content, Mode.calendar)
    
    res.json({result});
  };
}
