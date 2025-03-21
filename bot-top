[
    {
        "id": "e460b1036ab63ed2",
        "type": "tab",
        "label": "Негатив 🧘 с рейтингом",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "c277f366ea100afa",
        "type": "telegram receiver",
        "z": "e460b1036ab63ed2",
        "name": "",
        "bot": "df690a6504c1e710",
        "saveDataDir": "",
        "filterCommands": false,
        "x": 150,
        "y": 80,
        "wires": [
            [
                "cd0cd36b74414c17"
            ],
            []
        ]
    },
    {
        "id": "cd0cd36b74414c17",
        "type": "switch",
        "z": "e460b1036ab63ed2",
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
                "3cc23f1352e1e9c1"
            ],
            [
                "f813c4710137ec21"
            ]
        ]
    },
    {
        "id": "3cc23f1352e1e9c1",
        "type": "switch",
        "z": "e460b1036ab63ed2",
        "name": "Check Command",
        "property": "payload.content",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "/top5",
                "vt": "str"
            },
            {
                "t": "else"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 2,
        "x": 330,
        "y": 180,
        "wires": [
            [
                "bf3216fb7bc3b3fb"
            ],
            [
                "87bea497a560b4c8"
            ]
        ]
    },
    {
        "id": "87bea497a560b4c8",
        "type": "function",
        "z": "e460b1036ab63ed2",
        "name": "Prepare Text",
        "func": "if (msg.payload?.content) {\n    msg.payload.text = msg.payload.content.trim().substring(0,200);\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "x": 410,
        "y": 440,
        "wires": [
            [
                "4d1654decbdf9598"
            ]
        ]
    },
    {
        "id": "e4cc55e2fe8a0e41",
        "type": "function",
        "z": "e460b1036ab63ed2",
        "name": "Обработка ответа",
        "func": "// ... (полный код функции без изменений) ...",
        "outputs": 2,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 300,
        "wires": [
            [
                "c20b24cfc522cfc1"
            ],
            [
                "eac188cd7ffb6380"
            ]
        ]
    },
    {
        "id": "f813c4710137ec21",
        "type": "function",
        "z": "e460b1036ab63ed2",
        "name": "Handle Non-Text",
        "func": "return null;",
        "outputs": 1,
        "x": 170,
        "y": 440,
        "wires": [
            []
        ]
    },
    {
        "id": "c86f2908cfe1cf0b",
        "type": "debug",
        "z": "e460b1036ab63ed2",
        "name": "Debug Input",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 1010,
        "y": 580,
        "wires": []
    },
    {
        "id": "4d1654decbdf9598",
        "type": "function",
        "z": "e460b1036ab63ed2",
        "name": "Prepare Request",
        "func": "msg.payload = {inputs: msg.payload.text};\nreturn msg;",
        "outputs": 1,
        "x": 530,
        "y": 340,
        "wires": [
            [
                "16ab1b2811357954"
            ]
        ]
    },
    {
        "id": "0c746e345489475d",
        "type": "telegram sender",
        "z": "e460b1036ab63ed2",
        "name": "Группа TG",
        "bot": "df690a6504c1e710",
        "haserroroutput": false,
        "outputs": 1,
        "x": 1350,
        "y": 240,
        "wires": [
            []
        ]
    },
    {
        "id": "16ab1b2811357954",
        "type": "http request",
        "z": "e460b1036ab63ed2",
        "name": "Hugging Face API",
        "method": "POST",
        "ret": "txt",
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
                "valueValue": "Bearer YOUR_HUGGINGFACE_TOKEN"
            },
            {
                "keyType": "Content-Type",
                "keyValue": "",
                "valueType": "other",
                "valueValue": "application/json"
            }
        ],
        "x": 730,
        "y": 460,
        "wires": [
            [
                "e4cc55e2fe8a0e41"
            ]
        ]
    },
    {
        "id": "c20b24cfc522cfc1",
        "type": "delay",
        "z": "e460b1036ab63ed2",
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
        "outputs": 1,
        "x": 1130,
        "y": 240,
        "wires": [
            [
                "0c746e345489475d"
            ]
        ]
    },
    {
        "id": "39aa91f29304e2bc",
        "type": "catch",
        "z": "e460b1036ab63ed2",
        "name": "",
        "scope": null,
        "uncaught": true,
        "x": 680,
        "y": 580,
        "wires": [
            [
                "c86f2908cfe1cf0b"
            ]
        ]
    },
    {
        "id": "eac188cd7ffb6380",
        "type": "function",
        "z": "e460b1036ab63ed2",
        "name": "Подготовка для InfluxDB",
        "func": "// ... (полный код функции без изменений) ...",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1010,
        "y": 380,
        "wires": [
            [
                "472b98686ef8a861"
            ]
        ]
    },
    {
        "id": "472b98686ef8a861",
        "type": "influxdb out",
        "z": "e460b1036ab63ed2",
        "influxdb": "e9edb98dae81967c",
        "name": "Сохранение в InfluxDB",
        "measurement": "telegram_sentiment",
        "precision": "s",
        "retentionPolicy": "",
        "database": "home_assistant",
        "precisionV18FluxV20": "s",
        "retentionPolicyV18Flux": "",
        "x": 1290,
        "y": 420,
        "wires": []
    },
    {
        "id": "bf3216fb7bc3b3fb",
        "type": "function",
        "z": "e460b1036ab63ed2",
        "name": "Подготовить запрос TOP-5",
        "func": "// ... (полный код функции без изменений) ...",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 640,
        "y": 220,
        "wires": [
            [
                "c45e5045e301e06f"
            ]
        ]
    },
    {
        "id": "c45e5045e301e06f",
        "type": "influxdb in",
        "z": "e460b1036ab63ed2",
        "influxdb": "e9edb98dae81967c",
        "name": "Запрос TOP-5 пользователей",
        "query": "SELECT MEAN(negative) as mean_negative, last(username) as username FROM \"telegram_sentiment\" WHERE time > now() - 7d GROUP BY username FILL(none)",
        "rawOutput": false,
        "precision": "",
        "retentionPolicy": "",
        "org": "home_assistant",
        "x": 910,
        "y": 140,
        "wires": [
            [
                "5632ae8627e6af59"
            ]
        ]
    },
    {
        "id": "5632ae8627e6af59",
        "type": "function",
        "z": "e460b1036ab63ed2",
        "name": "Форматирование TOP-5",
        "func": "// ... (полный код функции без изменений) ...",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 80,
        "wires": [
            [
                "c20b24cfc522cfc1"
            ]
        ]
    },
    {
        "id": "17d45e8709915957",
        "type": "inject",
        "z": "e460b1036ab63ed2",
        "d": true,
        "name": "Пятница 19:00",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "_originalMessage",
                "v": "{\"chat\":{\"id\":YOUR_TELEGRAM_GROUP_ID}}",
                "vt": "json"
            }
        ],
        "repeat": "",
        "crontab": "00 19 * * 5",
        "once": false,
        "onceDelay": "1",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 580,
        "y": 100,
        "wires": [
            [
                "bf3216fb7bc3b3fb"
            ]
        ]
    },
    {
        "id": "df690a6504c1e710",
        "type": "telegram bot",
        "botname": "YOUR_BOT_NAME",
        "usernames": "YOUR_TELEGRAM_USERNAME",
        "chatids": "YOUR_TELEGRAM_CHAT_ID",
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
        "localbothost": "",
        "localbotport": "8443",
        "publicbotport": "8443",
        "privatekey": "",
        "certificate": "",
        "useselfsignedcertificate": false,
        "sslterminated": false,
        "verboselogging": false
    },
    {
        "id": "e9edb98dae81967c",
        "type": "influxdb",
        "hostname": "YOUR_INFLUXDB_HOST",
        "port": "YOUR_INFLUXDB_PORT",
        "protocol": "http",
        "database": "home_assistant",
        "name": "InfluxDB HASS",
        "usetls": false,
        "tls": "",
        "influxdbVersion": "1.x",
        "url": "http://YOUR_INFLUXDB_HOST:YOUR_INFLUXDB_PORT",
        "rejectUnauthorized": false
    }
]
