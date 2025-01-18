import { Controller } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { AController } from 'src/abstractions';

@Controller('commentary')
export class CommentaryController extends AController<CommentaryService> {
  constructor(private readonly commentaryService: CommentaryService) {
    super(commentaryService);
  }
}
