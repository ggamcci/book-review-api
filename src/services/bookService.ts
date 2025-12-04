import { prisma } from "../db";

export interface BookListQuery {
  page?: number;
  size?: number;
  keyword?: string;
  category?: string;
  sort?: string; // "createdAt,DESC" 이런 형식
}

export interface BookInput {
  title: string;
  author: string;
  price: number;
  stock?: number;
  category?: string;
}

function parseSort(sort?: string) {
  if (!sort) {
    return { createdAt: "desc" as const };
  }
  const [field, direction] = sort.split(",");
  const dir = direction?.toLowerCase() === "asc" ? "asc" : "desc";
  // 허용할 필드만 화이트리스트
  if (!["createdAt", "price", "title"].includes(field)) {
    return { createdAt: "desc" as const };
  }
  return { [field]: dir } as any;
}

export const bookService = {
  async create(data: BookInput) {
    const book = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        price: data.price,
        stock: data.stock ?? 0,
        category: data.category ?? null,
      },
    });
    return book;
  },

  async getById(id: number) {
    const book = await prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      const err: any = new Error("Book not found");
      err.status = 404;
      throw err;
    }
    return book;
  },

  async list(query: BookListQuery) {
    const page = query.page && query.page > 0 ? query.page : 1;
    const size =
      query.size && query.size > 0 && query.size <= 50 ? query.size : 20;
    const skip = (page - 1) * size;

    const where: any = {};
    if (query.keyword) {
        where.OR = [
            { title: { contains: query.keyword } },
            { author: { contains: query.keyword } },
        ];
    }

    if (query.category) {
      where.category = { equals: query.category };
    }

    const orderBy = parseSort(query.sort);

    const [items, total] = await Promise.all([
      prisma.book.findMany({
        where,
        skip,
        take: size,
        orderBy,
      }),
      prisma.book.count({ where }),
    ]);

    return {
      content: items,
      page,
      size,
      totalElements: total,
      totalPages: Math.ceil(total / size),
      sort: query.sort ?? "createdAt,DESC",
    };
  },

  async update(id: number, data: Partial<BookInput>) {
    // 존재 여부 체크
    await bookService.getById(id);

    const book = await prisma.book.update({
      where: { id },
      data: {
        title: data.title,
        author: data.author,
        price: data.price,
        stock: data.stock,
        category: data.category,
      },
    });
    return book;
  },

  async remove(id: number) {
    // 존재 여부 체크
    await bookService.getById(id);

    await prisma.book.delete({
      where: { id },
    });

    return { id };
  },
};
