exports.getTokens = async (redis) => {
  return await redis.lrange("tokens", 0, -1);
};

exports.getTokensLength = async (redis) => {
  return await redis.llen("tokens");
};

exports.pushToken = async (redis, tokenId) => {
  await redis.lpush("tokens", tokenId);
};

exports.removeCurrentToken = async (redis, tokenId) => {
  await redis.rpop("tokens");
};

exports.deleteAllTokens = async (redis) => {
  await redis.del("tokens");
};
