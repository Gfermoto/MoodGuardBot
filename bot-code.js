// Проверка, что ответ является JSON, а не HTML
if (typeof msg.payload === 'string' && msg.payload.includes('<!DOCTYPE html>')) {
    node.warn('API вернул HTML вместо JSON. Возможно, сервер недоступен.');
    return null;
}

// Проверка статуса HTTP-ответа
if (msg.statusCode !== 200) {
    node.warn(`Ошибка API: статус ${msg.statusCode}`);
    return null;
}

// Логируем ответ от API для диагностики
node.warn("Ответ от API: " + JSON.stringify(msg.payload, null, 2));

// Обработка JSON-ответа
if (msg.payload.error) {
    node.warn(`Ошибка API: ${msg.payload.error}`);
    return null;
} else if (Array.isArray(msg.payload) && msg.payload.length > 0) {
    // Извлекаем вложенный массив с результатами
    const results = msg.payload[0];

    // Проверяем, что results является массивом
    if (Array.isArray(results) && results.length > 0) {
        // Ищем результат с максимальной уверенностью (score)
        const topResult = results.reduce((prev, current) => {
            return (prev.score > current.score) ? prev : current;
        });

        // Логируем результат анализа
        node.warn(`Определена тональность: ${topResult.label} (${topResult.score})`);

        if (topResult.label === "negative" && topResult.score > 0.8) { // Проверяем уверенность модели
            try {
                // Формируем сообщение для отправки в Telegram
                const replyMessage = {
                    chatId: msg.chatId || "ВСТАВЬТЕ СВОЙ ID ЧАТА", // Используем chatId из входящего сообщения или ваш ID чата
                    message_thread_id: msg.message_thread_id, // Указываем топик, если он есть
                    type: "message",
                    content: "Эй, не стоит быть таким душным! 😊"
                };

                // Проверяем, что message_thread_id передан
                if (!replyMessage.message_thread_id) {
                    node.warn("Ошибка: message_thread_id не найден в входящем сообщении. Отправляю в общий чат.");
                }

                node.warn("Сообщение для Telegram: " + JSON.stringify(replyMessage, null, 2));
                node.warn("Отправляю сообщение в Telegram...");

                // Возвращаем сообщение для отправки
                return { payload: replyMessage };
            } catch (error) {
                node.warn(`Ошибка при отправке сообщения: ${error}`);
                return null;
            }
        } else {
            node.warn("Тональность не негативная или уверенность модели слишком низкая.");
            return null; // Не отправляем сообщение
        }
    } else {
        node.warn("Ошибка: вложенный массив results пуст или не является массивом");
        return null;
    }
} else {
    node.warn("Ошибка: ответ API не содержит данных или не является массивом");
    return null;
}
