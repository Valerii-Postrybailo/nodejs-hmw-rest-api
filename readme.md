# Додано можливість завантаження аватарки користувача через [Multer] (https://github.com/expressjs/multer).

## Крок 1️⃣

Для роздачі статики створено папку public . У цій папці створено папку avatars. Express  налаштований на роздачу статичних файлів з папки public.

## Крок 2️⃣

У схему користувача додано нову властивість avatarURL яка буде використана для зберігання зображення.

```
{
  ...
  avatarURL: String,
  ...
}
```

Використано пакет gravatar, для того, щоб при реєстрації нового користувача відразу згенерувати йому аватар по його email.

## Крок 3️⃣

#### При реєстрації користувача:

- За допомогою gravatar генерується посилання на аватарку користувача.
- Отриманий URL зберігається в поле avatarURL під час створення користувача.

## Крок 4️⃣

Додано можливість обновлення аватарки, для цього створено ендпоінт /users/avatars і використано метод PATCH.

#### Запит

```
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: завантажений файл
```

#### Успішна відповідь

```
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "тут буде посилання на зображення"
}
```

#### Неуспішна відповідь

```
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

- В корені проекту створено папку temp, де тимчасово зберігаються нові аватарки.

- Нові ватарки оброблюються пакетом jimp, для них задається розмір 250 на 250.

- Аватарка користувача переноситься з папки temp в папку public/avatars і отримує унікальне ім'я для конкретного користувача.

## Додатково

Написано unit-тести для контролера входу (логін). Для цього використано Jest

- відповідь повина мати статус-код 200
- у відповіді повинен повертатися токен
- у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
