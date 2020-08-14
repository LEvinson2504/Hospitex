const redisFunctions = require("./redis/queue");

exports.tokenSocket = (redis, io) => {
  io.on("connection", (socket) => {
    socket.on("init", async (msg) => {
      console.log(`${msg}`);
      const len = await redisFunctions.getTokensLength(redis);
      io.sockets.emit("display-queue", len);
    });

    socket.on("register-queue", async (id) => {
      console.log(`[Queue] Registering a queue ${id}`);
      await redisFunctions.pushToken(redis, id);

      console.log("Tokens: ");
      console.log(`${await redisFunctions.getTokens(redis)}`);

      const len = await redisFunctions.getTokensLength(redis);

      io.sockets.emit("display-queue", len);
    });

    socket.on("check-queue", async (id) => {});

    socket.on("cancel-queue", async () => {});

    socket.on("delete-queue", async () => {
      await redisFunctions.deleteAllTokens(redis);

      console.log(await redisFunctions.getTokens(redis));
      const len = await redisFunctions.getTokensLength(redis);

      io.sockets.emit("display-queue", len);
    });
  });
};
