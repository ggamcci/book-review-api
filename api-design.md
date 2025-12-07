# API Design Summary (과제 1 반영)

본 문서는 과제 1에서 설계한 DB 및 API 구조를 기반으로,  
과제 2에서 실제로 구현된 API 서버의 엔드포인트 구조를 요약한 문서이다.

---

## ✅ 1. Auth API

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/auth/signup | 회원가입 |
| POST | /api/auth/login | 로그인 (Access/Refresh Token 발급) |
| POST | /api/auth/refresh | 토큰 재발급 |
| GET | /api/auth/me | 내 정보 조회 (인증 필요) |

---

## ✅ 2. User API (관리자 전용)

| Method | URL | Description |
|--------|-----|-------------|
| PATCH | /api/users/{id}/role | 사용자 권한 변경 (ADMIN 전용) |

---

## ✅ 3. Book API

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/books | 도서 목록 조회 (검색, 정렬, 페이지네이션) |
| GET | /api/books/{id} | 도서 단건 조회 |
| POST | /api/books | 도서 등록 (ADMIN) |
| PATCH | /api/books/{id} | 도서 수정 (ADMIN) |
| DELETE | /api/books/{id} | 도서 삭제 (ADMIN) |

---

## ✅ 4. Review API

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/reviews | 리뷰 작성 |
| GET | /api/reviews | 리뷰 전체 조회 |
| GET | /api/reviews/{id} | 리뷰 단건 조회 |
| PATCH | /api/reviews/{id} | 리뷰 수정 |
| DELETE | /api/reviews/{id} | 리뷰 삭제 |

---

## ✅ 5. Wishlist API

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/wishlist | 찜 추가 |
| GET | /api/wishlist/user/{userId} | 찜 목록 조회 |
| DELETE | /api/wishlist/{id} | 찜 삭제 |

---

## ✅ 6. Cart API

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/cart | 장바구니 추가 |
| GET | /api/cart/user/{userId} | 장바구니 조회 |
| PATCH | /api/cart/{id} | 수량 수정 |
| DELETE | /api/cart/{id} | 장바구니 삭제 |

---

## ✅ 7. Order API

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/orders | 주문 생성 |
| GET | /api/orders | 전체 주문 조회 (ADMIN) |
| GET | /api/orders/user/{userId} | 유저 주문 조회 |
| GET | /api/orders/{id} | 주문 단건 조회 |
| PATCH | /api/orders/{id} | 주문 상태 변경 (ADMIN) |
| DELETE | /api/orders/{id} | 주문 삭제 (ADMIN) |

---

✅ JWT 인증, 관리자 권한 제어, CRUD 전부 구현 완료
