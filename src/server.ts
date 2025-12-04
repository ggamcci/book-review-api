import app from "./app";
import http from "http";

const PORT = 19037;       // ★ 새 포트
const HOST = "0.0.0.0";   // ★ 반드시 0.0.0.0 유지

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
