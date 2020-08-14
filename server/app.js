const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const express = require("express");
const http = require("http");
const Redis = require("ioredis");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const sharedSession = require("express-socket.io-session");
const connectRedis = require("connect-redis");

const app = express();
const server = http.createServer(app);
const options = { origins: "*:*" };
const io = require("socket.io")(server, options);

const redis = new Redis();

const RedisStore = connectRedis(session);
app.use(
  session({
    store: new RedisStore({
      client: redis,
    }),
    name: "token",
    secret: "asdasdasdasd",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
    },
  })
);

io.use(
  sharedSession(
    session({
      saveUninitialized: false,
      resave: false,
      secret: "asdasdasdasd",
    }),
    {
      autoSave: true,
    }
  )
);

app.use(cors());
app.use(bodyParser.json());

const sockets = require("./socket");
sockets.tokenSocket(redis, io);

// * ROUTES
const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);

server.listen(process.env.PORT, async () => {
  await mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`Server has started on port ${process.env.PORT}`);
});
