import HttpService from "./httpService";
import { AxiosRequestConfig } from "axios";
import { injectable } from "tsyringe";
import { CalendarAdapter } from "../helper/calendarAdapter";

interface CalendarServiceConfig {
  baseUrl: string;
  token: string;
  startDatetime: string;
  endDatetime: string;
}

class CalendarService {
  private httpService: HttpService;
  private config: CalendarServiceConfig;

  constructor(config: Partial<CalendarServiceConfig> = {}) {
    this.config = {
      baseUrl: "https://graph.office.net/en-us/graph/api/proxy",
      token: "{token:https://graph.microsoft.com/}",
      startDatetime: "2024-06-13T19:40:39.225Z",
      endDatetime: "2024-06-20T19:40:39.225Z",
      ...config,
    };

    const axiosConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${this.config.token}`,
        "Content-Type": "application/json",
        Prefer: "ms-graph-dev-mode",
        Referer: "https://developer.microsoft.com/",
        Accept: "application/json",
      },
    };

    this.httpService = new HttpService(axiosConfig);
  }

  public async getCalendarView() {
    const encodedUrl = encodeURIComponent(
      `https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=${this.config.startDatetime}&enddatetime=${this.config.endDatetime}`
    );
    const fullUrl = `${this.config.baseUrl}?url=${encodedUrl}`;

    try {
      const response = await this.httpService.get(fullUrl);

      const adapter = CalendarAdapter.adapt(response.data as any);
      return adapter;
    } catch (error) {
      console.error("Error fetching calendar view:", error);
      throw error;
    }
  }
}

export default CalendarService;
