const redisFunctions = require("./redis/queue");
const sock = require("./constants/sockets");

exports.singleSocket = (hospitalId, socket, redis, io) => {
  socket.on(`${hospitalId}-${sock.init}`, async (msg) => {
    console.log(`${msg}`);
    const len = await redisFunctions.getTokensLength(hospitalId, redis);
    console.log(`[Server] Emitting len of ${len} to ${hospitalId}`);
    io.sockets.emit(`${hospitalId}-${sock.displayQueue}`, len);
  });

  socket.on(`${hospitalId}-${sock.getQueue}`, async () => {
    console.log(
      `[Server] Client requesting all available tokens for ${hospitalId}`
    );
    const queues = await redisFunctions.getTokens(hospitalId, redis);
    io.sockets.emit(`${hospitalId}-${sock.receiveQueue}`, queues);
  });

  socket.on(`${hospitalId}-${sock.registerQueue}`, async (id) => {
    console.log(`[Queue] Registering a queue ${id}`);
    await redisFunctions.pushToken(hospitalId, redis, id);

    console.log("Tokens: ");
    console.log(`${await redisFunctions.getTokens(hospitalId, redis)}`);

    const len = await redisFunctions.getTokensLength(hospitalId, redis);

    io.sockets.emit(`${hospitalId}-${sock.displayQueue}`, len);
  });

  socket.on(`${hospitalId}-${sock.checkQueue}`, async (id) => {});

  socket.on(`${hospitalId}-${sock.cancelQueue}`, async (id) => {
    console.log(`[Queue]: Canceling Queue`);
    await redisFunctions.cancelToken(hospitalId, redis, id);
    const len = await redisFunctions.getTokensLength(hospitalId, redis);
    console.log(`[Queue] New Length: ${len}`);
    io.sockets.emit(`${hospitalId}-${sock.displayQueue}`, len);
  });

  socket.on(`${hospitalId}-${sock.deleteQueue}`, async () => {
    await redisFunctions.deleteAllTokens(hospitalId, redis);

    console.log(await redisFunctions.getTokens(hospitalId, redis));
    const len = await redisFunctions.getTokensLength(hospitalId, redis);

    io.sockets.emit(sock.displayQueue, len);
  });
};
