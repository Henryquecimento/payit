import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/index";

describe("Authenticate User", () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(`INSERT INTO USERS(id, name, email, password, created_at, updated_at)
    values('${id}', 'admin', 'admin@admin.com', '${password}', now(), now())`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a user authentication", async () => {
    const responseSession = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin",
    });

    expect(responseSession.status).toBe(200);
    expect(responseSession.body).toHaveProperty("token");
  });

  it("Should not be able to create a user authentication if password is incorrect", async () => {
    const responseSession = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "wrong_password",
    });

    expect(responseSession.status).toBe(401);
  });
});
