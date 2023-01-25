## Продовження створення REST API для роботи з колекцією контактів. Додано логіку аутентифікації / авторизації користувача через JWT.

## Крок 1️⃣

У коді створену схему і модель користувача для колекції users.

```
{
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String
}
```

Змініть схему контактів, щоб кожен користувач бачив тільки свої контакти. Для цього в схемі контактів додайте властивість

```
owner: {
  type: SchemaTypes.ObjectId,
  ref: 'user',
}
```

Примітка: 'user' - назва колекції, у якій зберігаються користувачі.

## Крок 2️⃣

### Регістрація

- Створено ендпоінт /users/register

- Зроблено валідацію всіх обов'язкових полів (email і password). При помилці валідації повертається помилка валідації.

- У разі успішної валідації в моделі User, сприючись на дані які пройшли валідацію створюється користувач. Для "засолювання" паролів використовується bcrypt або bcryptjs.

- Якщо пошта вже використовується кимось іншим, повертається помилка Conflict. В іншому випадку повернути успішна відповідь.

#### Registration request

```
POST /users/register
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### Registration validation error

```
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
Registration conflict error
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
```

#### Registration success response

```
Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

### Логін

- Створено ендпоінт /users/login.

- В моделі User можна знайти користувача за email.

- Реалізовно валідацію всіх обов'язкових полів (email і password). При помилці валідації повертається помилку валідації.

- У випадку збігання імейлів, порівнюється пароль для знайденого користувача, якщо паролі збігаються, то генерується токен, що зберігається у поточного юзера і все це повертає успішна відповідь.

- Якщо пароль або імейл невірний, повертається помилка Unauthorized.

#### Login request

```
GET /users/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### Login validation error

```
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
```

#### Login success response

```
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

#### Login auth error

```
Status: 401 Unauthorized
ResponseBody: {
  "message": "Email or password is wrong"
}
```

## Крок 3️⃣

### Перевірка токена

Створення мідлвара для перевірки токена і додавання його до всіх роутів, які є захищеними.

- Мідлвар бере токен з заголовків Authorization, та перевіряє токен на валідність.

- У випадку помилки повернути Помилку Unauthorized.

- Якщо валідація проходить успішно, з токена отримується id користувача. По цьому id у базі даних знаходиться користувач.

- Якщо користувач існує і токен збігається з тим, що знаходиться в базі, його дані записуються в req.user і викликається next().

- Якщо користувача з таким id НЕ існує або токени не збігаються, повертається помилка Unauthorized

#### Middleware unauthorized error

```
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## Крок 4️⃣

### Логаут

- Створено ендпоінт /users/logout.

- В маршрут додано мідлвар перевірки токена.

- У моделі User користувача можна знайти за _id.

- Якщо користувача не існує повернути помилку Unauthorized.

- В іншому випадку, токен видаляється у поточного юзера і повертається Успішна відповідь.

#### Logout request

```
POST /users/logout
Authorization: "Bearer {{token}}"
```

#### Logout unauthorized error

```
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

#### Logout success response

```
Status: 204 No Content
```

## Крок 5️⃣

#### Поточний користувач - отримання даних юзера по токену

- Створиний ендпоінт /users/current.

- В роут доданий мідлвар перевірки токена.

- Якщо користувача не існує повертається помилка Unauthorized.

- В іншому випадку повернути успішну відповідь.

#### Current user request

```
GET /users/current
Authorization: "Bearer {{token}}"
Current user unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

#### Current user success response

```
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "starter"
}
```

### Додатково

- Реалізована пагінація для колекції контактів (GET /contacts?page=1&limit=20).
- Зроблено фільтрацію контактів по полю обраного (GET /contacts?favorite=true).
