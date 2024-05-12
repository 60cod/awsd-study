import request from "supertest";
import { Express } from "express";
import {createApp, LIST_KEY, RedisClient} from "./app";
import * as redis from "redis";

//let app: Express.Application; //이렇게 하니까 밑에 await request(app) 타입 에러 났음.
let app: Express;
let client: RedisClient;

const REDIS_URL = "redis://default:test_env@localhost:6380";

beforeAll(async () => {
    client = redis.createClient({ url: REDIS_URL });
    await client.connect();
    app = await createApp(client);
});

beforeEach(async () => {
    await client.flushDb(); //client를 안에서 선언해서 접근 못 함. -> 인자로 받게 변경 -> app.ts 만들어서 비즈니스 분리
});

afterAll(async () => {
    await client.flushDb(); //데이터 한 번 더 초기화
    await client.quit();
});

describe("POST /messages", () => {
    it("responds with a success message", async () => {
        const response = await request(app)
            .post("/messages")
            .send({ message: "testing with redis" });
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Message added to list");
    });
});

describe("GET /messages", () => {
    it("responds with all messages", async () => {
        await client.lPush(LIST_KEY, ["msg1", "msg2"]); //샘플 데이터 넣어보기
        const response = await request(app).get("/messages");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(["msg2", "msg1"]); //lPush는 역순으로 나온다.
    });
    /*it("responds with all messages", async () => {
        const response = await request(app).get("/messages");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]); //빈 배열
    });*/
})