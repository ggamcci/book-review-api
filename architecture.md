# Project Architecture

본 프로젝트는 Express + TypeScript + Prisma ORM 기반의 계층형 구조로 설계되었다.

---

## ✅ 전체 구조

src/
├─ controllers/
├─ services/
├─ routes/
├─ middlewares/
├─ validators/
├─ config/
├─ app.ts
└─ server.ts

## ✅ 역할 분리 구조

### 1️⃣ Controller Layer
- HTTP 요청/응답 처리
- 유효성 검증 결과 처리
- Service 호출

### 2️⃣ Service Layer
- 실제 비즈니스 로직 수행
- Prisma ORM을 통한 DB 접근

### 3️⃣ Route Layer
- API 엔드포인트 정의
- 인증/권한 미들웨어 연결

### 4️⃣ Middleware
- JWT 인증 (requireAuth)
- 관리자 권한 체크 (requireRole)
- 에러 처리 (errorHandler)
- 입력 검증 (validate)

---

## ✅ 인증 구조

- JWT Access Token
- JWT Refresh Token
- Authorization: Bearer 토큰 방식 사용

---

## ✅ 배포 구조

- JCloud Ubuntu 서버
- MySQL 서버 연동
- Node.js Express 서버 실행
- PM2 또는 nodemon 사용

---
