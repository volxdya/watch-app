## Create migration

```bash
$ npx sequelize-cli migration:generate --name add-new-column-to-your-model
```

## Start migration

```bash
$ npx sequelize-cli db:migrate
```

## Undo last migration

```bash
$ npx sequelize-cli db:migrate:undo
```

## Undo all migrations

```bash
$ npx sequelize-cli db:migrate:undo:all
```

## Example migration file

```bash
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // create column
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('NAME OF MODEL', 'NAME OF COLUMN', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  // delete column
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('NAME OF MODEL', 'NAME OF COLUMN');
  }
};
```
