import { Request, Response } from "express";
import CalendarService from "../service/calendarService";
import { LLMService, Mode } from "../service/LLMService";

export class SumarizerController {

  public sumarize = async (req: Request, res: Response) => {
    const content = JSON.stringify(req.body);
    
    const llmService = new LLMService();
    const result = await llmService.send(content, Mode.resumeText)
    
    res.json({result});
  };
}
