# Database Schema Description

본 프로젝트는 MySQL 기반의 관계형 데이터베이스를 사용한다.

---

## ✅ User

- id (PK)
- username
- email (UNIQUE)
- password_hash
- user_role (USER / ADMIN)
- is_active
- created_at

---

## ✅ Book

- id (PK)
- title
- author
- price
- stock
- category
- created_at
- updated_at

---

## ✅ Review

- id (PK)
- user_id (FK → User.id)
- book_id (FK → Book.id)
- rating
- content
- like_count
- created_at
- updated_at

---

## ✅ Wishlist

- id (PK)
- user_id (FK → User.id)
- book_id (FK → Book.id)
- UNIQUE(user_id, book_id)

---

## ✅ CartItem

- id (PK)
- user_id (FK → User.id)
- book_id (FK → Book.id)
- quantity
- created_at
- updated_at
- UNIQUE(user_id, book_id)

---

## ✅ Order

- id (PK)
- user_id (FK → User.id)
- book_id (FK → Book.id)
- total_price
- status
- payment_method
- created_at
- updated_at
