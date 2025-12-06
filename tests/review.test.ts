import request from "supertest";
import app from "../src/app";
import { getUserToken } from "./setup";

describe("Review API", () => {
  let token: string;
  let reviewId: number;

  beforeAll(async () => {
    token = await getUserToken();
  });

  it("리뷰 작성", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: 2,
        bookId: 1,
        rating: 5,
        content: "좋아요",
      });

    expect(res.status).toBe(201);
    reviewId = res.body.data.id;
  });

  it("리뷰 목록 조회", async () => {
    const res = await request(app).get("/api/reviews");
    expect(res.status).toBe(200);
  });

  it("리뷰 수정", async () => {
    const res = await request(app)
      .patch(`/api/reviews/${reviewId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "수정됨" });

    expect(res.status).toBe(200);
  });

  it("리뷰 삭제", async () => {
    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
