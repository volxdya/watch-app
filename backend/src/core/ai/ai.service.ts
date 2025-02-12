import { Injectable } from '@nestjs/common';
import { GenerateDto } from './dto/GenerateDto';
import { Mistral } from "@mistralai/mistralai";

@Injectable()
export class AiService {
  apiKey: string = process.env.MISTRAL_KEY || 'secret';

  mistral = new Mistral({
    apiKey: this.apiKey
  });

  async generate(dto: GenerateDto) {
    const result = await this.mistral.chat.complete({
      model: "mistral-small-latest",
      stream: false,
      messages: [
        {
          content: dto.message,
          role: "user",
        },
      ],
    });

    return result.choices[0].message.content;
  }
}
