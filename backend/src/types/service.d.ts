import { Includeable } from 'sequelize';

interface FindAllOptions {
  include: Includeable[] | Includeable;
  limit?: number;
}

interface ServiceOptions {
  findAll: FindAllOptions;
}