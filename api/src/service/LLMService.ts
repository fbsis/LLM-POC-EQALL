import axios, { AxiosResponse } from "axios";

const API_KEY = "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";
const CHATGPT_URL = "https://api.openai.com/v1/chat/completions";

enum Mode {
  calendar = "calendar",
  resumeText = "resumeText",
}

class LLMService {
  private apiKey: string;
  private url: string;

  constructor() {
    this.apiKey = API_KEY;
    this.url = CHATGPT_URL;
  }

  public async send(content: string, mode: Mode): Promise<AxiosResponse<any>> {
    let systemMessage: string;

    if (mode === Mode.calendar) {
      systemMessage =
        "You are a helpful assistant that provides succinct meeting summaries. Create concise and clear summaries of calendar events. Use only simple text (no markdown), remove link saying who will be there";
    } else if (mode === Mode.resumeText) {
      systemMessage =
        "You are a professional summarizer. Provide a concise summary of the text in no more than 10 words. Use only simple text";
    } else {
      throw new Error("Unsupported mode");
    }

    const requestParams = {
      model: "gpt-3.5-turbo",
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
