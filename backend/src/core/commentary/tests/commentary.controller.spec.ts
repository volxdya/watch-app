import { Test, TestingModule } from '@nestjs/testing';
import { CommentaryController } from '../commentary.controller';
import { CommentaryService } from '../commentary.service';

describe('CommentaryController', () => {
  let controller: CommentaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentaryController],
      providers: [CommentaryService],
    }).compile();

    controller = module.get<CommentaryController>(CommentaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
