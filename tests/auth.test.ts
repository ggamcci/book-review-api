import request from "supertest";
import app from "../src/app";

describe("Auth API", () => {
  it("회원가입 성공", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: "testuser99",
      email: "test99@test.com",
      password: "1234",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("로그인 성공", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "1234",
    });

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
  });

  it("로그인 실패 (비밀번호 오류)", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "wrong",
    });

    expect(res.status).toBe(401);
  });

  it("내 정보 조회 실패 (토큰 없음)", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });
});
