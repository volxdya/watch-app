import { Injectable } from '@nestjs/common';
import ollama from 'ollama';
import { GenerateDto } from './dto/GenerateDto';

@Injectable()
export class AiService {
  model: string = process.env.AI_MODEL ?? 'llama3123123123';

  async generate(dto: GenerateDto) {
    const response = await ollama.chat({
      model: this.model,
      messages: [{ role: 'user', content: dto.message }],
    });

    return response;
  }
}
