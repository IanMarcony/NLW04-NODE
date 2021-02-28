import request from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new Survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Como comer bolo?",
      description: "Arrasta pra cima para saber mais sobre",
    });

    expect(response.status).toBe(201);
  });

  it("Should be able to get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Como comer bolo?",
      description: "Arrasta pra cima para saber mais sobre",
    });

    const response = await request(app).get("/surveys");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
