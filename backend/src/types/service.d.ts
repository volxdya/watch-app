import { Includeable } from 'sequelize';

interface FindAllOptions {
  include: Includeable[] | Includeable;
}

interface ServiceOptions {
  findAll: FindAllOptions;
}