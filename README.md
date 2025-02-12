<h1>Watch</h1>
<p>Видеохостинг с AI</p>

<h1>In Future</h1>

1. - [ ] Микросервисная архитектура
2. - [ ] Низкий уровень абстракций
3. - [ ] Запилить мощный фронтенд, мощный плеер
4. - [ ] Сделать логику подписок, привязку тг, чтобы бот отправлял уведомления о том, что какой-то пользователь выложил новый ролик
5. - [ ] Статистика каналов, роликов
6. - [ ] Логика запроса аналитики каналов с помощью машинного обучения, прогнозы
7. - [ ] Deploy

<h1>Stack</h1>

<h1>Main: </h1>

1. Docker
2. Git
3. Telegram

<h2>Backend: </h2>

1. Nest.JS
2. TypeScript
3. RabbitMQ
4. Redis
5. Telegram API
6. PostgreSQL
7. Sequalize (ORM)
8. Unit Testing

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

<h2>Frontend?</h2>
<p>Пока что на стадии написания API</p>
