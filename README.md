# 📚 Book Review API

도서 관리, 리뷰, 장바구니, 주문, 찜 기능을 제공하는 **RESTful API 서버**입니다.  
JWT 기반 인증/인가, 관리자 권한(RBAC), Prisma + MySQL을 사용한 백엔드 프로젝트입니다.

---

## ✅ 1. 프로젝트 개요

### 🔹 문제 정의
- 사용자는 도서를 조회하고 리뷰를 작성할 수 있어야 한다.
- 사용자는 장바구니, 찜, 주문 기능을 이용할 수 있어야 한다.
- 관리자는 도서를 등록/수정/삭제할 수 있어야 한다.
- JWT 인증 기반 보안이 적용되어야 한다.

### 🔹 주요 기능
- ✅ 회원가입 / 로그인 (JWT 인증)
- ✅ 도서 CRUD (관리자 전용)
- ✅ 리뷰 CRUD
- ✅ 찜(Wishlist) 기능
- ✅ 장바구니(Cart) 기능
- ✅ 주문(Order) 기능
- ✅ 페이지네이션 / 검색 / 정렬
- ✅ Swagger 문서 자동화
- ✅ Postman 테스트 자동화

---

2. 실행 방법

- 1) GitHub 저장소 클론

```bash
git clone https://github.com/ggamcci/book-review-api.git
cd book-review-api

- 로컬 실행

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 파일 설정
cp .env.example .env

# 3. Prisma 마이그레이션
npx prisma migrate dev

# 4. 시드 데이터 삽입
npx prisma db seed

# 5. 서버 실행
npm run dev

-xshell 실행

호스트 113.198.66.68, 포트번호 10152, 키 파일 lcw1 선택

2) 프로젝트 폴더 이동
cd ~/book-review-api

🔹 3) 의존성 설치
npm install

🔹 4) 환경 변수 설정
cp .env.example .env
nano .env


→ .env 내부에서 DB, JWT, PORT 값 수정

🔹 5) Prisma 마이그레이션 & 시드 데이터 삽입
npx prisma migrate deploy
npx prisma db seed

🔹 6) 서버 실행
npm run dev





# 5. 서버 실행
npm run dev
