import request from "supertest";
import app from "../src/app";
import { getAdminToken } from "./setup";

describe("Book API", () => {
  let token: string;
  let bookId: number;

  beforeAll(async () => {
    token = await getAdminToken();
  });

  it("도서 생성 (관리자)", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Book",
        author: "Admin",
        price: 10000,
        stock: 10,
      });

    expect(res.status).toBe(201);
    bookId = res.body.data.id;
  });

  it("도서 목록 조회", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
  });

  it("도서 단건 조회", async () => {
    const res = await request(app).get(`/api/books/${bookId}`);
    expect(res.status).toBe(200);
  });

  it("도서 수정", async () => {
    const res = await request(app)
      .patch(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ stock: 5 });

    expect(res.status).toBe(200);
  });

  it("도서 삭제", async () => {
    const res = await request(app)
      .delete(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
