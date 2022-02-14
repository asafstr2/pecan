//A boilerplate to connect to mongo DB

const mongoose = require("mongoose");
const redis = require("redis");
try {
  const client = redis.createClient({
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  });
  client.on("connect", () => {
    console.log("Connected to our redis instance!");
  });
} catch (error) {
  console.log("REDIS CONNECTION FAILED. Please check you network connection.");
}
//debug mode enabled
mongoose.set("debug", false);
//using es2016 promise with mongoose insure we can use async and  promises
mongoose.Promise = Promise;
//connection string to local DB with collection "lokali"

try {
  mongoose.connect(process.env.MONGODB_CONNECTION, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.log("MONGO CONNECTION FAILED. Please check you network connection.");
}

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB conected");
});
