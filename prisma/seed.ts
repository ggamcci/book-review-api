import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1) 50 Users 생성
  const users = [];
  for (let i = 1; i <= 50; i++) {
    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        email: `user${i}@example.com`,
        passwordHash: "test1234", // 실제로는 bcrypt 필요
        userRole: i === 1 ? "ADMIN" : "USER",
      },
    });
    users.push(user);
  }

  // 2) 100 Books 생성
  const books = [];
  for (let i = 1; i <= 100; i++) {
    const book = await prisma.book.create({
      data: {
        title: `Book Title ${i}`,
        author: `Author ${i}`,
        price: Math.floor(Math.random() * 30000) + 5000,
        stock: Math.floor(Math.random() * 50),
        category: ["Programming", "Novel", "Science"][i % 3],
      },
    });
    books.push(book);
  }

  // 3) 50 Reviews 생성
  for (let i = 1; i <= 50; i++) {
    await prisma.review.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        bookId: books[Math.floor(Math.random() * books.length)].id,
        rating: Math.floor(Math.random() * 5) + 1,
        content: `This is review ${i}`,
      },
    });
  }

  // 4) Wishlist 30개 생성
  for (let i = 1; i <= 30; i++) {
    await prisma.wishlist.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        bookId: books[Math.floor(Math.random() * books.length)].id,
      },
    });
  }

  // 5) CartItem 20개 생성
  for (let i = 1; i <= 20; i++) {
    await prisma.cartItem.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        bookId: books[Math.floor(Math.random() * books.length)].id,
        quantity: Math.floor(Math.random() * 5) + 1,
      },
    });
  }

  console.log("🌱 Done!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
