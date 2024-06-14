import axios, { AxiosResponse } from "axios";

const API_KEY = "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";
const CHATGPT_URL = "https://api.openai.com/v1/chat/completions";

enum Mode {
  calendar = "calendar",
  resumeText = "resumeText",
}

const systemMessages: { [key in Mode]: string } = {
  [Mode.calendar]: "You are a helpful assistant summarizing calendar events concisely. If details are lacking, mention only time and attendees, specifying afternoon or evening. Keep it under 50 words. Do not use markdown, only plain text",
  [Mode.resumeText]: "You are a professional summarizer. Provide a concise summary of the text in no more than 10 words. Use only simple text",
};

class LLMService {
  private apiKey: string;
  private url: string;

  constructor() {
    this.apiKey = API_KEY;
    this.url = CHATGPT_URL;
  }

  public async send(content: string, mode: Mode): Promise<string> {
    const systemMessage = systemMessages[mode];

    if (!systemMessage) {
      throw new Error("Unsupported mode");
    }

    const requestParams = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content,
        },
      ],
      temperature: 1,
      presence_penalty: 1,
      frequency_penalty: 1,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      url: this.url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      data: JSON.stringify(requestParams),
    };

    const result = await axios.request(config);
    return result.data.choices[0].message.content;
  }
}

export { LLMService, Mode };
