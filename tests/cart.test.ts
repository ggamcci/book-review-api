import request from "supertest";
import app from "../src/app";
import { getUserToken } from "./setup";

let cartId: number;

describe("Cart API", () => {
  it("장바구니 추가", async () => {
    const res = await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${getUserToken}`)
      .send({ userId: 1, bookId: 1, quantity: 2 });

    cartId = res.body.data.id;
    expect(res.status).toBe(201);
  });

  it("장바구니 조회", async () => {
    const res = await request(app)
      .get("/api/cart/user/1")
      .set("Authorization", `Bearer ${getUserToken}`);

    expect(res.status).toBe(200);
  });

  it("장바구니 삭제", async () => {
    const res = await request(app)
      .delete(`/api/cart/${cartId}`)
      .set("Authorization", `Bearer ${getUserToken}`);

    expect(res.status).toBe(204);
  });
});
