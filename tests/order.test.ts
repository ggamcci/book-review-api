import request from "supertest";
import app from "../src/app";
import { getUserToken, getAdminToken } from "./setup";

// ⚠️ 실제 존재하는 userId, bookId로 맞춰줘야 함
const TEST_USER_ID = 1;
const TEST_BOOK_ID = 1;

let createdOrderId: number;

describe("🛒 Order API Test", () => {
  let userToken: string;
  let adminToken: string;

  // ✅ 토큰 미리 발급
  beforeAll(async () => {
    userToken = await getUserToken();
    adminToken = await getAdminToken();
  });

  // ✅ 1️⃣ 주문 생성 (USER)
  it("POST /api/orders - 주문 생성 (USER)", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        userId: TEST_USER_ID,
        bookId: TEST_BOOK_ID,
        totalPrice: 25000,
        status: "ORDERED",
        paymentMethod: "CARD",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");

    createdOrderId = res.body.data.id;
  });

  // ✅ 2️⃣ 내 주문 조회 (USER)
  it("GET /api/orders/user/:userId - 내 주문 조회 (USER)", async () => {
    const res = await request(app)
      .get(`/api/orders/user/${TEST_USER_ID}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // ✅ 3️⃣ 주문 단건 조회 (USER)
  it("GET /api/orders/:id - 주문 단건 조회 (USER)", async () => {
    const res = await request(app)
      .get(`/api/orders/${createdOrderId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(createdOrderId);
  });

  // ✅ 4️⃣ 전체 주문 조회 (ADMIN)
  it("GET /api/orders - 전체 주문 조회 (ADMIN)", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // ✅ 5️⃣ 주문 상태 변경 (ADMIN)
  it("PATCH /api/orders/:id - 주문 상태 변경 (ADMIN)", async () => {
    const res = await request(app)
      .patch(`/api/orders/${createdOrderId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        status: "COMPLETED",
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("COMPLETED");
  });

  // ✅ 6️⃣ 주문 삭제 (ADMIN)
  it("DELETE /api/orders/:id - 주문 삭제 (ADMIN)", async () => {
    const res = await request(app)
      .delete(`/api/orders/${createdOrderId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(204);
  });

  // ✅ 7️⃣ 실패 테스트: USER가 전체 주문 조회 시도
  it("GET /api/orders - USER 접근 실패", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });

  // ✅ 8️⃣ 실패 테스트: 토큰 없이 주문 생성
  it("POST /api/orders - 토큰 없음 → 실패", async () => {
    const res = await request(app).post("/api/orders").send({
      userId: TEST_USER_ID,
      bookId: TEST_BOOK_ID,
      totalPrice: 25000,
      status: "ORDERED",
    });

    expect(res.status).toBe(401);
  });
});
