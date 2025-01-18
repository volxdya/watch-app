import { Test, TestingModule } from '@nestjs/testing';
import { CommentaryService } from '../commentary.service';

describe('CommentaryService', () => {
  let service: CommentaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentaryService],
    }).compile();

    service = module.get<CommentaryService>(CommentaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
