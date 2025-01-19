import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateDto } from './dto/GenerateDto';
import { Docs } from 'src/utils/http/decorators/docs.decorator';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  @Docs({
    summary: `Generate AI request, (IN FUTURE)`,
    status: 200,
    description: 'OK',
  })
  generate(@Body() dto: GenerateDto) {
    return this.aiService.generate(dto);
  }
}
