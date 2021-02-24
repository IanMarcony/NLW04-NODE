import request from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Users", () => {
  beforeAll(() => {});
  request(app).post("/users").send({
    name: "user",
    email: "user@example.com",
  });
});
