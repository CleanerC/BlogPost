import app from './app'


Bun.serve({
    fetch: app.fetch    //everything will now be handled by hono
  });

console.log("Server Running...")