const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/connect");
const router = require("./routers/createRouters.js")();
const app = express();

dotenv.config();
db.connect();

app.use((req, res, next) => {
  const { method, path } = req;

  console.log(
    `New request to: ${method} ${path} at ${new Date().toISOString()}`
    // req
  );

  next();
});

app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const allowedOrigins = [
  process.env.NEXT_PUBLIC_REACT_APP_FRONTEND_BASE_URL,
  process.env.NEXT_PUBLIC_REACT_APP_FRONTEND_LOCAL_BASE_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
