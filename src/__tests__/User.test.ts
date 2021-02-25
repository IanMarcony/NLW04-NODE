import request from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Users",  () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  });
  it('should be able to create a new user',async ()=>{
    const response = await request(app).post("/users").send({
      name: "user",
      email: "user@example.com",
    });
    expect(response.status).toBe(201)
  })
  it('Shouble not able to create a  user with exists email', async ()=>{
    const response = await request(app).post("/users").send({
      name: "user",
      email: "user@example.com",
    });
    expect(response.status).toBe(400)
  })
});
