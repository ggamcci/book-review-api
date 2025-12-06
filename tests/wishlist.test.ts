import request from "supertest";
import app from "../src/app";
import { getUserToken } from "./setup";

let wishId: number;

describe("Wishlist API", () => {
  it("찜 추가", async () => {
    const res = await request(app)
      .post("/api/wishlist")
      .set("Authorization", `Bearer ${getUserToken}`)
      .send({ userId: 1, bookId: 1 });

    wishId = res.body.data.id;
    expect(res.status).toBe(201);
  });

  it("찜 조회", async () => {
    const res = await request(app)
      .get("/api/wishlist/user/1")
      .set("Authorization", `Bearer ${getUserToken}`);

    expect(res.status).toBe(200);
  });

  it("찜 삭제", async () => {
    const res = await request(app)
      .delete(`/api/wishlist/${wishId}`)
      .set("Authorization", `Bearer ${getUserToken}`);

    expect(res.status).toBe(204);
  });
});
