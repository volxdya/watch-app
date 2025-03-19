import { Injectable } from '@nestjs/common';
import { Service } from 'src/abstractions';
import { CreateCommentaryDto } from './dto/CreateCommentaryDto';
import { ServiceOptions } from 'src/types';
import { UserModel } from '../user';
import { InjectModel } from '@nestjs/sequelize';
import { CommentaryModel } from './commentary.model';

export const commentaryServiceOptions: ServiceOptions = {
  findAll: {
    include: [UserModel],
  },
  findOne: {
    include: [UserModel],
  },
  otherFind: {
    include: [UserModel],
  },
};

@Injectable()
export class CommentaryService extends Service<CreateCommentaryDto> {
  constructor(
    @InjectModel(CommentaryModel)
    private readonly commentaryRepository: typeof CommentaryModel,
  ) {
    super(commentaryRepository, commentaryServiceOptions);
  }
}
