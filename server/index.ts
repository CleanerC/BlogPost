import app from "./app";

const server = Bun.serve({
  port: 3000,
  fetch: app.fetch, //everything will now be handled by hono
});

console.log("Server Runnin on port: ", server.port);
