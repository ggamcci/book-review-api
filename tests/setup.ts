import request from "supertest";
import app from "../src/app";

export async function getAdminToken() {
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@example.com",
      password: "1234",
    });

  return res.body.data.accessToken;
}

export async function getUserToken() {
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "user1@example.com",
      password: "1234",
    });

  return res.body.data.accessToken;
}
