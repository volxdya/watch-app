import { z } from 'zod';

const END_POINT = 'https://api.escuelajs.co/api/v1/users';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  avatar: z.string(),
  creationAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;

const Users = z.array(UserSchema);

export type Users = z.infer<typeof Users>;

export function usersFetch(): Promise<Users> {
  // Кидаем GET запрос на сервер
  return (
    fetch(END_POINT, {
      method: 'GET',
    })
      // Парсим данные
      .then((response) => response.json())
 
      // Валидируем данные
      .then((data) => Users.parse(data))
  );
}