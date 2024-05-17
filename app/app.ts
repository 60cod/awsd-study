import express from "express";
import { RedisClientType } from "redis";

export const LIST_KEY = "messages";

export type RedisClient = RedisClientType<any, any, any>;

export const createApp = (client: RedisClient) => {
    const app = express();

    app.use(express.json()) // json 형식 받기 위해 json 파싱 하는 것 넣음.

    app.get("/", (request, response) => {
        response.status(200)
            .send("Know your subject, people. Failure to do so may result in the loss of a golden opportunity. - Miss Sloane");
    });

    app.post("/messages", async (request, response) => {
        const { message } = request.body;
        await client.lPush(LIST_KEY, message);
        response.status(200).send("Message added to list"); // 저장 성공 알림
    });

    app.get("/messages", async (request, response) => {
        const messages = await client.lRange(LIST_KEY, 0, -1);
        response.status(200).send(messages);
    })

    return app;
};