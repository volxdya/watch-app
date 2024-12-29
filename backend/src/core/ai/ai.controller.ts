import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateDto } from './dto/GenerateDto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  generate(@Body() dto: GenerateDto) {
    return this.aiService.generate(dto);
  }
}
