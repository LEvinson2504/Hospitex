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
app.options("*", cors());
app.use(cors());
const server = http.createServer(app);
const options = {
  origin: "*:*",
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
};

// * THIS IS USED FOR THE SOCKETS
const io = require("socket.io")(server, options);
const redis = new Redis();

const RedisStore = connectRedis(session);
app.use(
  session({
    store: new RedisStore({
      client: redis,
    }),
    name: process.env.COOKIE_NAME,
    secret: process.env.COOKIE_SECRET,
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
app.use(bodyParser.json());

const sockets = require("./socket");
sockets.tokenSocket(redis, io);

// * ROUTES
const authRoutes = require("./routes/auth");
const hospitalRoutes = require("./routes/hospital");
app.use("/auth", authRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/", (req, res, next) => {
  return res.json({
    message: "Hi",
  });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("[Database] Connected to database");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  server.listen(process.env.PORT, async () => {
    console.log(`[Server] Server has started on port ${process.env.PORT}`);
  });
}).catch;
