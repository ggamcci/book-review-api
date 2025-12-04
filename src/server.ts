import app from "./app";
import http from "http";

const PORT = Number(process.env.PORT) || 8080;
const HOST = "0.0.0.0" as string;

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
