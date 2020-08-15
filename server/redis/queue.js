exports.getTokens = async (hospitalId, redis) => {
  return await redis.lrange(hospitalId, 0, -1);
};

exports.getTokensLength = async (hospitalId, redis) => {
  return await redis.llen(hospitalId);
};

exports.pushToken = async (hospitalId, redis, tokenId) => {
  await redis.lpush(hospitalId, tokenId);
};

exports.removeCurrentToken = async (hospitalId, redis) => {
  await redis.rpop(hospitalId);
};

exports.deleteAllTokens = async (hospitalId, redis) => {
  await redis.del(hospitalId);
};

exports.cancelToken = async (hospitalId, redis, id) => {
  await redis.lrem(hospitalId, -1, id);
};
