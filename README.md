MoodGuardBot
Telegram Bot for Sentiment Analysis and Negativity Detection

Этот бот анализирует тональность сообщений в Telegram с использованием Hugging Face API и отправляет ответ, если сообщение имеет негативную окраску. Бот предназначен для поддержания позитивной атмосферы в чате и автоматического реагирования на негативные сообщения.

🚀 Основные функции
Анализ тональности сообщений: Бот использует модель Hugging Face для определения тональности текста (негативный, нейтральный, позитивный).

Автоматический ответ: Если сообщение определено как негативное, бот отправляет дружелюбный ответ.

Поддержка топиков: Бот может отправлять ответы в тот же топик, откуда пришло сообщение (если Telegram передаёт message_thread_id).

Логирование: Все действия бота логируются для удобства отладки и мониторинга.

🛠️ Технологии
Node-RED: Используется для создания потока обработки сообщений.

Hugging Face API: Для анализа тональности текста.

Telegram Bot API: Для взаимодействия с Telegram.

📦 Установка и настройка
1. Установите Node-RED
Если у вас ещё не установлен Node-RED, следуйте официальной документации:
https://nodered.org/docs/getting-started/

2. Установите необходимые ноды
Установите следующие ноды через панель управления Node-RED:

node-red-contrib-telegrambot (для работы с Telegram)

node-red-contrib-http-request (для отправки HTTP-запросов)

3. Настройте бота
Создайте бота через BotFather и получите токен.

Добавьте бота в ваш Telegram-чат и дайте ему права на чтение сообщений.

4. Настройте Hugging Face API
Зарегистрируйтесь на Hugging Face.

Получите API-токен для доступа к модели анализа тональности.

5. Импортируйте поток в Node-RED
Скопируйте JSON-код потока из репозитория и импортируйте его в Node-RED.

🧩 Структура потока
Telegram Receiver: Получает сообщения из Telegram.

Switch Node: Проверяет тип сообщения (текст, фото и т.д.).

Prepare Text: Очищает текст сообщения и обрезает его до 200 символов.

Prepare HTTP Request: Формирует запрос к Hugging Face API.

HTTP Request: Отправляет запрос к Hugging Face API для анализа тональности.

Обработка ответа: Анализирует ответ API и формирует сообщение для отправки.

[node-code.js](https://github.com/Gfermoto/MoodGuardBot/blob/main/node-code.js) Более развернуты ответ вида:

🚨 Внимание! В чате душно!

👤 Воздух испортил: @example_user

Состав атмосферы:

😊 Позитив: 10.00%
😐 Нейтрально: 15.00%
😠 Негатив: 75.00%

Telegram Sender: Отправляет ответное сообщение в Telegram.

⚙️ Настройка параметров
1. Замените чувствительные данные
ID чата: Замените "ВСТАВЬТЕ СВОЙ ID ЧАТА" на реальный ID вашего чата.

Токен бота: Замените "ВСТАВЬТЕ СВОЙ ТОКЕН БОТА" на токен вашего бота.

Токен Hugging Face: Замените "ВСТАВЬТЕ СВОЙ ТОКЕН HUGGING FACE" на ваш API-токен.

2. Настройка топиков
Если вы используете топики в супергруппе, убедитесь, что Telegram передаёт message_thread_id. Если нет, бот будет отправлять сообщения в общий чат.

🚨 Возможные проблемы и решения
1. Бот не отправляет сообщения
Проверьте, что бот добавлен в чат и имеет права на отправку сообщений.

Убедитесь, что токен бота указан правильно.

2. Сообщения отправляются в общий чат, а не в топик
Убедитесь, что Telegram передаёт message_thread_id в входящем сообщении.

Проверьте, что узел Telegram Sender поддерживает отправку сообщений в топики.

3. Ошибки API
Проверьте, что токен Hugging Face указан правильно.

Убедитесь, что модель API доступна и не превышены лимиты запросов.

📄 Лицензия
Этот проект распространяется под лицензией MIT. Подробнее см. в файле LICENSE.

🤝 Как помочь проекту
Если вы хотите внести свой вклад в проект, пожалуйста:

Сделайте форк репозитория.

Создайте новую ветку (git checkout -b feature/AmazingFeature).

Зафиксируйте изменения (git commit -m 'Add some AmazingFeature').

Запушьте ветку (git push origin feature/AmazingFeature).

Откройте Pull Request.

📧 Контакты
Если у вас есть вопросы или предложения, свяжитесь со мной:

Email: gfermoto@gmail.com

Telegram: @Gfermoto

🙏 Благодарности
Спасибо Hugging Face за предоставление API для анализа тональности.

Спасибо Node-RED за мощный инструмент для создания потоков.

📌 Пример использования
![Описание изображения](https://github.com/Gfermoto/MoodGuardBot/raw/main/NodeRED.png)

Версия на ![максималках](https://github.com/Gfermoto/MoodGuardBot/blob/main/bot-top.js) позволяет по расписанию или по команде опубликовать ТОП5 "душнил". Это потребует установку ряда зависимостей:
1. Установка и настройка
Импортируйте поток в Node-RED
Настройте узел Telegram Bot с вашим API-токеном
Настройте доступ к вашей базе данных InfluxDB
Получите API-ключ от Hugging Face и настройте HTTP-запрос
Разверните поток
2. Требования
Node-RED
InfluxDB (версия 1.x)
Доступ к Telegram Bot API
Доступ к Hugging Face API

🏆 Рейтинг негатива за неделю:

🥇 @username1: XX.XX%
🥈 @username2: XX.XX%
🥉 @username3: XX.XX%
4️⃣ @username4: XX.XX%
5️⃣ @username5: XX.XX%

💡 Чем выше процент, тем больше негатива в сообщениях.

![Описание изображения](https://github.com/Gfermoto/MoodGuardBot/blob/main/flow.png)




