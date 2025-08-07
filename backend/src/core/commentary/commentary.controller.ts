import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';

@Controller('commentary')
export class CommentaryController {
  constructor(private readonly commentaryService: CommentaryService) {}

  @Post('create')
  async create(@Body() dto: CreateCommentaryDto) {
    return await this.commentaryService.create(dto);
  }

  @Get('find_all')
  async findAll() {
    return await this.commentaryService.findAll();
  }
}
