import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Review API",
      version: "1.0.0",
      description: "JWT 기반 도서 리뷰 API 문서",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local Server",
      },
      {
        url: "http://<JCloud-IP>:8080",
        description: "JCloud Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"], // ✅ 라우터 파일에서 주석 읽음
});
