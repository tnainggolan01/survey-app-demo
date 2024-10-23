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
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// Catch-all route to redirect non-API requests to frontend
app.use("*", (req, res) => {
  // Check if the request path starts with /api
  if (!req.baseUrl.startsWith("/api")) {
    // Redirect to frontend service
    res.redirect(
      process.env.NEXT_PUBLIC_REACT_APP_FRONTEND_BASE_URL + req.originalUrl
    );
  } else {
    // Handle 404 for API routes that don't exist
    res.status(404).json({ message: "API route not found" });
  }
});

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
