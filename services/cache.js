const mongoose = require("mongoose");
const redis = require("redis");

try {
  const exec = mongoose.Query.prototype.exec;
  const client = redis.createClient({ url: process.env.REDIS_URL });
  async function connect() {
    try {
      await client.connect();
    } catch (error) {
      console.log(error);
    }
  }
  connect();
  mongoose.Query.prototype.cache = async function (options = {}) {
    //this will allow a more declarative way of using cache just need to add .cache()
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || "");
    return this;
  };

  mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
      return exec.apply(this, arguments);
    }
    //prepearing a key
    const key = JSON.stringify({
      ...this.getQuery(),
      collections: this.mongooseCollection.name,
    });
    //try getting the cache if any and return
    const cachValue = await client.hGet(this.hashKey, key);
    if (cachValue) {
      const doc = JSON.parse(cachValue);
      return Array.isArray(doc)
        ? doc.map((d) => new this.model(d))
        : new this.model(doc);
    }
    //if no cache return normaly and write to cache
    const result = await exec.apply(this, arguments);
    client.hSet(this.hashKey, key, JSON.stringify(result), {
      EX: 10,
    });
    return result;
  };
  module.exports = {
    async clearHash(hashKey) {
      client.del(JSON.stringify(hashKey));
    },
  };
} catch (error) {
  console.log(error);
  console.log("REDIS CONNECTION FAILED. Please check you network connection.");
}
