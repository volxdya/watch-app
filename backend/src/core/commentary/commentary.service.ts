import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CommentaryModel } from './commentary.model';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CommentaryService {
  constructor(
    @InjectModel(CommentaryModel)
    private readonly commentaryRepository: typeof CommentaryModel,
  ) {}

  async create(dto: CreateCommentaryDto) {
    try {
      return await this.commentaryRepository.create(dto);
    } catch (err) {
      return new NotFoundError(
        'Произошла ошибка при создании комментария. Возможно, вы пытаетесь отправить его на несуществующее видео.',
      );
    }
  }

  async findAll(): Promise<CommentaryModel[]> {
    return await this.commentaryRepository.findAll();
  }
}
