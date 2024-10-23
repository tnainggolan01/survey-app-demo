const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/connect");
const router = require("./routers/createRouters.js")();
const app = express();

dotenv.config();
db.connect();

const allowedOrigins = [
  `http://localhost:${process.env.PORT}`,
  process.env.NEXT_PUBLIC_REACT_APP_FRONTEND_BASE_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const { method, path } = req;

  console.log(
    `New request to: ${method} ${path} at ${new Date().toISOString()}`
    // req
  );

  next();
});

app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
