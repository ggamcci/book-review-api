1. 프로젝트 개요

본 프로젝트는 다음 기능을 제공합니다.

🔹 핵심 기능
- 회원가입 / 로그인 / 토큰 재발급 (JWT)
- 관리자 / 일반 사용자 권한 분리 (RBAC)
- 도서(Book) 등록 / 수정 / 삭제 / 검색
- 리뷰(Review) CRUD
- 찜(Wishlist) CRUD
- 장바구니(Cart) CRUD
- 주문(Order) CRUD
- 페이지네이션 / 검색 / 정렬
- Prisma 기반 MySQL 연동
- Swagger 자동 문서화
- Postman 토큰 자동 저장 및 테스트
- Seed 데이터 200건 이상 자동 삽입
- JCloud 배포 완료

---

2. 배포 주소 (JCloud)

- **Base API URL**
http://113.198.66.68:10152/api

- **Swagger UI**
http://113.198.66.68:10152/swagger-ui

- **Health Check**
http://113.198.66.68:10152/health


3. 실행 방법 (로컬 실행)

3-1) 저장소 클론
```bash
git clone https://github.com/ggamcci/book-review-api.git
cd book-review-api

3-2) 패키지 설치
npm install

3-3) 환경 변수 설정(.env.example)

# ✅ Database Connection (Example)
DATABASE_URL="mysql://book_user:your_password@localhost:3306/book_service"

# ✅ JWT Secrets (Example)
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

# ✅ JWT Expiration
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d


3-4) Prisma 마이그레이션
npx prisma migrate dev

3-5) Seed 데이터 삽입 (200건 이상)
npx prisma db seed

3-6) 서버 실행
npm run dev

4. JCloud(XShell) 실행 방법

호스트: 13.198.66.68, 포트: 19152, pem: pem 파일

cd book-review-api
git pull
npm install
npm run dev

5. 예제 계정
구분	이메일	비밀번호
관리자/admin@example.com/Admin123
사용자/user56@example.com/1234

6. 한계 및 개선 계획
결제 API 외부 연동 예정

주문 다중 상품 구조 개선 필요

관리자 통계 API 추가 예정

Docker 기반 배포 자동화 예정
