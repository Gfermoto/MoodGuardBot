[
    {
        "id": "ca63caabcb27c7c0",
        "type": "tab",
        "label": "Негатив",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "c257c6779676a932",
        "type": "telegram receiver",
        "z": "ca63caabcb27c7c0",
        "name": "",
        "bot": "df690a6504c1e710",
        "saveDataDir": "",
        "filterCommands": false,
        "x": 150,
        "y": 80,
        "wires": [
            [
                "e2f6f36b7a716257",
                "fcc6d624e3871207"
            ],
            []
        ]
    },
    {
        "id": "e2f6f36b7a716257",
        "type": "switch",
        "z": "ca63caabcb27c7c0",
        "name": "Check Message Type",
        "property": "payload.type",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "message",
                "vt": "str"
            },
            {
                "t": "else"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 2,
        "x": 180,
        "y": 260,
        "wires": [
            [
                "93916478bd5faa4f"
            ],
            [
                "820fa3bef3c6c32f"
            ]
        ]
    },
    {
        "id": "93916478bd5faa4f",
        "type": "function",
        "z": "ca63caabcb27c7c0",
        "name": "Prepare Text",
        "func": "// Check if msg.payload and msg.payload.content are defined and not empty\nif (msg.payload && msg.payload.content && msg.payload.content.length > 0) {\n    // Remove extra spaces and limit length\n    msg.payload.content = msg.payload.content.trim();\n    if (msg.payload.content.length > 200) {\n        msg.payload.content = msg.payload.content.substring(0, 200);\n    }\n    msg.payload.text = msg.payload.content; // Add msg.payload.text for compatibility with later nodes\n    return msg;\n} else {\n    // If msg.payload or msg.payload.content is undefined or empty, log a warning and return null\n    node.warn(\"Предупреждение: msg.payload или msg.payload.content не определены или пустые\");\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 470,
        "y": 380,
        "wires": [
            [
                "28e469f52cd410e5"
            ]
        ]
    },
    {
        "id": "f4ed21f493791df1",
        "type": "http request",
        "z": "ca63caabcb27c7c0",
        "name": "Hugging Face API",
        "method": "POST",
        "ret": "obj",
        "paytoqs": "ignore",
        "url": "https://api-inference.huggingface.co/models/seara/rubert-base-cased-russian-sentiment",
        "tls": "",
        "persist": false,
        "proxy": "",
        "insecureHTTPParser": false,
        "authType": "bearer",
        "senderr": false,
        "headers": [
            {
                "keyType": "Authorization",
                "keyValue": "",
                "valueType": "other",
                "valueValue": "Bearer ВСТАВЬТЕ_СВОЙ_ТОКЕН_HUGGING_FACE"
            }
        ],
        "x": 710,
        "y": 160,
        "wires": [
            [
                "0d777935487f5a75"
            ]
        ]
    },
    {
        "id": "0d777935487f5a75",
        "type": "function",
        "z": "ca63caabcb27c7c0",
        "name": "Обработка ответа",
        "func": "// Проверка, что ответ является JSON, а не HTML\nif (typeof msg.payload === 'string' && msg.payload.includes('<!DOCTYPE html>')) {\n    node.warn('API вернул HTML вместо JSON. Возможно, сервер недоступен.');\n    return null;\n}\n\n// Проверка статуса HTTP-ответа\nif (msg.statusCode !== 200) {\n    node.warn(`Ошибка API: статус ${msg.statusCode}`);\n    return null;\n}\n\n// Логируем ответ от API для диагностики\nnode.warn(\"Ответ от API: \" + JSON.stringify(msg.payload, null, 2));\n\n// Обработка JSON-ответа\nif (msg.payload.error) {\n    node.warn(`Ошибка API: ${msg.payload.error}`);\n    return null;\n} else if (Array.isArray(msg.payload) && msg.payload.length > 0) {\n    // Извлекаем вложенный массив с результатами\n    const results = msg.payload[0];\n\n    // Проверяем, что results является массивом\n    if (Array.isArray(results) && results.length > 0) {\n        // Ищем результат с максимальной уверенностью (score)\n        const topResult = results.reduce((prev, current) => {\n            return (prev.score > current.score) ? prev : current;\n        });\n\n        // Логируем результат анализа\n        node.warn(`Определена тональность: ${topResult.label} (${topResult.score})`);\n\n        if (topResult.label === \"negative\" && topResult.score > 0.8) { // Проверяем уверенность модели\n            try {\n                // Формируем сообщение для отправки в Telegram\n                const replyMessage = {\n                    chatId: msg.chatId || \"ВСТАВЬТЕ_СВОЙ_ID_ЧАТА\", // Используем chatId из входящего сообщения\n                    message_thread_id: msg.message_thread_id, // Указываем топик, если он есть\n                    type: \"message\",\n                    content: \"Внимание, в чат зашел душный человек! Для него здесь есть особая комната...😊\"\n                };\n                node.warn(\"Сообщение для Telegram: \" + JSON.stringify(replyMessage, null, 2));\n                node.warn(\"Отправляю сообщение в Telegram...\");\n\n                // Возвращаем сообщение для отправки\n                return { payload: replyMessage };\n            } catch (error) {\n                node.warn(`Ошибка при отправке сообщения: ${error}`);\n                return null;\n            }\n        } else {\n            node.warn(\"Тональность не негативная или уверенность модели слишком низкая.\");\n            return null; // Не отправляем сообщение\n        }\n    } else {\n        node.warn(\"Ошибка: вложенный массив results пуст или не является массивом\");\n        return null;\n    }\n} else {\n    node.warn(\"Ошибка: ответ API не содержит данных или не является массивом\");\n    return null;\n}",
        "outputs": 2,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 300,
        "wires": [
            [
                "4bfa450c25290315"
            ],
            []
        ]
    },
    {
        "id": "820fa3bef3c6c32f",
        "type": "function",
        "z": "ca63caabcb27c7c0",
        "name": "Handle Non-Text Message",
        "func": "// Handle non-text messages (e.g., photos, stickers)\nnode.warn('Получено не текстовое сообщение');\n// You can add logic here to handle different message types\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 220,
        "y": 380,
        "wires": [
            []
        ]
    },
    {
        "id": "b53718c0cc871038",
        "type": "debug",
        "z": "ca63caabcb27c7c0",
        "name": "debug 3",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 720,
        "y": 100,
        "wires": []
    },
    {
        "id": "28e469f52cd410e5",
        "type": "function",
        "z": "ca63caabcb27c7c0",
        "name": "Prepare HTTP Request",
        "func": "msg.payload = {\n    inputs: msg.payload.text\n};\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 490,
        "y": 240,
        "wires": [
            [
                "f4ed21f493791df1"
            ]
        ]
    },
    {
        "id": "118a9e58a48ede73",
        "type": "telegram sender",
        "z": "ca63caabcb27c7c0",
        "name": "Группа TG",
        "bot": "df690a6504c1e710",
        "haserroroutput": false,
        "outputs": 1,
        "x": 710,
        "y": 500,
        "wires": [
            []
        ]
    },
    {
        "id": "92b31c8adcba05c3",
        "type": "catch",
        "z": "ca63caabcb27c7c0",
        "name": "",
        "scope": null,
        "uncaught": true,
        "x": 480,
        "y": 140,
        "wires": [
            [
                "b53718c0cc871038"
            ]
        ]
    },
    {
        "id": "fcc6d624e3871207",
        "type": "function",
        "z": "ca63caabcb27c7c0",
        "d": true,
        "name": "Time Check (22:00 - 07:00)",
        "func": "// Get the current hour (in 24-hour format)\nconst now = new Date();\nconst hour = now.getHours();\n\n// Check if the current time is within the allowed range (22:00 - 07:00)\nif (hour >= 22 || hour < 7) {\n    // If within the allowed range, pass the message to the next node\n    return msg;\n} else {\n    // If outside the allowed range, discard the message\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 420,
        "y": 40,
        "wires": [
            [
                "b53718c0cc871038"
            ]
        ]
    },
    {
        "id": "4bfa450c25290315",
        "type": "delay",
        "z": "ca63caabcb27c7c0",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 710,
        "y": 420,
        "wires": [
            [
                "118a9e58a48ede73"
            ]
        ]
    },
    {
        "id": "df690a6504c1e710",
        "type": "telegram bot",
        "botname": "ВСТАВЬТЕ_ИМЯ_БОТА",
        "usernames": "",
        "chatids": "ВСТАВЬТЕ_СВОЙ_ID_ЧАТА",
        "baseapiurl": "",
        "testenvironment": false,
        "updatemode": "polling",
        "pollinterval": "2500",
        "usesocks": false,
        "sockshost": "",
        "socksprotocol": "socks5",
        "socksport": "6667",
        "socksusername": "anonymous",
        "sockspassword": "",
        "bothost": "",
        "botpath": "",
        "localbotport": "8443",
        "publicbotport": "8443",
        "privatekey": "",
        "certificate": "",
        "useselfsignedcertificate": false,
        "sslterminated": false,
        "verboselogging": false
    }
]
