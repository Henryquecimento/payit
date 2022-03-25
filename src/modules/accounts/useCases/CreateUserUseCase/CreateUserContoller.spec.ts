import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/index";

describe("Create User Controller", () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new User", async () => {
    const response = await request(app).post("/users").send({
      name: "User Test",
      email: "user@test.com",
      password: "1234",
    });

    expect(response.status).toBe(201);
  });
});
