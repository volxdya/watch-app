import { Includeable } from 'sequelize';

interface FindAllOptions {
  include: Includeable[] | Includeable;
  limit?: number;
}


interface OtherFind {
  include: Includeable[] | Includeable;
}

interface ServiceOptions {
  findAll: FindAllOptions;
  otherFind: OtherFind;
}
