<h1>Watch</h1>
<p>Видеохостинг</p>

<h1>Stack</h1>

<h1>Main: </h1>

1. Docker
2. Git
3. Telegram

<h2>Backend: </h2>

1. TypeScript
2. Nest.JS
3. RabbitMQ
4. Redis
5. Telegram API
6. PostgreSQL
7. Sequalize (ORM)
8. Unit Testing

<h2>Frontend: </h2>

1. TypeScript
2. React.JS
3. MobX
4. React Query
5. Zod

<h1>Запуск и установка зависимостей</h1>

<h2>Backend</h2>

> [!NOTE]
>
> ### Нужно иметь установленный PostgreSQL и Redis, если вы запускаете проект без докера.

> [!NOTE]
>
> ### Статика раздается по localhost:{port}/filename
>
> ### API имеет глобальный префикс /api
>
> ### ENV Variables
>
> ### SERVER_PORT
>
> ### POSTGRES_HOST
>
> ### POSTGRES_PORT
>
> ### POSTGRES_USERNAME
>
> ### POSTGRES_PASSWORD
>
> ### POSTGRES_DATEBASE
>
> ### SECRET_JWT
>
> ### MISTRAL_KEY

### Установка зависимостей

```
$ npm install
```

### Запуск сервера

```
$ npm run start:dev
```

### GraphQL эндпоинт

```
$ http://{host}/api/graphql
```

<h2>Docker</h2>

### Билд имеджей

```
$ docker-compose build
```

### Запуск контейнеров

```
$ docker-compose up
```

<h2>Frontend</h2>

### Установка зависимостей

```
$ npm install
```

### Запуск сервера

```
$ npm run start:dev
```
